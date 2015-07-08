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
    
    crvData.length = curve.buckets.length;
    
    var margin = { top: 30, right: 20, bottom: 30, left: 50 };
    
    var myChart =   {
                        height:     400 - margin.top - margin.bottom,
                        width:      600 - margin.right - margin.left,
                        barWidth:   20,
                        barOffset:  5,
                        background: lOrange,
                        barOuterPad: 0.2,
                        barPad: 0.1, 
                    };
                    
    var tooltip = d3.select('#chart').append('div')
        .classed('tooltip', true)
        .classed('tooltip-on', false);
    
    var myColors = d3.scale.linear()
        .domain([0, d3.max(_.map(crvData, function(d) {return d.price}))] )
        .range([cOrange, cPink]);
    
    var yScale = d3.scale.linear()
            .domain([0, d3.max(_.map(crvData, function(d) {return d.price}))]) 
            .range([0, myChart.height]);
            
    var xScale = d3.scale.ordinal()
            .domain(d3.range(0, crvData.length))
            .rangeRoundBands([0, myChart.width ], myChart.barPad, myChart.barOuterPad);
    
    d3.select('#chart')
        .append('svg')
            .attr('width', myChart.width + margin.right + margin.left)
            .attr('height', myChart.height + margin.top + margin.bottom)
        .append('g')
            .attr('transform', 'translate( ' +margin.left + ',' + margin.top + ')')
        .selectAll('cicle')
            .data(crvData)
            .enter()
        .append('circle')
            .style('fill', function(d) { return myColors(d.price) })
            .attr('r', 5)
            .attr('cx', function(d,i) { return xScale(i); })
            .attr('cy', function(d){ return (myChart.height - yScale(d.price)); })
            .on('mouseover', function(d){
                tooltip.transition()
                    .classed('tooltip-on', true);
                
                tooltip.html(d.name + ' ' + d.price)
                    .style('left',  (d3.event.pageX + 10) + 'px')
                    .style('top',   (d3.event.pageY - 20) + 'px');
                    
                d3.select(this)
                    .style('opacity', 0.5);
            })
            .on('mouseout', function(d){
                d3.select(this)
                    .style('opacity', 1);
            });
            
        // Vertical axis
        var yGuideScale = d3.scale.linear()
            .domain([0, d3.max(_.map(crvData, function(item) {return item.price}))])
            .range([myChart.height, 0]);
    
        var yAxis = d3.svg.axis()
            .scale(yGuideScale)
            .orient('left')
            .ticks(8);
            
        var yGuide = d3.select('svg').append('g');
            
        yAxis(yGuide);
        
        yGuide.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        
        yGuide.selectAll('path')
            .style({ fill: 'none', stroke: '#000'});
            
        yGuide.selectAll('line')
            .style({ stroke: '#000'});
            
            
        // Horizontal axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom')
            .tickValues(xScale.domain());
        
        var xGuide = d3.select('svg').append('g')
        xAxis(xGuide); 
        
        xGuide.attr('transform', 'translate(' + margin.left + ', ' + (myChart.height + margin.top ) + ')');
        xGuide.selectAll('path')
            .style({ fill: 'none', stroke: '#000'})
        xGuide.selectAll('line')
            .style({ stroke: '#000'});
            
            
            
    //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////
    // CHART 2
    
    var options = {
        element:     '#chart2',
        margin:     margin,
        width:      600,
        height:     400,
        interpolation: 'basis'
    };
    

    var simpleLineChart = function(mktData, options) {
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
                    .data(mktData);
                    
        svg.append("path")
            .attr("d", valueline(mktData));
            
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, ' + options.height + ')')
            .call(xAxis);
            
    }; // end of function
    
    
    simpleLineChart(crvData,  options);
});