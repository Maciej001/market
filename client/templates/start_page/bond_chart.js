Template.bondChart.onRendered(function(){
    var cPink = '#c61c6f',
        cOrange ='#ffb832',
        lOrange = '#FFDABD',
        cVeryLightOrange = '#FFF2E8';
    
    // Get data
    var curve = Bonds.findOne({name: 'HGB'});
    var crvData = _.map(curve.buckets, function(bucket) {
        bucket.maturity = d3.time.format("%Y/%m/%d").parse(bucket.maturity);
        return bucket;
    });
    
    // Set options
    var options = {
        element:        '#chart',
        margin:         { top: 30, right: 20, bottom: 30, left: 50 },
        width:          600,
        height:         400,
        interpolation: 'basis',
        colorScale:     [cOrange, cPink]
    };
    

    var simpleLineChart = function(mktData, options) {
        
        // map maturities to the range [0,1]
        // myData is used for drawing a chart, whereas original mktData is used for xAxes to display dates
        var myData = _.map(mktData, function(d) {
            var start_end_date = d3.extent(mktData, function(d) {return d.maturity});
            
            var start_date = start_end_date[0];
            var last_date  = start_end_date[1];
            
            return {
                maturity:   (d.maturity - start_date)/(last_date-start_date),
                price:      d.price
            }
        })
        
        var dataTable = _.map(myData, function(d){
                                return [ d.maturity, d.price ]; 
                            });
        
        var result = regression('polynomial', dataTable, 4);
        
        var regressedData = _.map(result.points, function(p){
                                return {
                                    maturity: p[0],
                                    price:    p[1]
                                }
        });
        
        var myColors = d3.scale.linear()
                        .domain(d3.extent(mktData, function(d) {return d.price}))
                        .range(options.colorScale);
        
        var width   = options.width - options.margin.left - options.margin.right,
            height  = options.height - options.margin.top - options.margin.bottom;
            
        var x = d3.time.scale()
                    .domain(d3.extent(mktData, function(d){ return d.maturity; }))
                    .range([0, width]);
                    
        var x_maturity = d3.scale.linear()
                            .domain([d3.min(myData, function(d){ return d.maturity; }), d3.max(myData, function(d){ return d.maturity; })])
                            .range([0, width]);
                    
        var y = d3.scale.linear()
                    .domain([0, d3.max(mktData, function(d){ return d.price; })])
                    .range([height + options.margin.top + options.margin.bottom, 0]);
            
        var xAxis = d3.svg.axis().scale(x)
                        .orient('bottom')
                        .ticks(5);
                        
        var yAxis = d3.svg.axis().scale(y)
                        .orient('left')
                        .ticks(5);
                        
        var valueline = d3.svg.line()
                            .interpolate(options.interpolation)
                            .x(function(d){ return x_maturity(d.maturity); })
                            .y(function(d){ return y(d.price); });
                            
        var svg = d3.select(options.element)
                    .append('svg')
                        .attr('width', options.width + options.margin.left + options.margin.right)
                        .attr('height', options.height + options.margin.top + options.margin.bottom)
                    .append('g')
                        // set new (0, 0) for drawings that will come
                        .attr('transform', 'translate(' + options.margin.left + ', ' + options.margin.top + ')')
                    
                    
                    
        svg.append("path")
            .attr("d", valueline(regressedData));
            
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + options.height + ')')
            .call(xAxis)
            
        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
        
        svg.append('g')
            // .attr('transform', 'translate( ' + options.margin.left + ',' + options.margin.top + ')')
            .selectAll('cicle')
                .data(myData)
                .enter()
            .append('circle')
                .style('fill', function(d) { return myColors(d.price) })
                .attr('r', 5)
                .attr('cx', function(d) { return x_maturity(d.maturity); })
                .attr('cy', function(d){ return y(d.price); })
                
    }; // end of function
    
    
    simpleLineChart(crvData,  options);
});