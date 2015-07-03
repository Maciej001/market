## Selections

- to change class
```
d3.selectAll('.item')
    .attr('class', 'highlight');
``` 

or 

```
d3.selectAll('.item')
    .classed('highlight', true);
    
d3.selectAll('.item')
    .classed({
        'highlight': true,
        'bigger':    false
    });
```

- to style
```
d3.selectAll('.item')
    .style({
        'background': '#fff'
        'margin':  '10px'
    })
```

```
var data=[
    {   width: 220,
        color: '#444'
    },
    etc
]

d3.selectAll('.item').
    .data(myStyles)
    .style({
        'color': function(d){
            return d.color;
        },
        width: function(d){
            retirm d.width + 'px';
        }
    })
```

### Create group and copy it 
<g id="triangle">
    <polyline points="10 35, 30 10, 50 35" style="fill= #f7b330;"/>
</g>

<use xlink:href="#triangle"
    x="30" y="0" />