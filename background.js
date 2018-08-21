let counter = 0;

function setBadge() {
    chrome.browserAction.setBadgeText({ text: counter.toString() });
}

function incrementBadge() {
    counter++;

    setBadge();
}

setBadge();

chrome.browserAction.onClicked.addListener(incrementBadge);
