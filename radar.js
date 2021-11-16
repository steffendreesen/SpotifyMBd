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
      case "Western":
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
  var myColorTransparent = (genre) => {
    switch (genre) {
      case "Drama":
        return "#1Ad148a4";
        break;
      case "Comedy":
        return "#1A6dd3c7";
        break;
      case "Action":
        return "#1A5d3ac1";
        break;
      case "Documentary":
        return "#1Acbd465";
        break;
      case "Adventure":
        return "#1Abe4dd5";
        break;
      case "Adult":
        return "#1A68d98d";
        break;
      case "Short":
        return "#1A482871";
        break;
      case "Romance":
        return "#1Adb4885";
        break;
      case "Family":
        return "#1A7674d5";
        break;
      case "History":
        return "#1Ad6a240";
        break;
      case "Crime":
        return "#1A5d78aa";
        break;
      case "Animation":
        return "#1Adc4528";
        break;
      case "Mystery":
        return "#1A78d747";
        break;
      case "Biography":
        return "#1Acf4560";
        break;
      case "News":
        return "#1A54883e";
        break;
      case "Sci-Fi":
        return "#1Acf95ce";
        break;
      case "Musical":
        return "#1A344326";
        break;
      case "Sport":
        return "#1A98bada";
        break;
      case "Fantasy":
        return "#1Ac06738";
        break;
      case "Music":
        return "#1A392e44";
        break;
      case "Game-Show":
        return "#1A98322e";
        break;
      case "Talk-Show":
        return "#1A3b5b6e";
        break;
      case "Reality-TV":
        return "#1A8c406e";
        break;
      case "Horror":
        return "#1A8a773d";
        break;
      case "Thriller":
        return "#1A57827a";
        break;
      case "Western":
        return "#1A6a322a";
        break;
      case "War":
        return "#1Acc8f8d";
        break;
    }
    /*
     In case we need more: 
        #33896d74
    */
  };

  const data = {
    labels: attributes_full,
    datasets: [
      {
        label: genre1,
        data: genre1_data_array,
        fill: true,
        backgroundColor: myColorTransparent(genre1),
        borderColor: myColor(genre1),
        pointBackgroundColor: myColor(genre1),
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: myColor(genre1),
      },
      {
        label: genre2,
        data: genre2_data_array,
        fill: true,
        backgroundColor: myColorTransparent(genre2),
        borderColor: myColor(genre2),
        pointBackgroundColor: myColor(genre2),
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: myColor(genre2),
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
