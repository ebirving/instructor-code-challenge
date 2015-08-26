function searchImdb() {
  var keyword = document.getElementById('movie-search').value;
  console.log(keyword);
  var url = 'http://www.omdbapi.com/?s=' + keyword + '&r=json';
  var searchCall = new XMLHttpRequest();
  searchCall.onreadystatechange = function () {
    if (searchCall.readyState == 4 && searchCall.status == 200) {
      var response = JSON.parse(searchCall.responseText);
      console.log(response);
      var movieOptions = response.Search;
      console.log(movieOptions.length);
      var output = '';
      var i;
      for (i = 0; i < movieOptions.length; i++) {
        console.log(movieOptions[i]);
        output += '<div class="movie-title">' + movieOptions[i].Title + '</div>';
      }
      document.getElementById('movie-list').innerHTML = output;
    }
  };

  searchCall.open('GET', url, true);
  searchCall.send();
}

function getMovieDetails(movie) {
  movie.setAttribute('class', 'selected');
  var title = movie.innerHTML;
  console.log(title);
  var url = 'http://www.omdbapi.com/?t=' + title + '&y=&plot=full&r=json';
  var searchCall = new XMLHttpRequest();
  searchCall.onreadystatechange = function () {
    if (searchCall.readyState == 4 && searchCall.status == 200) {
      var response = JSON.parse(searchCall.responseText);
      console.log(response);
      showMovieDetails(response, movie);
    }
  };

  searchCall.open('GET', url, true);
  searchCall.send();
}

function showMovieDetails(response, location) {
  var movieDetails = document.createElement('div');
  movieDetails.setAttribute('class', 'movie-details');
  movieDetails.innerHTML =
    '<ul><li>Year: ' + response.Year + '</li><li>Actors: ' + response.Actors + '</li><li>Director: ' + response.Director + '</li><li>Genre: ' + response.Genre + '</li><li>Awards: ' + response.Awards + '</li><li>Plot: ' + response.Plot + '</li><li>Rated: ' + response.Rated + '</li><li>Runtime: ' + response.Runtime + '</li></ul><img src= ' + response.Poster + '><button class="faveButton">Add to Favorites</button>';
  location.appendChild(movieDetails);
}

// Search form:
var searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  searchImdb();
  searchForm.reset();
});

//Movie list:
document.getElementById('movie-list').addEventListener('click', function(event) {
  console.log(event.target);
  getMovieDetails(event.target);
});
//Fix click listener!!!!
//Favorites
//Deploy
