//============Pie Chart=========//
var labelColor = '#f4f4f4',
  pieColor1 = '#102F24',
  pieColor2 = '#77AD9B',
  pieColor3 = '#174636',
  pieColor4 = '#236851',
  pieColor5 = '#8AB9A9',
  pieColor6 = '#2A7F62',
  pieColor7 = '#C4DCD4',
  donutChart = false; //change donutChart boolean here

//margin and radius
var margin = {top: 20, right: 20, bottom: 20, left: 20},
width = 500 - margin.right - margin.left,
height = 500 - margin.top - margin.bottom,
radius = width/2;

// arc generator
var arc = d3.arc()
  .outerRadius(radius - 10)
  .innerRadius(function(d) {
    if (donutChart) {
      return 130;
    } else {
      return 0;
    }
  })


var labelArc = d3.arc()
  .outerRadius(radius - 50)
  .innerRadius(radius - 50)

//pie generator
var pie = d3.pie()
  .sort(null)
  .value(function(d) { return d.count; });

//define svg
var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + width/2 + ', ' + height/2 + ')');

  //import data
  d3.csv('data.csv', function(error, data) {
    if (error) throw error;
    //parse data
    data.forEach(function(d) {
      d.count = +d.count;
      d.item = d.item;
      d.color = d.color;
    });

    //append g elements (arc)
    var g = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    //append path of the arc
    g.append('path')
      .attr('d', arc)
      .style('fill', function(d) { return d.data.color})
      .transition()
      .ease(d3.easeLinear)
      .duration(1500)
      .attrTween('d', pieTween)

    //append text (labels)
    g.append('text')
      .style('fill', labelColor)
      .transition()
      .delay(1500)
      .ease(d3.easeLinear)
      .duration(800)
      .attrTween('d', pieTween)
      .attr('transform', function(d) { return 'translate(' + labelArc.centroid(d) + ')';})
      .attr('dy', '.35em')
      .text(function(d) {return d.data.item})

  });

  function pieTween(b) {
    b.innerRadius = 0;
    var i = d3.interpolate({startAngle: 0, endAngle: -0}, b);
    return function (t) { return arc(i(t))}
  }
