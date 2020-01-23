$(document).ready(function () {
    var option = {
        container: ".Piechart1",
        marginTop: 20,
        marginRight: 20,
        marginBottom: 20,
        marginLeft: 80,
        height: 400,
        itemSize: 30,
        show_YAxisText:false
    };
    function Piechart1(options) {
        $(options.container).empty();
        if (options)
        {
            options.container = options.container ? options.container : "body";
            options.width = options.width ? options.width : $(options.container).width()/3;
            options.height = options.height ? options.height : 300;
            options.marginTop = options.marginTop ? options.marginTop : 30;
            options.marginBottom = options.marginBottom ? options.marginBottom : 30;
            options.marginRight = options.marginRight ? options.marginRight : 20;
            options.marginLeft = options.marginLeft ? options.marginLeft : 50;
            options.show_YAxis = options.show_YAxis ? options.show_YAxis : true;
            options.show_YAxisText = options.show_YAxisText ? options.show_YAxisText : true;
            options.rotate_YAxisText = options.rotate_YAxisText ? options.rotate_YAxisText : false;              
            options.show_YAxisPath = options.show_YAxisPath ? options.show_YAxisPath : true;
            options.show_YAxisTicks = options.show_YAxisTicks ? options.show_YAxisTicks : true;
            options.rotate_YAxisTicks = options.rotate_YAxisTicks ? options.rotate_YAxisTicks : true;
            options.fontSize_YAxis =options.fontSize_YAxis ?options.fontSize_YAxis:10;
            options.fontFamily_YAxis = options.fontFamily_YAxis?options.fontFamily_YAxis:"sans-serif";
            options.show_XAxis = options.show_XAxis ? options.show_XAxis : true;
            options.show_XAxisText = options.show_XAxisText ? options.show_XAxisText : true;
            options.rotate_XAxisText = options.rotate_XAxisText ? options.rotate_XAxisText : true;
            options.show_XAxisPath = options.show_XAxisPath ? options.show_XAxisPath : true;
            options.show_XAxisTicks = options.show_XAxisTicks ? options.show_XAxisTicks : true;
            options.rotate_XAxisTicks = options.rotate_XAxisTicks ? options.rotate_XAxisTicks : false;
            options.fontSize_XAxis =options.fontSize_XAxis ?options.fontSize_XAxis:10;
            options.fontFamily_XAxis = options.fontFamily_XAxis?options.fontFamily_XAxis:"sans-serif";
            options.gridx = options.gridx ? options.gridx : false;
            options.gridy = options.gridy ? options.gridy : false;
            options.strokeLineColor = options.strokeLineColor ?options.strokeLineColor:"red"
        }

            margin = {top: options.marginTop, right: options.marginRight, bottom: options.marginBottom, left: options.marginLeft}

        var width = options.width - options.marginRight - options.marginLeft,
                height = options.height - options.marginTop - options.marginBottom;

        // parse the date / time
        var parseTime = d3.timeParse("%b %d, %Y");


               // Get the data
               d3.json("line.json", function(error, data) {
                if (error) throw error;
              
                // format the data
                data.forEach(function(d) {
                    d.date = parseTime(d.date);
                    //d.data(dataset.map(function(d) { return +d; }))
                    d.close = +d.close;
                });
        
        
        var x = d3.scaleTime().range([0, width]);
      var y = d3.scaleLinear().range([height, 0]);

  
    var xScale=x.domain(d3.extent(data, function(d) { return d.date; }));
    var yScale=y.domain([0, d3.max(data, function(d) { return d.close; })]);


                    // append the svg obgect to the body of the page
                // appends a 'group' element to 'svg'
                // moves the 'group' element to the top left margin
                var svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");
                
                  // Scale the range of the data
                 

              var lineData = data.map(function (point, index, arr) {

                    var next = arr[index + 1],
                        prev = arr[index - 1];
                    return {
                        x: point.date,
                        y: point.close,
                        x1: point.date,
                        y1: point.close,
                        x2: (next) ? next.date : prev.date,                        
                        y2: (next) ? next.close : prev.close,
                        color: point.iserr

                    };
                });
                svg.selectAll('line')
                        .data(lineData)
                        .enter()
                        .append('line')
                        .attr('x1', function(d) { return x(d.x1); })
                        .attr('y1', function(d) { return y(d.y1); })
                        .attr('x2', function(d) { return x(d.x2); })                       
                        .attr('y2', function(d) { return y(d.y2); })                       
                        .attr("stroke", function (d) {
                           // console.log('d',d)
                            return (d.color == false) ? 'red' : 'blue';
                        })
                        .attr("stroke-width", 2);


                    
                  // Add the X Axis
           var x_g=     svg.append("g")
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .style("display", function () {
                        return options.show_XAxis ? 'block' : 'none';
                    })
                      .call(d3.axisBottom(xScale));
           //  X Axis path        
           x_g.selectAll("path")
           .attr("class", "x axispath")
           .style("stroke", "#ccc")
           .style("shape-rendering", "crispEdges")
           .style("fill", "none")
           .style("display", function () {
               return options.show_XAxisPath ? 'block' : 'none';
           });
        //  X Axis Text  
        x_g.selectAll('text')
        .attr('font-weight', 'normal')
        .style("font-size", options.fontSize_XAxis + "px")
        .style("font-family", options.fontFamily_XAxis)
        .style("text-anchor", "start")
        .attr("dx", ".8em")
        .attr("dy", ".5em")
        // .attr("transform", function () {
        //     return options.rotate_XAxisText ? 'rotate(-120)' : 'rotate(0)';
        // });

//  X Axis Ticks                   
x_g.selectAll("line")
        .attr("class", "x axisline")
        .style("stroke", "#ccc")
        .style("shape-rendering", "crispEdges")
        .style("fill", "none")
        .style("display", function () {
            return options.show_XAxisTicks ? 'block' : 'none';
        })
        // .attr("transform", function () {
        //     return options.rotate_XAxisTicks ? 'rotate(-60)' : 'rotate(0)';
        // });

                  // Add the Y Axis
              var y_g=    svg.append("g")
                  .style("display", function () {
                    return options.show_YAxis ? 'block' : 'none';
                })
                      .call(d3.axisLeft(yScale));


        //  Y Axis path        
        y_g.selectAll("path")
        .attr("class", "y axispath")
        .style("stroke", "#ccc")
        .style("shape-rendering", "crispEdges")
        .style("fill", "none")
        .style("display", function () {
            return options.show_YAxisPath ? 'block' : 'none';
        });
//  Y Axis Text                   
y_g.selectAll('text')
        .attr('font-weight', 'normal')
        .style("font-size", options.fontSize_YAxis + "px")
        .style("font-family", options.fontFamily_YAxis)
        .style("display", function () {
            return options.show_YAxisText ? 'block' : 'none';
        })
        // .attr("transform", function () {
        //     return options.rotate_YAxisText ? 'rotate(-120)' : 'rotate(0)';
        // });
//  Y Axis Ticks                   
y_g.selectAll("line")
        .attr("class", "y axisline")
        .style("stroke", "#ccc")
        .style("shape-rendering", "crispEdges")
        .style("fill", "none")
        .style("display", function () {
            return options.show_YAxisTicks ? 'block' : 'none';
        })
        // .attr("transform", function () {
        //     return options.rotate_YAxisTicks ? 'rotate(-60)' : 'rotate(0)';
        // });

                      svg.selectAll("myCircles")
                      .data(data)
                      .enter()
                      .append("circle")
                        //.attr("fill", "teal")
                        .style("fill", function(d) {
                            if (d.iserr == true) {return "#009ACD"}
                            else 	{ return "red" }
                        ;})
                        .attr("stroke", "none")
                        .attr("cx", function(d) { return x(d.date)})
                       
                        .attr("cy", function(d) { return y(d.close) })
                       .attr("r", 7)
                
                      
                });
};
                
Piechart1(option);
    function Piechart2(options) {
        $(options.container).empty();
        if (options)
        {
            options.container = options.container ? options.container : "body";
            options.width = options.width ? options.width : $(options.container).width()/3;
            options.height = options.height ? options.height : 300;
            options.marginTop = options.marginTop ? options.marginTop : 30;
            options.marginBottom = options.marginBottom ? options.marginBottom : 30;
            options.marginRight = options.marginRight ? options.marginRight : 20;
            options.marginLeft = options.marginLeft ? options.marginLeft : 50;
            options.show_YAxis = options.show_YAxis ? options.show_YAxis : true;
            options.show_YAxisText = options.show_YAxisText ? options.show_YAxisText : true;
            options.rotate_YAxisText = options.rotate_YAxisText ? options.rotate_YAxisText : false;              
            options.show_YAxisPath = options.show_YAxisPath ? options.show_YAxisPath : true;
            options.show_YAxisTicks = options.show_YAxisTicks ? options.show_YAxisTicks : true;
            options.rotate_YAxisTicks = options.rotate_YAxisTicks ? options.rotate_YAxisTicks : true;
            options.fontSize_YAxis =options.fontSize_YAxis ?options.fontSize_YAxis:10;
            options.fontFamily_YAxis = options.fontFamily_YAxis?options.fontFamily_YAxis:"sans-serif";
            options.show_XAxis = options.show_XAxis ? options.show_XAxis : true;
            options.show_XAxisText = options.show_XAxisText ? options.show_XAxisText : true;
            options.rotate_XAxisText = options.rotate_XAxisText ? options.rotate_XAxisText : true;
            options.show_XAxisPath = options.show_XAxisPath ? options.show_XAxisPath : true;
            options.show_XAxisTicks = options.show_XAxisTicks ? options.show_XAxisTicks : true;
            options.rotate_XAxisTicks = options.rotate_XAxisTicks ? options.rotate_XAxisTicks : false;
            options.fontSize_XAxis =options.fontSize_XAxis ?options.fontSize_XAxis:10;
            options.fontFamily_XAxis = options.fontFamily_XAxis?options.fontFamily_XAxis:"sans-serif";
            options.gridx = options.gridx ? options.gridx : false;
            options.gridy = options.gridy ? options.gridy : false;
            options.strokeLineColor = options.strokeLineColor ?options.strokeLineColor:"red"
        }

            margin = {top: options.marginTop, right: options.marginRight, bottom: options.marginBottom, left: options.marginLeft}

        var width = options.width - options.marginRight - options.marginLeft,
                height = options.height - options.marginTop - options.marginBottom;

        // parse the date / time
        var parseTime = d3.timeParse("%b %d, %Y");


               // Get the data
               d3.json("line.json", function(error, data) {
                if (error) throw error;
              
                // format the data
                data.forEach(function(d) {
                    d.date = parseTime(d.date);
                    //d.data(dataset.map(function(d) { return +d; }))
                    d.close = +d.close;
                });
        
        
        var x = d3.scaleTime().range([0, width]);
      var y = d3.scaleLinear().range([height, 0]);

  
    var xScale=x.domain(d3.extent(data, function(d) { return d.date; }));
    var yScale=y.domain([0, d3.max(data, function(d) { return d.close; })]);


                    // append the svg obgect to the body of the page
                // appends a 'group' element to 'svg'
                // moves the 'group' element to the top left margin
                var svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");
                
                  // Scale the range of the data
                 

              var lineData = data.map(function (point, index, arr) {

                    var next = arr[index + 1],
                        prev = arr[index - 1];
                    return {
                        x: point.date,
                        y: point.close,
                        x1: point.date,
                        y1: point.close,
                        x2: (next) ? next.date : prev.date,                        
                        y2: (next) ? next.close : prev.close,
                        color: point.iserr

                    };
                });
                svg.selectAll('line')
                        .data(lineData)
                        .enter()
                        .append('line')
                        .attr('x1', function(d) { return x(d.x1); })
                        .attr('y1', function(d) { return y(d.y1); })
                        .attr('x2', function(d) { return x(d.x2); })                       
                        .attr('y2', function(d) { return y(d.y2); })                       
                        .attr("stroke", function (d) {
                           // console.log('d',d)
                            return (d.color == false) ? 'red' : 'blue';
                        })
                        .attr("stroke-width", 2);


                    
                  // Add the X Axis
           var x_g=     svg.append("g")
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .style("display", function () {
                        return options.show_XAxis ? 'block' : 'none';
                    })
                      .call(d3.axisBottom(xScale));
           //  X Axis path        
           x_g.selectAll("path")
           .attr("class", "x axispath")
           .style("stroke", "#ccc")
           .style("shape-rendering", "crispEdges")
           .style("fill", "none")
           .style("display", function () {
               return options.show_XAxisPath ? 'block' : 'none';
           });
        //  X Axis Text  
        x_g.selectAll('text')
        .attr('font-weight', 'normal')
        .style("font-size", options.fontSize_XAxis + "px")
        .style("font-family", options.fontFamily_XAxis)
        .style("text-anchor", "start")
        .attr("dx", ".8em")
        .attr("dy", ".5em")
        // .attr("transform", function () {
        //     return options.rotate_XAxisText ? 'rotate(-120)' : 'rotate(0)';
        // });

//  X Axis Ticks                   
x_g.selectAll("line")
        .attr("class", "x axisline")
        .style("stroke", "#ccc")
        .style("shape-rendering", "crispEdges")
        .style("fill", "none")
        .style("display", function () {
            return options.show_XAxisTicks ? 'block' : 'none';
        })
        // .attr("transform", function () {
        //     return options.rotate_XAxisTicks ? 'rotate(-60)' : 'rotate(0)';
        // });

                  // Add the Y Axis
              var y_g=    svg.append("g")
                  .style("display", function () {
                    return options.show_YAxis ? 'block' : 'none';
                })
                      .call(d3.axisLeft(yScale));


        //  Y Axis path        
        y_g.selectAll("path")
        .attr("class", "y axispath")
        .style("stroke", "#ccc")
        .style("shape-rendering", "crispEdges")
        .style("fill", "none")
        .style("display", function () {
            return options.show_YAxisPath ? 'block' : 'none';
        });
//  Y Axis Text                   
y_g.selectAll('text')
        .attr('font-weight', 'normal')
        .style("font-size", options.fontSize_YAxis + "px")
        .style("font-family", options.fontFamily_YAxis)
        .style("display", function () {
            return options.show_YAxisText ? 'block' : 'none';
        })
        // .attr("transform", function () {
        //     return options.rotate_YAxisText ? 'rotate(-120)' : 'rotate(0)';
        // });
//  Y Axis Ticks                   
y_g.selectAll("line")
        .attr("class", "y axisline")
        .style("stroke", "#ccc")
        .style("shape-rendering", "crispEdges")
        .style("fill", "none")
        .style("display", function () {
            return options.show_YAxisTicks ? 'block' : 'none';
        })
        // .attr("transform", function () {
        //     return options.rotate_YAxisTicks ? 'rotate(-60)' : 'rotate(0)';
        // });

                      svg.selectAll("myCircles")
                      .data(data)
                      .enter()
                      .append("circle")
                        //.attr("fill", "teal")
                        .style("fill", function(d) {
                            if (d.iserr == true) {return "#009ACD"}
                            else 	{ return "red" }
                        ;})
                        .attr("stroke", "none")
                        .attr("cx", function(d) { return x(d.date)})
                       
                        .attr("cy", function(d) { return y(d.close) })
                       .attr("r", 7)
                
                      
                });
};
                
Piechart2(option);
function VerticalBarchart(options) {
    $(options.container).empty();
    if (options)
    {
        options.container = options.container ? options.container : "body";
        options.width = options.width ? options.width : $(options.container).width()/3;
        options.height = options.height ? options.height : 300;
        options.marginTop = options.marginTop ? options.marginTop : 30;
        options.marginBottom = options.marginBottom ? options.marginBottom : 30;
        options.marginRight = options.marginRight ? options.marginRight : 20;
        options.marginLeft = options.marginLeft ? options.marginLeft : 50;
        options.show_YAxis = options.show_YAxis ? options.show_YAxis : true;
        options.show_YAxisText = options.show_YAxisText ? options.show_YAxisText : true;
        options.rotate_YAxisText = options.rotate_YAxisText ? options.rotate_YAxisText : false;              
        options.show_YAxisPath = options.show_YAxisPath ? options.show_YAxisPath : true;
        options.show_YAxisTicks = options.show_YAxisTicks ? options.show_YAxisTicks : true;
        options.rotate_YAxisTicks = options.rotate_YAxisTicks ? options.rotate_YAxisTicks : true;
        options.fontSize_YAxis =options.fontSize_YAxis ?options.fontSize_YAxis:10;
        options.fontFamily_YAxis = options.fontFamily_YAxis?options.fontFamily_YAxis:"sans-serif";
        options.show_XAxis = options.show_XAxis ? options.show_XAxis : true;
        options.show_XAxisText = options.show_XAxisText ? options.show_XAxisText : true;
        options.rotate_XAxisText = options.rotate_XAxisText ? options.rotate_XAxisText : true;
        options.show_XAxisPath = options.show_XAxisPath ? options.show_XAxisPath : true;
        options.show_XAxisTicks = options.show_XAxisTicks ? options.show_XAxisTicks : true;
        options.rotate_XAxisTicks = options.rotate_XAxisTicks ? options.rotate_XAxisTicks : false;
        options.fontSize_XAxis =options.fontSize_XAxis ?options.fontSize_XAxis:10;
        options.fontFamily_XAxis = options.fontFamily_XAxis?options.fontFamily_XAxis:"sans-serif";
        options.gridx = options.gridx ? options.gridx : false;
        options.gridy = options.gridy ? options.gridy : false;
        options.strokeLineColor = options.strokeLineColor ?options.strokeLineColor:"red"
    }

        margin = {top: options.marginTop, right: options.marginRight, bottom: options.marginBottom, left: options.marginLeft}

    var width = options.width - options.marginRight - options.marginLeft,
            height = options.height - options.marginTop - options.marginBottom;

    // parse the date / time
    var parseTime = d3.timeParse("%b %d, %Y");


           // Get the data
           d3.json("line.json", function(error, data) {
            if (error) throw error;
          
            // format the data
            data.forEach(function(d) {
                d.date = parseTime(d.date);
                //d.data(dataset.map(function(d) { return +d; }))
                d.close = +d.close;
            });
    
    
    var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);


var xScale=x.domain(d3.extent(data, function(d) { return d.date; }));
var yScale=y.domain([0, d3.max(data, function(d) { return d.close; })]);


                // append the svg obgect to the body of the page
            // appends a 'group' element to 'svg'
            // moves the 'group' element to the top left margin
            var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");
            
              // Scale the range of the data
             

          var lineData = data.map(function (point, index, arr) {

                var next = arr[index + 1],
                    prev = arr[index - 1];
                return {
                    x: point.date,
                    y: point.close,
                    x1: point.date,
                    y1: point.close,
                    x2: (next) ? next.date : prev.date,                        
                    y2: (next) ? next.close : prev.close,
                    color: point.iserr

                };
            });
            svg.selectAll('line')
                    .data(lineData)
                    .enter()
                    .append('line')
                    .attr('x1', function(d) { return x(d.x1); })
                    .attr('y1', function(d) { return y(d.y1); })
                    .attr('x2', function(d) { return x(d.x2); })                       
                    .attr('y2', function(d) { return y(d.y2); })                       
                    .attr("stroke", function (d) {
                       // console.log('d',d)
                        return (d.color == false) ? 'red' : 'blue';
                    })
                    .attr("stroke-width", 2);


                
              // Add the X Axis
       var x_g=     svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .style("display", function () {
                    return options.show_XAxis ? 'block' : 'none';
                })
                  .call(d3.axisBottom(xScale));
       //  X Axis path        
       x_g.selectAll("path")
       .attr("class", "x axispath")
       .style("stroke", "#ccc")
       .style("shape-rendering", "crispEdges")
       .style("fill", "none")
       .style("display", function () {
           return options.show_XAxisPath ? 'block' : 'none';
       });
    //  X Axis Text  
    x_g.selectAll('text')
    .attr('font-weight', 'normal')
    .style("font-size", options.fontSize_XAxis + "px")
    .style("font-family", options.fontFamily_XAxis)
    .style("text-anchor", "start")
    .attr("dx", ".8em")
    .attr("dy", ".5em")
    // .attr("transform", function () {
    //     return options.rotate_XAxisText ? 'rotate(-120)' : 'rotate(0)';
    // });

//  X Axis Ticks                   
x_g.selectAll("line")
    .attr("class", "x axisline")
    .style("stroke", "#ccc")
    .style("shape-rendering", "crispEdges")
    .style("fill", "none")
    .style("display", function () {
        return options.show_XAxisTicks ? 'block' : 'none';
    })
    // .attr("transform", function () {
    //     return options.rotate_XAxisTicks ? 'rotate(-60)' : 'rotate(0)';
    // });

              // Add the Y Axis
          var y_g=    svg.append("g")
              .style("display", function () {
                return options.show_YAxis ? 'block' : 'none';
            })
                  .call(d3.axisLeft(yScale));


    //  Y Axis path        
    y_g.selectAll("path")
    .attr("class", "y axispath")
    .style("stroke", "#ccc")
    .style("shape-rendering", "crispEdges")
    .style("fill", "none")
    .style("display", function () {
        return options.show_YAxisPath ? 'block' : 'none';
    });
//  Y Axis Text                   
y_g.selectAll('text')
    .attr('font-weight', 'normal')
    .style("font-size", options.fontSize_YAxis + "px")
    .style("font-family", options.fontFamily_YAxis)
    .style("display", function () {
        return options.show_YAxisText ? 'block' : 'none';
    })
    // .attr("transform", function () {
    //     return options.rotate_YAxisText ? 'rotate(-120)' : 'rotate(0)';
    // });
//  Y Axis Ticks                   
y_g.selectAll("line")
    .attr("class", "y axisline")
    .style("stroke", "#ccc")
    .style("shape-rendering", "crispEdges")
    .style("fill", "none")
    .style("display", function () {
        return options.show_YAxisTicks ? 'block' : 'none';
    })
    // .attr("transform", function () {
    //     return options.rotate_YAxisTicks ? 'rotate(-60)' : 'rotate(0)';
    // });

                  svg.selectAll("myCircles")
                  .data(data)
                  .enter()
                  .append("circle")
                    //.attr("fill", "teal")
                    .style("fill", function(d) {
                        if (d.iserr == true) {return "#009ACD"}
                        else 	{ return "red" }
                    ;})
                    .attr("stroke", "none")
                    .attr("cx", function(d) { return x(d.date)})
                   
                    .attr("cy", function(d) { return y(d.close) })
                   .attr("r", 7)
            
                  
            });
};
            
VerticalBarchart(option);

});
