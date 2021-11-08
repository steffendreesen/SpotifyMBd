d3.csv("Genre_average_attributes.csv", function (dataset) {

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

     console.log(dataset)

    var dimensions = {
        margin: {
        top: 30,
        bottom: 100,
        right: 80,
        left: 60,
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

   
})