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
    
    ///////////////////////////////////////////////////////////////////////////
    ///////////        REGRESSION       
    ///////////////////////////////////////////////////////////////////////////
    
    // var data = _.map(curve.buckets, function(bucket,i){
    //     return [ i, bucket.price ]; 
    // });
    // var result = regression('polynomial', data, 4);
    // console.log('data ', data);
    // console.log('result ', result);
    
    // crvData = _.map(result.points, function(p){
    //     return {
    //         maturity: p[0],
    //         price:    p[1]
    //     }
    // })
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
        
        var myColors = d3.scale.linear()
                        .domain(d3.extent(mktData, function(d) {return d.price}))
                        .range(options.colorScale);
        
        var width = options.width - options.margin.left - options.margin.right,
            height = options.height - options.margin.top - options.margin.bottom;
            
        var x = d3.time.scale()
                    .domain(d3.extent(mktData, function(d){ return d.maturity; }))
                    .range([0, width]);
                    
        var y = d3.scale.linear()
                    .domain([0, d3.max(mktData, function(d){ return d.price; })])
                    .range([height, 0]);
            
        var xAxis = d3.svg.axis().scale(x)
                        .orient('bottom')
                        .ticks(5);
                        
        var yAxis = d3.svg.axis().scale(y)
                        .orient('left')
                        .ticks();
                        
        var valueline = d3.svg.line()
                            .interpolate(options.interpolation)
                            .x(function(d){ return x(d.maturity); })
                            .y(function(d){ return y(d.price); });
                            
        var svg = d3.select(options.element)
                    .append('svg')
                        .attr('width', options.width + options.margin.left + options.margin.right)
                        .attr('height', options.height + options.margin.top + options.margin.bottom)
                    .append('g')
                        .attr('transform', 'translate(' + options.margin.left + ', ' + options.margin.top + ')')
                    
                    
                    
        svg.append("path")
            .attr("d", valueline(mktData));
            
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, ' + options.height + ')')
            .call(xAxis);
            
        svg.append('g')
            // .attr('transform', 'translate( ' + options.margin.left + ',' + options.margin.top + ')')
            .selectAll('cicle')
                .data(mktData)
                .enter()
            .append('circle')
                .style('fill', function(d) { return myColors(d.price) })
                .attr('r', 5)
                .attr('cx', function(d) { return x(d.maturity); })
                .attr('cy', function(d){ return y(d.price); })
                
    }; // end of function
    
    
    simpleLineChart(crvData,  options);
});