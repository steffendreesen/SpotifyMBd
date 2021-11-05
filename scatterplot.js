d3.csv("movie_data.csv", function (dataset) {

  var attributes_full = ["Average Valence", "Average Danceability", "Average Energy",
                          "Average Key", "Average Loudness", "Average Mode", 
                          "Average Speechiness", "Average Acousticness",
                          "Average Instrumentallness", "Average Liveness", "Average Tempo"
  ]

  //converting all values to numbers (d3.csv converts to String, need them to be numeric)
  dataset.forEach((d) => {
    d.Avg_Valence = +d.Avg_Valence;
    d.Avg_Danceability = +d.Avg_Danceability;
    d.Avg_Energy = +d.Avg_Energy;
    d.Avg_Key = +d.Avg_Key;
    d.Avg_Loudness = +d.Avg_Loudness;
    d.Avg_Mode = +d.Avg_Mode;
    d.Avg_Speechiness = +d.Avg_Speechiness;
    d.Avg_Acousticness = +d.Avg_Acousticness;
    d.Avg_Instrumentallness = +d.Avg_Instrumentallness;
    d.Avg_Liveness = +d.Avg_Liveness;
    d.Avg_Tempo = +d.Avg_Tempo;
  });

  var dimensions = {
    margin: {
      top: 30,
      bottom: 100,
      right: 80,
      left: 60,
    },
    width: 1300,
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

  //genres to exclude
  //NOTE: discovered that Horror and Western are both light purple
  var genreExclusionSet = new Set();
  /*
  genreExclusionSet.add("Drama");
  genreExclusionSet.add("Comedy");
  genreExclusionSet.add("Action");
  genreExclusionSet.add("Documentary");
  genreExclusionSet.add("Adventure");
  genreExclusionSet.add("Adult");
  genreExclusionSet.add("Short");
  genreExclusionSet.add("Romance");
  genreExclusionSet.add("Family");
  genreExclusionSet.add("History");
  genreExclusionSet.add("Crime");
  genreExclusionSet.add("Animation");
  genreExclusionSet.add("Mystery");
  genreExclusionSet.add("Biography");
  genreExclusionSet.add("News");
  genreExclusionSet.add("Sci-Fi");
  genreExclusionSet.add("Musical");
  genreExclusionSet.add("Sport");
  genreExclusionSet.add("Fantasy");
  genreExclusionSet.add("Music");
  genreExclusionSet.add("Game-Show");
  genreExclusionSet.add("Reality-TV");
  genreExclusionSet.add("Horror");
  genreExclusionSet.add("Thriller");
  genreExclusionSet.add("Western");
  */

  var titleAccessor = (d) => d.Title;
  var genreAccessor = (d) => d.Genre_1;

  //changing these vars will change the x and y axis in the scatterplot
  // Initialize attributes of x and y axis

  // TODO: Make these defaults show in the dropdown at the start
  // These were x = Energy and y = Loudness
  var x_attribute = "Average Valence";
  var y_attribute = "Average Valence";

  var xAxisLabel = x_attribute;
  var yAxisLabel = y_attribute;

  var xAccessor;
  var yAccessor;

  // Functions to map an attribute string to a column of data
  // i.e "Average Valence" -> d.Avg_Valence
  var set_xAccessor = function(new_x_attribute){
      switch (new_x_attribute) {
          case "Average Valence":
              xAccessor = (d) => d.Avg_Valence;
              break;
          case "Average Danceability":
              xAccessor = (d) => d.Avg_Danceability;
              break;
          case "Average Energy":
              xAccessor = (d) => d.Avg_Energy;
              break;
          case "Average Key":
              xAccessor = (d) => d.Avg_Key;
              break;
          case "Average Loudness":
              xAccessor = (d) => d.Avg_Loudness;
              break;
          case "Average Mode":
              xAccessor = (d) => d.Avg_Mode;
              break;
          case "Average Speechiness":
              xAccessor = (d) => d.Avg_Speechiness;
              break;
          case "Average Acousticness":
              xAccessor = (d) => d.Avg_Acousticness;
              break;
          case "Average Instrumentallness":
              xAccessor = (d) => d.Avg_Instrumentallness;
              break;
          case "Average Liveness":
              xAccessor = (d) => d.Avg_Liveness;
              break;
          case "Average Tempo":
              xAccessor = (d) => d.Avg_Tempo;
              break;
      }
  }
 
  var set_yAccessor = function(new_y_attribute){
      switch (new_y_attribute) {
          case "Average Valence":
              yAccessor = (d) => d.Avg_Valence;
              break;
          case "Average Danceability":
              yAccessor = (d) => d.Avg_Danceability;
              break;
          case "Average Energy":
              yAccessor = (d) => d.Avg_Energy;
              break;
          case "Average Key":
              yAccessor = (d) => d.Avg_Key;
              break;
          case "Average Loudness":
              yAccessor = (d) => d.Avg_Loudness;
              break;
          case "Average Mode":
              yAccessor = (d) => d.Avg_Mode;
              break;
          case "Average Speechiness":
              yAccessor = (d) => d.Avg_Speechiness;
              break;
          case "Average Acousticness":
              yAccessor = (d) => d.Avg_Acousticness;
              break;
          case "Average Instrumentallness":
              yAccessor = (d) => d.Avg_Instrumentallness;
              break;
          case "Average Liveness":
              yAccessor = (d) => d.Avg_Liveness;
              break;
          case "Average Tempo":
              yAccessor = (d) => d.Avg_Tempo;
              break;
      }
  }

  set_xAccessor(x_attribute)
  set_yAccessor(y_attribute)

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
    .attr("r", (d) => {
      if (genreExclusionSet.has(genreAccessor(d))) {
        return 0;
      } else {
        return circleRadius;
      }
    });

  dots
    .on("mouseover", function (d, i) {
      d3.select(this)
        .transition()
        .duration("100")
        .attr("r", circleRadius * 4);
      div.transition().duration(100).style("opacity", 1);
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
    .attr("x", dimensions.width / 2)
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

  /* Create a dropdown button for the x and y axis */
  var xSelector = d3.select("#xSelector")
                      .append("select")
                      .selectAll('attributes')
                      .data(attributes_full)
                      .enter()
                      .append('option')
                      .text(function (d) {return d;}) // text showed in the menu
                      .attr("value", function (d) { return d;}) // corresponding value returned by the button
   

  var ySelector = d3.select("#ySelector")
                      .append("select")
                      .selectAll('attributes')
                      .data(attributes_full)
                      .enter()
                      .append('option')
                      .text(function (d) {return d;}) // text showed in the menu
                      .attr("value", function (d) { return d;}) // corresponding value returned by the button

  /* Define a callback function for when the axis attribute selections are changed */                        
  d3.select("#xSelector").on("change", function(){

      var selectedAttribute = d3.select(this)
                                  .select("select")
                                  .property("value")

      updateGraph('x', selectedAttribute)

  })
  
  d3.select("#ySelector").on("change", function(){

      var selectedAttribute = d3.select(this)
                                  .select("select")
                                  .property("value")

      updateGraph('y', selectedAttribute)
  
  })

  /* Updates the graph when an axis attribute is changed 
  axis = 'x' if the x axis is changing, or 'y' if the y axis is changing */
  var updateGraph = function(axis, selectedAttribute){

      // change x axis
      if(axis == 'x'){

          xAxisLabel = selectedAttribute

          set_xAccessor(selectedAttribute)  

          xScale
              .domain(d3.extent(dataset, xAccessor))

          xAxisgen    
              .scale(xScale)

          xAxis.transition().duration(5000)
                  .call(xAxisgen)

          // TODO: make the text change look smooth
          xAxis.transition().duration(1000)
                  .select(".axis-label")
                  .text(selectedAttribute)

          dots.transition().duration(5000)
              .attr("cx", d => xScale(xAccessor(d)))
          
      }

      if(axis == 'y'){
         
          console.log("changing y")
          console.log(selectedAttribute)
          yAxisLabel = selectedAttribute

          set_yAccessor(selectedAttribute)  

          yScale
              .domain(d3.extent(dataset, yAccessor))

          yAxisgen    
              .scale(yScale)

          yAxis.transition().duration(5000)
                  .call(yAxisgen)

          // TODO: make the text change look smooth
          yAxis.transition().duration(1000)
                  .select(".axis-label")
                  .text(selectedAttribute)

          dots.transition().duration(5000)
              .attr("cy", d => yScale(yAccessor(d)))
      }
  }

});