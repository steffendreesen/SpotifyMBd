d3.csv("movie_data.csv", function (dataset) {
  var dimensions = {
    margin: {
      top: 30,
      bottom: 100,
      right: 80,
      left: 60,
    },
    width: 1200,
    height: 700,
  };

  var svg = d3
    .select("#scatterplot")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")"
    );

  var div = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var titleAccessor = (d) => d.Title;
  var genreAccessor = (d) => d.Genre_1;
  var xAccessor = (d) => d.Avg_Valence;
  var xAxisLabel = "Average Valence";
  var yAccessor = (d) => d.Avg_Danceability;
  var yAxisLabel = "Average Danceability";

  var xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([
      dimensions.margin.left,
      dimensions.width - dimensions.margin.right,
    ]);

  var yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([
      dimensions.height - dimensions.margin.bottom,
      dimensions.margin.top,
    ]);

  var myColor = d3.scaleOrdinal().domain(dataset).range(d3.schemePaired);

  var circleRadius = 2.5;

  var dots = svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(xAccessor(d)))
    .attr("cy", (d) => yScale(yAccessor(d)))
    .attr("fill", (d) => {
      return myColor(d.Genre_1);
    })
    .attr("r", circleRadius);

  dots
    .on("mouseover", function (d, i) {
      d3.select(this)
        .transition()
        .duration("100")
        .attr("r", circleRadius * 4);
      div.transition().duration(100).style("opacity", 1);
      console.log(
        titleAccessor(d) +
          " (" +
          genreAccessor(d) +
          ") : (" +
          xAccessor(d) +
          "," +
          yAccessor(d) +
          ")"
      );
      div
        .html(
          titleAccessor(d) +
            " (" +
            genreAccessor(d) +
            ") : (" +
            xAccessor(d) +
            "," +
            yAccessor(d) +
            ")"
        )
        .style("left", d3.event.pageX + 10 + "px")
        .style("top", d3.event.pageY - 15 + "px");
    })
    .on("mouseout", function (d, i) {
      d3.select(this).transition().duration("200").attr("r", circleRadius);
      div.transition().duration("200").style("opacity", 0);
    });

  var xAxisgen = d3.axisBottom().scale(xScale);
  var yAxisgen = d3.axisLeft().scale(yScale);

  var xAxis = svg
    .append("g")
    .call(xAxisgen)
    .style(
      "transform",
      `translateY(${dimensions.height - dimensions.margin.bottom}px)`
    );

  xAxis
    .append("text")
    .attr("class", "axis-label")
    .attr("y", 40)
    .attr("x", innerWidth / 2)
    .attr("fill", "black")
    .text(xAxisLabel);

  var yAxis = svg
    .append("g")
    .call(yAxisgen)
    .style("transform", `translateX(${dimensions.margin.left}px)`);

  yAxis
    .append("text")
    .attr("class", "axis-label")
    .attr("y", -40)
    .attr("x", -dimensions.height / 2 + 25)
    .attr("fill", "black")
    .attr("transform", `rotate(-90)`)
    .attr("text-anchor", "middle")
    .text(yAxisLabel);
});
