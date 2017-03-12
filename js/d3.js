//pie chart
//margin and radius
var margin = {top: 20, right: 20, bottom: 20, left: 20},
width = 500 - margin.right - margin.left,
height = 500 - margin.top - margin.bottom,
radius = width/2;

//color generator
var color = d3.scaleOrdinal()
  .range(['#BBDEFB', '#98CAf5', '#6485f6', '#42A5f5', '#2196f3', '#1E88E5', '#1976D2']);

// arc generator
var arc = d3.arc()
  .outerRadius(radius - 10)
  .innerRadius(0);

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
      d.fruit = d.fruit;
    });
    //append g elements (arc)
    var g = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    //append path of the arc
    g.append('path')
      .attr('d', arc)
      .style('fill', function(d) { return color(d.data.fruit)})

    //append text (labels)
    g.append('text')
      .attr('transform', function(d) { return 'translate(' + labelArc.centroid(d) + ')'})
      .attr('dy', '.35em')
      .text(function(d) {return d.data.fruit})

  });
