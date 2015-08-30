window.onload = function () {
  //On page load, display all saved favorites...
  favesList = document.getElementById('favorites-list');
  displayFavorites();
  //...and activate the event listener to...
  searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    //..trigger a search...
    searchImdb();
    //...and then clear the submitted text from the search box
    searchForm.reset();
  });
};

//GET saved favorites from the data.json file via server.js...
function displayFavorites() {
  var ajaxCall = new XMLHttpRequest();
  var url = 'https://cine-spa.herokuapp.com/favorites';
  ajaxCall.onreadystatechange = function() {
    if (ajaxCall.readyState==4 && ajaxCall.status==200){
      var json = ajaxCall.responseText;
      var response = JSON.parse(json);
      for (l = 0; l < response.length; l++){
        var newFave = document.createElement('div');
        newFave.innerHTML = response[l].name;
        favesList.appendChild(newFave);
      }
    }
  };
  ajaxCall.open("GET", url ,true);
  ajaxCall.send();
}

//GET search results from Ombapi...
function searchImdb() {
  var keyword = document.getElementById('movie-search').value;
  console.log(keyword);
  var movieMenu = document.getElementById('movie-list');
  var ajaxCall = new XMLHttpRequest();
  var url = 'https://www.omdbapi.com/?s=' + keyword + '&r=json';
  ajaxCall.onreadystatechange = function() {
    var json = ajaxCall.responseText;
    var response = JSON.parse(json);
    var searchResults = response.Search;
    movieMenu.innerHTML = '';
    if (ajaxCall.readyState == 4 && ajaxCall.status == 200) {
      console.log(response);
      //...and create a div with an event listener for each title returned...
      for (var i = 0; i < searchResults.length; i++) {
          var movieInfo = document.createElement('div');
          movieInfo.setAttribute('class', 'movie-info');
          var movieTitle = document.createElement('div');
          movieTitle.setAttribute('class', 'movie-title');
          movieTitle.innerHTML = searchResults[i].Title;
          movieTitle.addEventListener('click', displayMovieDetails);
          movieInfo.appendChild(movieTitle);
          movieMenu.appendChild(movieInfo);
        }
    }
  };
  ajaxCall.open('GET', url, true);
  ajaxCall.send();
}

//When clicked, GET more details about the selected title...
function displayMovieDetails() {
  var self = this;
  self.parentElement.setAttribute('class', 'selected');
  var title = self.innerHTML;
  var url = 'https://www.omdbapi.com/?t=' + title + '&y=&plot&r=json';
  var ajaxCall = new XMLHttpRequest();
  ajaxCall.onreadystatechange = function () {
    if (ajaxCall.readyState == 4 && ajaxCall.status == 200) {
      //...display them...
      var json = ajaxCall.responseText;
      var response = JSON.parse(json);
      var movieDetails = document.createElement('div');
      movieDetails.setAttribute('class', 'movie-details');
      movieDetails.innerHTML =
        '<ul><li>Year: ' + response.Year + '</li><li>Actors: ' + response.Actors + '</li><li>Director: ' + response.Director + '</li><li>Genre: ' + response.Genre + '</li><li>Awards: ' + response.Awards + '</li><li>Plot: ' + response.Plot + '</li><li>Rated: ' + response.Rated + '</li><li>Runtime: ' + response.Runtime +
        '</li><li>Type: ' + response.Type + '</li> </ul><img src= ' + response.Poster + '>';
      self.parentElement.appendChild(movieDetails);
      //...and create an "Add to Favorites" button with: 1) a hidden value formatted for POSTing to favorites and, 2) an event listener to to trigger that POST request ...
      var faveButton = document.createElement('form');
      faveButton.setAttribute('class', 'fave-button');
      faveButton.innerHTML =
        '<input type="hidden" value=' + response.imdbID + ' name='+ '"' + response.Title + '"' + '><input type="submit" value="Add to Favorites">';
      self.parentElement.appendChild(faveButton);
      faveButton.addEventListener('submit', addtoFaves);
      //Removing the event listener on the title prevents stray server requests.
      self.removeEventListener('click', displayMovieDetails);
    }
  };
  ajaxCall.open('GET', url, true);
  ajaxCall.send();
}

//POST the selected movie to favorites and add its title to the Favorites list
function addtoFaves() {
  var self = this;
  event.preventDefault();
  var ajaxCall = new XMLHttpRequest();
  var url = 'https://cine-spa.herokuapp.com/favorites';
  ajaxCall.onreadystatechange = function() {
    if (ajaxCall.readyState==4 && ajaxCall.status==200){
      displayFavorites();
    }
  };
  ajaxCall.open('POST', url, true);
  ajaxCall.setRequestHeader('Content-Type', 'application/json');
  ajaxCall.send('{"oid":"'+ self.firstChild.value +'","name":"' + self.firstChild.name +'"}');
}
