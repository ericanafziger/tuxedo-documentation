//============Pie Chart=========//
var labelColor = '#f4f4f4',
  donutChart = false; //change to true for donutChart or false for pie chart

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
  .outerRadius(radius - 60)
  .innerRadius(radius - 60)

//pie generator
var pie = d3.pie()
  .sort(null)
  .value(function(d) { return d.weight; });

//define svg
var svg = d3.selectAll('.pieChart').append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + width/2 + ', ' + height/2 + ')');




  //import data
  d3.json("data.json", function(error, data) { //change json to csv to change data type
    if (error) throw error;
    //parse data
    data.forEach(function(d) {
      d.species = d.species;
      d.weight = +d.weight;
      d.color = d.color;
    });


    //append g elements (arc)
    var g = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      // .on("mouseover", function() {
      //     d3.select(this).classed("hover", true);
      // })
      // .on("mouseout", function() {
      //     d3.select(this).classed("hover", false);
      // })
      .attr('class', 'arc');

    //append path of the arc
    g.append('path')
      .attr('d', arc)
      .style('fill', function(d) { return d.data.color})
      .style('opacity', 0.8)
      .on("mouseover", function() { //add hover functionality
        d3.select(this).transition()
        .style("opacity", 1)
        .style("cursor", 'pointer')
        d3.select(this.parentNode).selectAll("text")
        .transition()
        .duration(200)
        .style('opacity', 1)

      })
      .on("mouseout", function() { //take away hover changes
        d3.select(this).transition()
        .style("opacity", 0.8)
        d3.select(this.parentNode).selectAll("text")
        .transition()
        .duration(200)
        .style('opacity', 0)
      })
      .transition()
      .ease(d3.easeLinear)
      .duration(1500)
      .attrTween('d', pieTween)


    //append text (labels)
    g.append('text')
      .style('fill', labelColor)
      .style('opacity', 0)
      .transition()
      .delay(1500)
      .ease(d3.easeLinear)
      .duration(400)
      // .attrTween('d', pieTween)
      .attr('transform', function(d) { return 'translate(' + labelArc.centroid(d) + ')';})
      .attr('dy', '.35em')
      .text(function(d) {return d.data.species + " (" + d.data.weight + " lbs)"})

  });

  function pieTween(b) {
    b.innerRadius = 0;
    var i = d3.interpolate({startAngle: 0, endAngle: -0}, b);
    return function (t) { return arc(i(t))}
  }
