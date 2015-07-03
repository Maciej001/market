Template.bondChart.onRendered(function(){
    var curve = Curves.findOne({name: 'HUF_BUBOR_3M'});
    var crvData = _.map(curve.buckets, function(bucket) {
        return bucket
    });
    
    var myChart = {
        height:     400,
        width:      600,
        barWidth:   20,
        barOffset:  5,
        background: '#f5f5f5'
    }
    
    var yScale = d3.scale.linear()
            .domain([0, d3.max(_.map(crvData, function(item) {return item.price}))]) // domain is the original range
            .range([0, myChart.height - 20])// domain is the range we want to fit into
    
    d3.select('#chart').append('svg')
        .attr('width', myChart.width)
        .attr('height', myChart.height)
        .style('background', myChart.background)
        .selectAll('rect')
        .data(crvData)
        .enter()
        .append('rect')
            .style('fill', '#c61c6f')
            .attr('width', myChart.barWidth)
            .attr('height', function(d){
                return yScale(d.price);
            })
            .attr('x', function(d,i){
                return i * (myChart.barWidth + myChart.barOffset)
            })
            .attr('y', function(d){
                return (myChart.height - yScale(d.price))
            })
    
    
    
    
});