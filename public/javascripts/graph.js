$(document).ready(function () {



    console.log("this is the javasecript from the main layout");


    $.ajax({
        url: 'http://localhost:3000/wemo',
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
        success: function (result) {
            //            result = JSON.parse(result);
            //            $('#description').html(result[0].description);
            //            $('#sidebar').html(result[0].sidebar);

            var mydata = []; // Javascript Array Declaration


            //var dataset = JSON(result[0]);
            var obj = result;
            for (i = 0; i < obj.length; i++) {
                var point = [obj[i].time * 1000 + 7 * 60 * 60 * 1000, parseInt(obj[i].watts) / 1000];
                //mydata.push(parseInt(obj[i].watts) / 1000); // Filling of Array after Ajax Call
                mydata.push(point);
            }
            //        console.log(mydata)
            makeGraph(mydata.reverse());
        }
    });

    function makeGraph(data) {
        //var data = _.groupBy(data, function(d){return d.watts});
        $('#container').highcharts({
            chart: {
                type: 'spline',

                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {

                            $.ajax({
                                url: 'http://localhost:3000/wemo/latest',
                                method: 'GET',
                                headers: {
                                    Accept: 'application/json'
                                },
                                success: function (result) {
                                    var point = [result.time* 1000 + 7 * 60 * 60 * 1000, result.watts / 1000];
                                    series.addPoint(point, true, true);

                                }
                            });
                        }, 2000);
                    }
                }
            },
            title: {
            text: 'Christmas Tree Power Usage'
        },
            xAxis: { type: 'datetime', title: {
                text: 'Time'
            } },
            yAxis: {
            title: {
                text: 'Watts'
            }
        },
                    legend: {
            enabled: false
        },
            series: [{
                data: data
            }]
        });
    };





});