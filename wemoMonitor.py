import argparse
import sys

from ouimeaux.environment import Environment
from ouimeaux.utils import matcher
from ouimeaux.signals import receiver, statechange, devicefound
import sched, time
from pymongo import MongoClient

uri = 'INSERT YOUR MONGO CONNECTION URI HERE'
c = MongoClient(uri)
db = c.datas.wemo

s = sched.scheduler(time.time, time.sleep)
def print_time(): print "From print_time", time.time()

def print_some_times(sender):
     print time.time()
     print sender.current_power
     s.enter(2, 5, print_time, ())
     s.run()
     print time.time()
     record = {'time' : time.time(), 'watts' : sender.current_power}
     db.insert(record)
     
def mainloop(name):
    matches = matcher(name)

    @receiver(devicefound)
    def found(sender, **kwargs):
        if matches(sender.name):
            print "Found device:", sender.name

            while 1:
                print_some_times(sender)



   
    env = Environment(with_cache=False)
    try:
        env.start()
        env.discover(10)
        env.wait()
    except (KeyboardInterrupt, SystemExit):
        print "Goodbye!"
        sys.exit(0)


if __name__ == "__main__":
    parser = argparse.ArgumentParser("Motion notifier")
    parser.add_argument("name", metavar="NAME",
                        help="Name (fuzzy matchable)"
                             " of the Motion to detect")
    args = parser.parse_args()
    mainloop(args.name)
    

