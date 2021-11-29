const circleRadius = 3;
const minTracks = 2;
const genres = [
  "Drama",
  "Comedy",
  "Action",
  "Documentary",
  "Adventure",
  "Adult",
  "Short",
  "Romance",
  "Family",
  //"History",
  "Crime",
  "Animation",
  "Mystery",
  "Biography",
  //"News",
  //"Sci-Fi",
  "Musical",
  "Sport",
  "Fantasy",
  "Music",
  //"Game-Show",
  //"Reality-TV",
  //"Talk-TV",
  "Horror",
  "Thriller",
  //"Western",
  //"War",
  "Other",
  "All",
];
const genreExclusionSet = new Set();

d3.csv("movie_data.csv", function (dataset) {
  var attributes_full = [
    "Average Valence",
    "Average Danceability",
    "Average Energy",
    "Average Key",
    "Average Loudness",
    "Average Mode",
    "Average Speechiness",
    "Average Acousticness",
    "Average Instrumentallness",
    "Average Liveness",
    "Average Tempo",
  ];

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

    //adjusting genres
    excludedGenres = new Set();
    excludedGenres.add("War");
    excludedGenres.add("History");
    excludedGenres.add("News");
    excludedGenres.add("Game-Show");
    excludedGenres.add("Talk-Show");
    excludedGenres.add("Reality-TV");
    excludedGenres.add("Sci-Fi");
    excludedGenres.add("Western");
    excludedGenres.add("War");
    if (excludedGenres.has(d.Genre_1)) {
      d.Genre_1 = "Other";
    }
  });

  // scatterplot dimensions
  var dimensions = {
    margin: {
      top: 10,
      bottom: 65,
      right: 0,
      left: 32,
    },
    width: 720,
    height: 835,
  };

  // scatterplot
  var svg = d3
    .select("#scatterplot")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")"
    );

  // tooltip div, position is changed when dots are hovered over
  var div = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var titleAccessor = (d) => d.Title;
  var genreAccessor = (d) => d.Genre_1;

  // Initialize attributes of x and y axis
  // TODO: Make these defaults show in the dropdown at the start
  // These were x = Energy and y = Loudness
  var x_attribute = "Average Energy";
  var y_attribute = "Average Loudness";

  var xAxisLabel = x_attribute;
  var yAxisLabel = y_attribute;

  var xAccessor;
  var yAccessor;

  // Functions to map an attribute string to a column of data
  // i.e "Average Valence" -> d.Avg_Valence
  var set_xAccessor = function (new_x_attribute) {
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
  };

  var set_yAccessor = function (new_y_attribute) {
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
  };

  set_xAccessor(x_attribute);
  set_yAccessor(y_attribute);

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

  var myColor = (genre) => {
    switch (genre) {
      case "Drama":
        return "#8eb4be";
        break;
      case "Comedy":
        return "#ffacc9";
        break;
      case "Action":
        return "#736690";
        break;
      case "Documentary":
        return "#567442";
        break;
      case "Adventure":
        return "#ccae86";
        break;
      case "Adult":
        return "#000a3b";
        break;
      case "Short":
        return "#540036";
        break;
      case "Romance":
        return "#ac5f41";
        break;
      case "Family":
        return "#b2c065";
        break;
      case "Crime":
        return "#03efea";
        break;
      case "Animation":
        return "#82ffcc";
        break;
      case "Mystery":
        return "#0287e7";
        break;
      case "Biography":
        return "#cb4b8a";
        break;
      case "Musical":
        return "#a597ff";
        break;
      case "Sport":
        return "#723eb6";
        break;
      case "Fantasy":
        return "#e68700";
        break;
      case "Music":
        return "#ffd41f";
        break;
      case "Horror":
        return "#d10011";
        break;
      case "Thriller":
        return "#8ee200";
        break;
      case "Other":
        return "#ed2be3";
        break;
      case "All":
        return "#62c083";
        break;
    }
  };

  var dots = svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .filter((d) => d.Num_Tracks >= minTracks)
    .append("circle")
    .attr("cx", (d) => xScale(xAccessor(d)))
    .attr("cy", (d) => yScale(yAccessor(d)))
    .attr("fill", (d) => {
      return myColor(d.Genre_1);
    })
    // if all the boxes start unchecked, this should be 0
    .attr("r", circleRadius)
    .attr("class", (d) => {
      return d.Genre_1;
    })
    .attr("opacity", 0.7);

  // hovering functionality for dots
  dots
    .on("mouseover", function (d, i) {
      d3.select(this)
        .transition()
        .duration("100")
        .attr("r", circleRadius * 4)
        .attr("opacity", 1);
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
      d3.select(this)
        .transition()
        .duration("200")
        .attr("r", circleRadius)
        .attr("opacity", 0.7);
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
    )
    .attr("font-size", "13px");

  xAxis
    .append("text")
    .attr("class", "axis-label")
    .attr("y", 48)
    .attr("x", dimensions.width / 2)
    .attr("fill", "black")
    .text(xAxisLabel);

  var yAxis = svg
    .append("g")
    .call(yAxisgen)
    .style("transform", `translateX(${dimensions.margin.left}px)`)
    .attr("font-size", "13px");

  yAxis
    .append("text")
    .attr("class", "axis-label")
    .attr("y", -40)
    .attr("x", -dimensions.height / 2 + 25)
    .attr("fill", "black")
    .attr("transform", `rotate(-90)`)
    .attr("text-anchor", "middle")
    .text(yAxisLabel);

  /* Add a button for each genre in the dataset */
  var filter_buttons_div = d3
    .select("#filter_buttons")
    .selectAll("genres")
    .data(genres)
    .enter()
    // append a button for each element, and set the id to the corresponding genre
    .append("input")
    .attr("type", "button")
    .style("background-color", function (d) {
      return myColor(d);
    })
    .style("font-size", "20px")
    .style("padding", "7px")
    .style("margin", "2px")
    .attr("id", function (d) {
      return d;
    })
    .attr("value", function (d) {
      return d;
    });

  /* Create a dropdown button for the x and y axis */
  var xSelector = d3
    .select("#xSelector")
    .append("select")
    .selectAll("attributes")
    .data(attributes_full)
    .enter()
    .append("option")
    .text(function (d) {
      return d;
    }) // text showed in the menu
    .attr("value", function (d) {
      return d;
    }) // corresponding value returned by the button
    .property("selected", (d) => d === "Average Energy");

  var ySelector = d3
    .select("#ySelector")
    .append("select")
    .selectAll("attributes")
    .data(attributes_full)
    .enter()
    .append("option")
    .text(function (d) {
      return d;
    }) // text showed in the menu
    .attr("value", function (d) {
      return d;
    }) // corresponding value returned by the button
    .property("selected", (d) => d === "Average Loudness");

  /* Define a callback function for when the axis attribute selections are changed */
  d3.select("#xSelector").on("change", function () {
    var selectedAttribute = d3.select(this).select("select").property("value");

    updateGraph("x", selectedAttribute);
  });

  d3.select("#ySelector").on("change", function () {
    var selectedAttribute = d3.select(this).select("select").property("value");

    updateGraph("y", selectedAttribute);
  });

  // hides all dots except for those belonging to genre1 or genre2
  function show_two_genres(genre1, genre2) {
    genreExclusionSet.clear();
    genreExclusionSet.add(genre1);
    genreExclusionSet.add(genre2);

    dots
      .transition()
      .duration(500)
      .attr("r", (d) => {
        if (genreExclusionSet.has(genreAccessor(d))) {
          return 0;
        } else {
          return circleRadius;
        }
      });
  }

  d3.select(".filter_buttons")
    .selectAll("input")
    .on("click", function () {
      var button = d3.select(this);
      var genre = button.attr("id");

      // A bug might w/ removing non-existing value might occur in the future
      // I am assuming that the exclusion set is empty at the start, and all boxes are checked

      // turning button off
      if (!genreExclusionSet.has(genre)) {
        genreExclusionSet.add(genre);

        //update buttons
        if (genre == "All") {
          console.log("genre == all");
          genres.forEach((g) => genreExclusionSet.add(g));
        }

        // turning button on
      } else if (genreExclusionSet.has(genre)) {
        genreExclusionSet.delete(genre);

        //update buttons
        if (genre == "All") {
          console.log("genre == all");

          genres.forEach((g) => genreExclusionSet.delete(g));
        }
      }

      // update points
      // this could be more efficent but I wasn't sure how to check the genre of a dot differently
      dots
        .transition()
        .duration(500)
        .attr("r", (d) => {
          if (genreExclusionSet.has(genreAccessor(d))) {
            return 0;
          } else {
            return circleRadius;
          }
        });

      // update button colors
      d3.select(".filter_buttons")
        .selectAll("input")
        .style("background-color", (d) => {
          if (genreExclusionSet.has(d)) {
            return "gray";
          } else {
            return myColor(d);
          }
        });
    });

  /* Updates the graph when an axis attribute is changed 
  axis = 'x' if the x axis is changing, or 'y' if the y axis is changing */
  var updateGraph = function (axis, selectedAttribute) {
    // change x axis
    if (axis == "x") {
      xAxisLabel = selectedAttribute;

      set_xAccessor(selectedAttribute);

      xScale.domain(d3.extent(dataset, xAccessor));

      xAxisgen.scale(xScale);

      xAxis.transition().duration(1000).call(xAxisgen);

      // TODO: make the text change look smooth
      xAxis
        .transition()
        .duration(1000)
        .select(".axis-label")
        .text(selectedAttribute);

      dots
        .transition()
        .duration(1000)
        .attr("cx", (d) => xScale(xAccessor(d)));
    }

    if (axis == "y") {
      yAxisLabel = selectedAttribute;

      set_yAccessor(selectedAttribute);

      yScale.domain(d3.extent(dataset, yAccessor));

      yAxisgen.scale(yScale);

      yAxis.transition().duration(1000).call(yAxisgen);

      // TODO: make the text change look smooth
      yAxis
        .transition()
        .duration(1000)
        .select(".axis-label")
        .text(selectedAttribute);

      dots
        .transition()
        .duration(1000)
        .attr("cy", (d) => yScale(yAccessor(d)));
    }
  };
});

// hides all dots except for those belonging to genre1 or genre2
// This function is called whenever a matrix cell is clicked
function show_two_genres(genre1, genre2) {
  var dots = d3.select("#scatterplot").select("g").selectAll("circle");

  console.log(genres);

  genreExclusionSet.clear();
  genres.forEach((g) => genreExclusionSet.add(g));
  genreExclusionSet.delete(genre1);
  genreExclusionSet.delete(genre2);

  //updating dots
  dots
    .transition()
    .duration(500)
    .attr("r", (d) => {
      var genre = d.Genre_1;

      if (genreExclusionSet.has(genre)) {
        return 0;
      } else {
        return circleRadius;
      }
    });

  //updating buttons
  d3.select(".filter_buttons")
    .selectAll("input")
    .style("background-color", (d) => {
      if (genreExclusionSet.has(d)) {
        return "gray";
      } else {
        return myColor(d);
      }
    });
}
