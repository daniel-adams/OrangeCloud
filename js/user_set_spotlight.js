function defUserSetSpotlight(){

    pageSize = 50;
    displayChunk = 10;
    visual = true;
    scrollIndex = 0;

    resolvePath = function(){
        return url;
    }

    getPath = function(playlist){
        return "/playlists/"+playlist.id+"/tracks";
    }

    sortTracks = function(){
        console.log("sorting tracks");
        rateTracks();
        sortedTracks = tracks.sort(function(a, b) {
            return b.sortKey-a.sortKey;
        });
    }

    pageSpecific = function(){
        getTracks(resolvePath, getPath, function sortAndDisplay(){
            title = fetchedName+" | OrangeCloud Enhancer";
            backButtonText = "Go back to "+fetchedName+" on Soundcloud";
            setUpPage();
            sortTracks();
            display(displayChunk, visual);
            unblockMouse();
        });
    }

}