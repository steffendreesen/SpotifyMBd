d3.csv("Genre_distances.csv", function (dataset) {

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
        "History",
        "Crime",
        "Animation",
        "Mystery",
        "Biography",
        "News",
        "Sci-Fi",
        "Musical",
        "Sport",
        "Fantasy",
        "Music",
        "Game-Show",
        "Reality-TV",
        "Horror",
        "Thriller",
        "Western",
        "War"
    ];
    
    var dimensions = {
        margin: {
        top: 30,
        bottom: 100,
        right: 80,
        left: 30,
        },
        width: 1000,
        height: 1000,
    };


    var svg = d3.select("#matrix")
                .attr("width", dimensions.width)
                .attr("height", dimensions.height)
                .append("g")
                    .attr(
                    "transform",
                    "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")"
                    );

    var xScale = d3.scaleBand()
                    .domain(genres)
                    .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

    var yScale = d3.scaleBand()
                    .domain(genres)
                    .range([dimensions.height - dimensions.margin.bottom,
                        dimensions.margin.top])
        
    var xAxisgen = d3.axisBottom().scale(xScale);

    var yAxisgen = d3.axisLeft().scale(yScale);

    var xAxis = svg
        .append("g")
        .call(xAxisgen)
        .style(
        "transform",
        `translateY(${dimensions.height - dimensions.margin.bottom}px)`
        );

    var yAxis = svg
        .append("g")
        .call(yAxisgen)
        .style("transform", `translateX(${dimensions.margin.left}px)`);
                 

   var myColor = d3.scaleLinear()
                    .domain([0, 100])
                    .range(["green", "#4713a8"]);


    /*
    svg.selectAll()
        .data(dataset)
        .enter()
        .append('rect')
        .attr("x", function(d) { return xScale(d[""]) })
        .attr("y", function(d) { return yScale(d[""]) })
        .attr("width", xScale.bandwidth() )
        .attr("height", yScale.bandwidth() )
        .style("fill", function(d) { return myColor(700)} )
    */


    console.log(dataset.length)
    console.log(genres.length)
    // loop through all genres
    for(var i = 0; i < dataset.length; i++){

        // current genre
        var genre = dataset[i][""]

        // loop through all distances of the current genre
        for(var j = 0; j < dataset.length; j++){

            var other_genre = dataset[j][""]

            var distance = dataset[i][other_genre]

            svg.selectAll("g")
                .append("rect")
                .attr("x", xScale(genre))
                .attr("y", yScale(other_genre))
                .attr("width", xScale.bandwidth() - 4)
                .attr("height", yScale.bandwidth() - 4)
                .style("fill", myColor(distance))

        }
    }
})