function defUserLikes(){

    pageSize = 50;
    displayChunk = 20;
    visual = true;
    scrollIndex = 0;

    resolvePath = function(){
        return url.split("/likes")[0];
    }

    getPath = function(user){
        return "/users/"+user.id+"/favorites";
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
            title = fetchedName+"'s Favorites | OrangeCloud Enhancer";
            backButtonText = "Go back to "+fetchedName+"'s Favorites on Soundcloud";
            setUpPage();
            sortTracks();
            display(displayChunk, visual);
            unblockMouse();
        });
    }

}