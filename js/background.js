chrome.runtime.onInstalled.addListener(function bckgrndRemoveRules() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function bckgrndAddRules() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals:"soundcloud.com", schemes:["https"]}
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction()
        ]
      }
    ]);
  });
});