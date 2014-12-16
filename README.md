wemoMonitor
===========

graphs mongodb data of power sensed by wemo insight switch, data collected using ouimeaux library with python


This monitors watts from the WeMo Insight switch and pushes a reading to mongodb every two seconds using wemoMonitor.py. Run this on a a machine local to the switch with 

python wemoMonitor.py "THE SWITCH'S NAME"

The rest of the code is a node application that connects to the same databse and plots the data