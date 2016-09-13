var currentPage;
var suffix;
var type;
var optionsHidden = true;
var storeURL = "https://chrome.google.com/webstore/"+chrome.extension.getURL("").split("chrome-extension://")[1];

function injectButton(){
    chrome.tabs.executeScript(null, {file: "js/injected_button.js"}, function (results){
        console.log(results);
    });
}

function openOCEWindow( type ) {
    currentPage.type = type;
    chrome.windows.create({'url':chrome.extension.getURL("main.html"), type:'panel', focused:true, width:600, height:1000}, function scriptMainWindow(details){
        console.log("opened main window");
    });
};

function addClickListener(classNames, func, arg) {
    $(classNames).click(function clickFunc() { func(arg); } );
};

function showOptions(){
    if (optionsHidden === true) {
        $(".options").show();
        optionsHidden = false;
    } else {
        $(".options").hide();
        optionsHidden = true;
    };
}

function addClickListenerGroup(){
    addClickListener('.own-stream.filter', injectButton);
    addClickListener('.user-tracks', openOCEWindow, "user_tracks");
    addClickListener('.user-likes', openOCEWindow, "user_likes");
    addClickListener('.user-set.spotlight', openOCEWindow, "user_set_spotlight");
    addClickListener('.own-likes.sort', openOCEWindow, "own_likes_sort");
    addClickListener('.own-likes.backup', openOCEWindow, "own_likes_backup");
    addClickListener('.user-set.backup', openOCEWindow, "user_set_backup");
    addClickListener('.fa-navicon', showOptions);
    addClickListener('.bug-suggestion', chrome.tabs.create, {url:"mailto:orangeclouddev@outlook.com?Subject=Hey%20there"});
    addClickListener('.rate-review', chrome.tabs.create, {url:storeURL});
}

chrome.tabs.query({active: true, currentWindow: true}, function( tabs ) {
    currentPage = {url:tabs[0].url, id:tabs[0].id};
    chrome.cookies.get({url: "https://soundcloud.com", name: "u"}, function(username){
        if (username !== null){currentPage.username = username;};
        addClickListenerGroup();
        suffix = currentPage.url.split("soundcloud.com")[1];
        if (suffix.endsWith("/tracks") === true) {
            $(".user-tracks").show();
        } else if (suffix.includes("/sets/") === true) {
            $(".user-set").show();
        } else if (username !== null && suffix.endsWith(username.value+"/sets") === true) {
            $(".own-sets").show();
        } else if (suffix === "/stream") {
            $(".own-stream").show();
        } else if (username !== null && (suffix.endsWith("/you/likes") === true || suffix.endsWith("/"+username.value+"/likes")) === true) {
            $(".own-likes").show();
        } else if (suffix.endsWith("/likes") === true) {
            $(".user-likes").show();
        } else {
            $(".tooltip").show();
            console.log("invalid URL for OCE enhancements");
        };
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            if (request.type === "current"){
                sendResponse(currentPage);
                return true;
            };
        });
    });  
});

