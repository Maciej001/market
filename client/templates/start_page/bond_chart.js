Template.bondChart.onRendered(function(){
    var curve = Bonds.findOne({name: 'HGB'});
    var crvData = _.map(curve.buckets, function(bucket) {
        return bucket
    });
    crvData.length = curve.buckets.length;
    
    var myChart = {
        height:     400,
        width:      600,
        barWidth:   20,
        barOffset:  5,
        background: '#f5f5f5',
        barOuterPad: 0.2,
        barPad: 0.1
    };
    
    var colors = d3.scale.linear()
        .domain([0,  d3.max(_.map(crvData, function(item) {return item.price}))])
        .range(["#FFB832", "#C61C6F"]);
        
    console.log('my color scale ', colors);
    
    var yScale = d3.scale.linear()
            .domain([0, d3.max(_.map(crvData, function(item) {return item.price}))]) // domain is the original range
            .range([0, myChart.height - 20])// domain is the range we want to fit into
            
    var xScale = d3.scale.ordinal()
            .domain(d3.range(0, crvData.length))
            .rangeRoundBands([0, myChart.width ], myChart.barPad, myChart.barOuterPad)
    
    d3.select('#chart').append('svg')
        .attr('width', myChart.width)
        .attr('height', myChart.height)
        .style('background', myChart.background)
        .selectAll('rect')
        .data(crvData)
        .enter()
        .append('rect')
            .style('fill', colors)
            .attr('width', xScale.rangeBand() )
            .attr('height', function(d){
                return yScale(d.price);
            })
            .attr('x', function(d,i){
                return xScale(i) 
            })
            .attr('y', function(d){
                return (myChart.height - yScale(d.price))
            })
    
    
    
    
});