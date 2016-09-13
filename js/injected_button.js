var CSSURL = chrome.extension.getURL("css/injected_button.css");
var injectedCSSLink = '<link class="oce injected-button" rel="stylesheet" type="text/css" href="'+CSSURL+'">';
var FAURL = chrome.extension.getURL("css/font-awesome.min.css");
var injectedFALink = '<link class="oce injected-button" rel="stylesheet" type="text/css" href="'+FAURL+'">';
var injectedHTML = '<div class="oce injected-button filter-unfilter-reposts"><button class="oce filter-unfilter-button" title="Filter/Unfilter Stream"><i class="oce fa fa-filter fa-3x" aria-hidden="true"></i></button><button class="oce hide-button" title="Hide this button"><i class="oce fa fa-times-circle fa-2x" aria-hidden="true"></i></button></div>';
var hidden = false;

function filter(){
    $(".soundList__item").find(".soundContext__repost").parents(".soundList__item").find(".sound__body").hide();
    hidden = true;
}

function unfilter(){
    $(".sound__body").show();
    hidden = false;
}

$(".oce.injected-button").remove();
$("head").append(injectedCSSLink);
$("head").append(injectedFALink);
$("div#app").append(injectedHTML);
$(".filter-unfilter-button").on("click", function filterUnfilter(){
    if (hidden === false){filter();} else {unfilter();};
});
$(".hide-button").on("click", function filterUnfilter(){
    $(".oce.injected-button").remove();
});
var status = "injected";