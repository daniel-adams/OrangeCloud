function defUserSetBackup(){

    pageSize = 50;
    displayChunk = 10;
    visual = false;
    scrollIndex = 0;

    resolvePath = function(){
        return url;
    }

    getPath = function(playlist){
        return "/playlists/"+playlist.id+"/tracks";
    }

    sortTracks = function(){
        console.log("sorting tracks");
        now = Date.now();
        tracks.forEach(function (element) {
            time = (now-Date.parse(element.created_at))/3.6;
            rating = element.favoritings_count/(element.playback_count);
            element.sortKey = rating;
        });
        sortedTracks = tracks.sort(function(a, b) {
            return b.sortKey-a.sortKey;
        });
    }

    pageSpecific = function(){
        getTracks(resolvePath, getPath, function sortAndDisplay(){
            title = fetchedName+" | OrangeCloud Enhancer";
            backButtonText = "Go back to "+fetchedName+" on Soundcloud";
            setUpPage();
            $("#next-page").hide();
            $(".in-progress").hide();
            $("#download-button").show();
            $("#download-button").click(function dl() {
                download();
            });
        });
    }

}