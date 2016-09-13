var pageSize;
var displayChunk;
var scrollIndex = 0;
var title;
var backButtonText;
var resolvePath;

var url;
var ownUsername;
var fetchedName;
var fetchedId;
var userSubs;
var requestType;
var tracks = [];
var sortedTracks;

function rateTracks(){
    now = Date.now();
    tracks.forEach(function (element) {
        days = (now-Date.parse(element.created_at))/8.64e+7;
        rating = Math.pow(element.favoritings_count,2)/(days*element.playback_count);
        element.sortKey = rating;
    });
}

function setUpPage() {
    document.title = title;
    $("#back-button").attr("href", url);
    $("#back-button").text(backButtonText);
    $("#next-page").click(function () {
        if (loading === false) {display(displayChunk, visual);}
    });
}

function download(){
    $("#download-button").hide();
    var dateNow = new Date();
    var filename = fetchedName+"_OrangeCloud_backup_"+dateNow.toISOString();
    var download = JSON.stringify(tracks, null, '\t');
    var blob = new Blob([download], {type: "text/plain;charset=utf-8"});
    saveAs(blob, filename+".json");
    $(".downloaded").show();
}

function getTracks(resolvePath, getPath, after){
    console.log("getting tracks");
    var outerPath = resolvePath();
    SC.resolve(outerPath).then(function SCResolveThen(obj){
        fetchedName = obj.title || obj.username;
        if (obj.followers_count !== null && obj.followers_count !== undefined) {userSubs = obj.followers_count;};
        var innerPath = getPath(obj);
        SC.get(innerPath, {limit: pageSize, linked_partitioning: 1}).then(function SCGetThen(receivedTracks) {    
            tracks = tracks.concat(receivedTracks.collection);
            if (receivedTracks.next_href !== undefined){
                console.log("more tracks to come... (currently fetched: "+tracks.length+")");
                $.get(receivedTracks.next_href, SCGetThen);
            } else {
                console.log("got all tracks (fetched: "+tracks.length+")");
                if (tracks.length == 0){
                    $(".in-progress").hide();
                    $(".nothing").show();
                    return;
                }
                after();
            };
        }).catch(function SCGetCatch(error){
            $(".in-progress").hide();
            $(".failed").show();
            console.log(error);
        });
    }).catch(function SCResolveCatch(error){
        $(".in-progress").hide();
        $(".failed").show();
        console.log(error);
    });
}

function display(num, visual){
    console.log("displaying");
    blockMouse();
    sortedLen = sortedTracks.length;
    var oEmbeds = [];
    for (i = 0; i < num && scrollIndex < sortedLen; i++, scrollIndex++) {
        oEmbeds[i] = SC.oEmbed(sortedTracks[scrollIndex].permalink_url, { show_artwork:false, buying:false, show_bpm:true, show_playcount:true, maxheight:166, auto_play:false });
    };
    if (scrollIndex>=sortedLen){
        $("#next-page").hide();
        //$("div.results-list").append();
        $(".end-of-tracks").show();
        window.setTimeout(function hideNotice(){$(".end-of-tracks").hide();}, 7000);
    };

    oEmbeds.forEach( function eachThen (element){
        element.then( function modifyAppend(){
            try {
                element._result.html = element._result.html.replace("<iframe", '<iframe class="sc-iframe-embed"');
                if (visual === false) {element._result.html = element._result.html.replace("visual=true", "visual=false");}
                $("div.results-list").append(element._result.html);
            } catch (err) {
                console.log(err);
            }
        }).catch( function SCoEmbedCatch(error){
            console.log(error);
        });
    });
    unblockMouse();
}

function blockMouse(){
    loading = true;
    $("div.nav-bar").css("z-index","-1");
    $(".loading").show();
}

function unblockMouse(){
    $(".loading").hide();
    $("div.nav-bar").css("z-index","1");
    loading = false;
}

function initializePage(after) {
    console.log("initializing page");
    blockMouse();
    SC.initialize({client_id: "f234ffc531d6022ca002b3c40bea69ed"});
    chrome.runtime.sendMessage({type:"current"}, function(response) {
        if (response !==null && response !==undefined){
            console.log("current page and user request was sent and serviced. received: ");
            console.log(response);
            url = response.url;
            ownUsername = response.username.value;
            requestType = response.type;
        } else {
            console.log("there was a problem with the currentPage request: "+chrome.runtime.lastError);
            console.log(response);
            $(".in-progress").hide();
            $(".failed").show();
        };
        if (requestType === "own_likes_sort"){
            defOwnLikesSort();
            pageSpecific();
        } else if (requestType === "user_tracks"){
            defUserTracks();
            pageSpecific();
        } else if (requestType === "user_likes"){
            defUserLikes();
            pageSpecific();
        } else if (requestType === "user_set_spotlight"){
            defUserSetSpotlight();
            pageSpecific();
        } else if (requestType === "own_likes_backup"){
            defOwnLikesBackup();
            pageSpecific();
        } else if (requestType === "user_set_backup"){
            defUserSetBackup();
            pageSpecific();
        }
    });
}

initializePage();