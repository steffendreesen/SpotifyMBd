var attributes_full = [
  "Valence",
  "Danceability",
  "Energy",
  //"Average Key",
  //"Average Loudness",
  //"Average Mode",
  "Speechiness",
  "Instrumentallness",
  "Liveness",
  "Acousticness",
  //"Average Tempo",
];

var myColor = (genre) => {
  switch (genre) {
    case "Drama":
      return "#8eb4be";
    case "Comedy":
      return "#ffacc9";
    case "Action":
      return "#736690";
    case "Documentary":
      return "#567442";
    case "Adventure":
      return "#ccae86";
    case "Adult":
      return "#000a3b";
    case "Short":
      return "#540036";
    case "Romance":
      return "#ac5f41";
    case "Family":
      return "#b2c065";
    case "Crime":
      return "#03efea";
    case "Animation":
      return "#82ffcc";
    case "Mystery":
      return "#0287e7";
    case "Biography":
      return "#cb4b8a";
    case "Musical":
      return "#a597ff";
    case "Sport":
      return "#723eb6";
    case "Fantasy":
      return "#e68700";
    case "Music":
      return "#ffd41f";
    case "Horror":
      return "#d10011";
    case "Thriller":
      return "#8ee200";
    case "Other":
      return "#ed2be3";
    case "All":
      return "#62c083";
  }
};

var myColorTransparent = (genre) => {
  switch (genre) {
    case "Drama":
      return "#8eb4be4d";
    case "Comedy":
      return "#ffacc94d";
    case "Action":
      return "#7366904d";
    case "Documentary":
      return "#5674424d";
    case "Adventure":
      return "#ccae864d";
    case "Adult":
      return "#000a3b4d";
    case "Short":
      return "#5400364d";
    case "Romance":
      return "#ac5f414d";
    case "Family":
      return "#b2c0654d";
    case "Crime":
      return "#03efea4d";
    case "Animation":
      return "#82ffcc4d";
    case "Mystery":
      return "#0287e74d";
    case "Biography":
      return "#cb4b8a4d";
    case "Musical":
      return "#a597ff4d";
    case "Sport":
      return "#723eb64d";
    case "Fantasy":
      return "#e687004d";
    case "Music":
      return "#ffd41f4d";
    case "Horror":
      return "#d100114d";
    case "Thriller":
      return "#8ee2004d";
    case "Other":
      return "#ed2be34d";
    case "All":
      return "#62c0834d";
  }
};

function build_radar(genre1, genre2) {
  // first I delete the canvas and make a new one
  // This solves a bug with the chart library

  d3.select("#radar").remove();
  d3.select(".radar-container").append("canvas").attr("id", "radar");

  d3.csv("Genre_average_attributes.csv", function (dataset) {
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

    function get_genre_data(genre) {
      genre_data = dataset.filter((genre_set) => genre_set.Genre == genre)[0];

      genre_data = [
        genre_data.Avg_Valence,
        genre_data.Avg_Danceability,
        genre_data.Avg_Energy,
        //genre_data.Avg_Key,
        //genre_data.Avg_Loudness,
        //genre_data.Avg_Mode,
        genre_data.Avg_Speechiness,
        genre_data.Avg_Instrumentallness,
        genre_data.Avg_Liveness,
        genre_data.Avg_Acousticness,
        //genre_data.Avg_Tempo,
      ];

      return genre_data;
    }

    var data = {
      labels: attributes_full,
      datasets: [
        {
          label: genre1,
          data: get_genre_data(genre1),
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
          data: get_genre_data(genre2),
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

    var config = {
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

    myChart = new Chart(document.getElementById("radar"), config);
  });
}

build_radar("Comedy", "Horror");
