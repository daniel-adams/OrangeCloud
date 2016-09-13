function defOwnLikesBackup(){

    pageSize = 200;
    displayChunk = 10;
    visual = false;
    scrollIndex = 0;

    title = "My Likes | OrangeCloud Enhancer";
    backButtonText = "Go back to My Likes on Soundcloud";

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