

window.onload = function () {
  document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    searchForm.searchImdb();
    document.getElementById('search-form').reset();
  });
};

function makeClickableList() {
  var movieList = document.getElementsByClassName('movie-title');
  for (var j = 0; j < movieList.length; j++){
    movieList[j].addEventListener('click', displayMovieDetails);
  }
}

function displayMovieDetails() {
  var self = this;
  self.setAttribute('class', 'selected');
  var title = self.innerHTML;
  var url = 'http://www.omdbapi.com/?t=' + title + '&y=&plot&r=json';
  var searchCall = new XMLHttpRequest();
  searchCall.onreadystatechange = function () {
    if (searchCall.readyState == 4 && searchCall.status == 200) {
      var response = JSON.parse(searchCall.responseText);
      console.log(response);
      var movieDetails = document.createElement('div');
      movieDetails.setAttribute('class', 'movie-details');
      movieDetails.innerHTML =
        '<ul><li>Year: ' + response.Year + '</li><li>Actors: ' + response.Actors + '</li><li>Director: ' + response.Director + '</li><li>Genre: ' + response.Genre + '</li><li>Awards: ' + response.Awards + '</li><li>Plot: ' + response.Plot + '</li><li>Rated: ' + response.Rated + '</li><li>Runtime: ' + response.Runtime + '</li></ul><img src= ' + response.Poster + '><button class="fave-button">Add to Favorites</button>';
      self.appendChild(movieDetails);
      self.removeEventListener('click');
    }
  };
  searchCall.open('GET', url, true);
  searchCall.send();
}




//Favorites
//Deploy
//Make it an object
