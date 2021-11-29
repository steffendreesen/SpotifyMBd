const circleRadius = 3;
const minTracks = 2;

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

  var genres = [
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
      top: 30,
      bottom: 100,
      right: 80,
      left: 60,
    },
    width: 600,
    height: 600,
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

  //genres to exclude
  //NOTE: discovered that Horror and Western are both light purple
  var genreExclusionSet = new Set();

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
        return "#d148a4";
        break;
      case "Comedy":
        return "#6dd3c7";
        break;
      case "Action":
        return "#5d3ac1";
        break;
      case "Documentary":
        return "#cbd465";
        break;
      case "Adventure":
        return "#be4dd5";
        break;
      case "Adult":
        return "#68d98d";
        break;
      case "Short":
        return "#482871";
        break;
      case "Romance":
        return "#db4885";
        break;
      case "Family":
        return "#7674d5";
        break;
      case "History":
        return "#d6a240";
        break;
      case "Crime":
        return "#5d78aa";
        break;
      case "Animation":
        return "#dc4528";
        break;
      case "Mystery":
        return "#78d747";
        break;
      case "Biography":
        return "#cf4560";
        break;
      case "News":
        return "#54883e";
        break;
      case "Sci-Fi":
        return "#cf95ce";
        break;
      case "Musical":
        return "#344326";
        break;
      case "Sport":
        return "#98bada";
        break;
      case "Fantasy":
        return "#c06738";
        break;
      case "Music":
        return "#392e44";
        break;
      case "Game-Show":
        return "#98322e";
        break;
      case "Talk-Show":
        return "#3b5b6e";
        break;
      case "Reality-TV":
        return "#8c406e";
        break;
      case "Horror":
        return "#8a773d";
        break;
      case "Thriller":
        return "#57827a";
        break;
      case "Other":
        return "#6a322a";
        break;
      case "War":
        return "#cc8f8d";
        break;
    }
    /*
     In case we need more: 
        #896d74
    */
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

    .attr("id", function (d) {
      return d;
    })

    .attr("value", function (d) {
      return d;
    })

    // initialize all buttons as turned on
    .classed("activatedGenre", true);

  var title = svg
    .append("text")
    .attr("id", "title")
    .attr("x", dimensions.width / 2)
    .attr("y", 0 - dimensions.margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "32px")
    .style("text-decoration", "underline")
    .text("Genre 1 vs Genre 2 Scatterplot");

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
    }); // corresponding value returned by the button

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
    }); // corresponding value returned by the button

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
      var current_status = button.attr("class");

      // A bug might w/ removing non-existing value might occur in the future
      // I am assuming that the exclusion set is empty at the start, and all boxes are checked

      // turing button off
      if (current_status == "activatedGenre") {
        button.classed("activatedGenre", false);
        button.classed("deactivatedGenre", true);

        genreExclusionSet.add(genre);

        // TODO: Use CSS to create default styles for activated and deactivated.
        // The size, margins, display, etc will overlap, but the background color and text color should be different
        button.style("background-color", "gray");

        // turing button on
      } else if (current_status == "deactivatedGenre") {
        button.classed("deactivatedGenre", false);
        button.classed("activatedGenre", true);

        genreExclusionSet.delete(genre);

        button.style("background-color", myColor(genre));
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

      xAxis.transition().duration(5000).call(xAxisgen);

      // TODO: make the text change look smooth
      xAxis
        .transition()
        .duration(1000)
        .select(".axis-label")
        .text(selectedAttribute);

      dots
        .transition()
        .duration(5000)
        .attr("cx", (d) => xScale(xAccessor(d)));
    }

    if (axis == "y") {
      yAxisLabel = selectedAttribute;

      set_yAccessor(selectedAttribute);

      yScale.domain(d3.extent(dataset, yAccessor));

      yAxisgen.scale(yScale);

      yAxis.transition().duration(5000).call(yAxisgen);

      // TODO: make the text change look smooth
      yAxis
        .transition()
        .duration(1000)
        .select(".axis-label")
        .text(selectedAttribute);

      dots
        .transition()
        .duration(5000)
        .attr("cy", (d) => yScale(yAccessor(d)));
    }
  };
});

// hides all dots except for those belonging to genre1 or genre2
// This function is called whenever a matrix cell is clicked
function show_two_genres(genre1, genre2) {
  var dots = d3.select("#scatterplot").select("g").selectAll("circle");

  dots
    .transition()
    .duration(500)
    .attr("r", (d) => {
      var genre = d.Genre_1;

      if (!(genre == genre1 || genre == genre2)) {
        return 0;
      } else {
        return circleRadius;
      }
    });
}
