d3.csv("Genre_distances_no_tempo.csv", function (dataset) {

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
        left: 100,
        },
        width: 2000,
        height: 1000,
    };


    var svg = d3.select("#matrix")
                .attr("width", dimensions.width)
                .attr("height", dimensions.height)

    svg
        .append("input")
        .attr("type", "button")

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
                    .domain([0, 20])
                    .range(["white", "#4713a8"]);


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

    // function is called when a rect is hovered over
    var mouseover = function() {
        d3.select(this)
            .attr("stroke-width", 4)
    }

    var mouseout = function() {
        d3.select(this)
            .attr("stroke-width", 1)
    }

    var clicked = function() {
        var button = d3.select(this)
        var id = button.attr("id")
        
        var genre1 = id.split("_")[0]
        var genre2 = id.split("_")[1]
        var genre1_row = id.split("_")[2]

        var status = button.attr("class")
        var distance = dataset[genre1_row][genre2]


        if(status == "unselectedButton"){

            button.classed("unselectedButton", false)
            button.classed("selectedButton", true)
            button.style("fill", "gold")

        } else if(status == "selectedButton"){

            button.classed("selectedButton", false)
            button.classed("unselectedButton", true)
            button.style("fill", myColor(distance))

        }
    }


    // loop through all genres
    for(var i = 0; i < genres.length; i++){

        // current genre
        // dataset[i] is a row of distances
        var genre = dataset[i][""]

        // loop through all distances of the current genre
        for(var j = 0; j < genres.length; j++){

            var other_genre = dataset[j][""]

            var distance = dataset[i][other_genre]

            // store the genres being compared in the rect id
            // also keep track of the i, so we can retrieve the row and get the distance back
            var id = genre + '_' + other_genre + '_' + i
            svg
                .append("rect")
                .attr("id", id)
                .classed("unselectedButton", true)
                .attr("x", xScale(genre))
                .attr("y", yScale(other_genre))
                .attr("rx", 4)
                .attr("ry", 4)
                .attr("width", xScale.bandwidth())
                .attr("height", yScale.bandwidth())
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .style("fill", myColor(distance))
                .on("mouseover", mouseover)
                .on("mouseout", mouseout)
                .on("click", clicked)

        }
    }

});
