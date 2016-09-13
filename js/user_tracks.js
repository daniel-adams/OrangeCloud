function defUserTracks(){

    pageSize = 50;
    displayChunk = 10;
    visual = true;
    scrollIndex = 0;

    resolvePath = function(){
        return url.split("/tracks")[0];
    }

    getPath = function(user){
        return "/users/"+user.id+"/tracks";
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
            title = fetchedName+"'s Tracks | OrangeCloud Enhancer";
            backButtonText = "Go back to "+fetchedName+"'s Tracks on Soundcloud";
            setUpPage();
            sortTracks();
            display(displayChunk, visual);
            unblockMouse();
        });
    }

}