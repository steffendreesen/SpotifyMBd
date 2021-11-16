d3.csv("Genre_average_attributes.csv", function (dataset) {
  var attributes_full = [
    "Average Valence",
    "Average Danceability",
    "Average Energy",
    //"Average Key",
    //"Average Loudness",
    //"Average Mode",
    "Average Speechiness",
    "Average Acousticness",
    "Average Instrumentallness",
    "Average Liveness",
    //"Average Tempo",
  ];

  // converting all values to numbers (d3.csv converts to String, need them to be numeric)
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

  var genre1 = "Comedy";
  var genre2 = "Horror";

  genre1_data = dataset.filter((genre_set) => genre_set.Genre == genre1)[0];
  genre2_data = dataset.filter((genre_set) => genre_set.Genre == genre2)[0];

  genre1_data_array = [
    genre1_data.Avg_Valence,
    genre1_data.Avg_Danceability,
    genre1_data.Avg_Energy,
    //genre1_data.Avg_Key,
    //genre1_data.Avg_Loudness,
    //genre1_data.Avg_Mode,
    genre1_data.Avg_Speechiness,
    genre1_data.Avg_Acousticness,
    genre1_data.Avg_Instrumentallness,
    genre1_data.Avg_Liveness,
    //genre1_data.Avg_Tempo,
  ];
  genre2_data_array = [
    genre2_data.Avg_Valence,
    genre2_data.Avg_Danceability,
    genre2_data.Avg_Energy,
    //genre2_data.Avg_Key,
    //genre2_data.Avg_Loudness,
    //genre2_data.Avg_Mode,
    genre2_data.Avg_Speechiness,
    genre2_data.Avg_Acousticness,
    genre2_data.Avg_Instrumentallness,
    genre2_data.Avg_Liveness,
    //genre2_data.Avg_Tempo,
  ];

  const data = {
    labels: attributes_full,
    datasets: [
      {
        label: genre1,
        data: genre1_data_array,
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: genre2,
        data: genre2_data_array,
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };

  const config = {
    type: "radar",
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 3,
        },
      },
    },
  };

  const myChart = new Chart(document.getElementById("radar"), config);
});
