
var videoPlayer = $('#video-player');

var wikiDisplay = $('#wiki-display');

var searchBar = $('#searchbar');
var searchBtn = $('#search-btn');

var Get = function(url, onSuccess, onFail){
    
    console.log("Fetching data from "+url+"...");    
    fetch(url).then(function(response) {
        console.log("Response recieved! Status code: "+response.status);
        if(response.status === 200){
            var asJson = response.json();
            return asJson;
        }
        else{
            onFail(response, null);
        }
    }).then(function(data){
        console.log(data);
        onSuccess(data);
    });
}


var FillWikiDisplay = function(text){
    wikiDisplay.empty();
    var holder = $('<div>');
    holder.css('background-color','white');
    holder.html(text);
    wikiDisplay.append(holder);
}


var ButtonClick = function(event){
    event.preventDefault();

    var search = searchBar.val();
    Get("https://en.wikipedia.org/w/api.php?&origin=*&action=parse&page="+search+"&format=json", function(data){
        FillWikiDisplay(data.parse.text["*"]);
    },
    function(response, asJson){
        wikiDisplay.empty();
        var holder = $('<p>');
        var errorMessage = 'Error status '+response.status+'';
        if(asJson !== null && asJson !== undefined){
            errorMessage += ("Code: "+asJson.error.code + "; Info: "+asJson.error.info); 
        }
        holder.text(errorMessage);
        wikiDisplay.append(holder);
    });
}

searchBtn.on('click', ButtonClick);