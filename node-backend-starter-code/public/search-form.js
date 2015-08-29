var searchForm = {
  keyword: document.getElementById('movie-search').value,
  movieMenu: document.getElementById('movie-list'),
  query: new XMLHttpRequest(),
  url: 'http://www.omdbapi.com/?s=' + this.keyword + '&r=json',
  searchImdb: function(){
    this.query.onreadystatechange = function () {
      this.movieMenu.innerHTML = '';
      if (this.query.readyState == 4 && this.query.status == 200) {
        var response = JSON.parse(this.query.responseText);
        var searchResults = responseSearch;
        console.log(response);
        console.log(searchResults.length);
        var output = '';
        for (var i = 0; i < searchResults.length; i++) {
          console.log(searchResults[i]);
          output += '<div class="movie-title">' + searchResults[i].Title + '</div>';
          console.log(output);
        }
        this.movieMenu.innerHTML = output;
        makeClickableList();
      }
    };
    this.query.open('GET', this.url, true);
    this.query.send();
  }
};
