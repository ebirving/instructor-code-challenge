function searchImdb() {
  var keyword = document.getElementById('movie-search').value;
  console.log(keyword);
  var movieMenu = document.getElementById('movie-list');
  var searchCall = new XMLHttpRequest();
  var url = 'http://www.omdbapi.com/?s=' + keyword + '&r=json';
  searchCall.onreadystatechange = function() {
    var response = JSON.parse(searchCall.responseText);
    var searchResults = response.Search;
    movieMenu.innerHTML = '';
    if (searchCall.readyState == 4 && searchCall.status == 200) {
    console.log(response);
    for (var i = 0; i < searchResults.length; i++) {
        console.log(searchResults[i]);
        var movieInfo = document.createElement('div');
        movieInfo.setAttribute('class', 'movie-info');
        var movieTitle = document.createElement('div');
        movieTitle.setAttribute('class', 'movie-title');
        movieTitle.innerHTML = searchResults[i].Title;
        movieInfo.appendChild(movieTitle);
        movieMenu.appendChild(movieInfo);
      }
      makeClickableList();
    }
  };
  searchCall.open('GET', url, true);
  searchCall.send();
}

function makeClickableList() {
  var movieList = document.getElementsByClassName('movie-title');
  for (var j = 0; j < movieList.length; j++){
    movieList[j].addEventListener('click', displayMovieDetails);
  }
}

function displayMovieDetails() {
  var self = this;
  self.parentElement.setAttribute('class', 'selected');
  var title = self.innerHTML;
  var url = 'http://www.omdbapi.com/?t=' + title + '&y=&plot&r=json';
  var searchCall = new XMLHttpRequest();
  searchCall.onreadystatechange = function () {
    if (searchCall.readyState == 4 && searchCall.status == 200) {
      var response = JSON.parse(searchCall.responseText);
      var movieDetails = document.createElement('div');
      movieDetails.setAttribute('class', 'movie-details');
      movieDetails.innerHTML =
        '<ul><li>Year: ' + response.Year + '</li><li>Actors: ' + response.Actors + '</li><li>Director: ' + response.Director + '</li><li>Genre: ' + response.Genre + '</li><li>Awards: ' + response.Awards + '</li><li>Plot: ' + response.Plot + '</li><li>Rated: ' + response.Rated + '</li><li>Runtime: ' + response.Runtime +
        '</li><li>Type: ' + response.Type + '</li> </ul><img src= ' + response.Poster + '>';
      self.parentElement.appendChild(movieDetails);
      var faveButton = document.createElement('form');
      faveButton.setAttribute('class', 'fave-button');
      faveButton.innerHTML =
        '<input type="hidden" value=' + response.imdbID + ' name='+ '"' + response.Title + '"' + '><input type="submit" value="Add to Favorites">';
      self.parentElement.appendChild(faveButton);
      self.removeEventListener('click', displayMovieDetails);
      console.log(response);
      console.log(faveButton.firstChild.value);
      makeClickableFave();
    }
  };
  searchCall.open('GET', url, true);
  searchCall.send();
}

function makeClickableFave() {
  var faveButtons = document.getElementsByClassName('fave-button');
  for (var k = 0; k < faveButtons.length; k++){
    faveButtons[k].addEventListener('submit', addtoFaves);
  }
}

function addtoFaves() {
  var self = this;
  event.preventDefault();
  var searchCall = new XMLHttpRequest();
  var url = 'http://localhost:3000/favorites';
  searchCall.open('POST', url, true);
  searchCall.setRequestHeader('Content-Type', 'application/json');
  searchCall.send('{"oid":"'+ self.firstChild.value +'","name":"' + self.firstChild.name +'"}');
}

var searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  searchImdb();
  searchForm.reset();
});
