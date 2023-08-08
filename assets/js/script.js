
var videoPlayer = $('#video-player');

var wikiDisplay = $('#wiki-display');

var searchBar = $('#searchbar');
var searchBtn = $('#search-btn');

var Get = function(url, onSuccess){
    
    console.log("Fetching data from "+url+"...");    
    fetch(url).then(function(resp) {
        return resp.json();
    }).then(function(data){
        console.log(data);
        onSuccess(data);
    });
}

Get("https://en.wikipedia.org/w/api.php?&origin=*&action=parse&page=Belgium&format=json", function(data){
    
});

