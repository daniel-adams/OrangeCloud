function defOwnLikesSort(){

    pageSize = 200;
    displayChunk = 10;
    visual = false;
    scrollIndex = 0;

    resolvePath = function(){
        return "http://soundcloud.com/"+ownUsername;
    }

    getPath = function(user){
        return "/users/"+user.id+"/favorites";
    }

    sortTracks = function(){
        console.log("sorting tracks");
        tracks.forEach(function (element) {
            element.sortKey = Date.parse(element.created_at);
        });
        sortedTracks = tracks.sort(function(a, b) {
            return a.sortKey-b.sortKey;
        });
    }

    pageSpecific = function(){
        getTracks(resolvePath, getPath, function sortAndDisplay(){
            title = "My Likes | OrangeCloud Enhancer";
            backButtonText = "Go back to My Likes on Soundcloud";
            setUpPage();
            sortTracks();
            display(displayChunk, visual);
            unblockMouse();
        });
    }

}