function sendHttpRequest(url) {
    fetch("http://127.0.0.1:53737/", {
        body: JSON.stringify({ url }),
        cache: "no-cache",
        method: "POST",
        headers: {
            "content-type": "application/json",
            "origin": "http://example.com"
        },
        mode: "cors",
    })
        .then(function(response) {
            console.log(response);
        });
}

function browserActionHandler() {
    chrome.tabs.query({ "active": true, "lastFocusedWindow": true }, (tabs) => {
        console.log(tabs);

        if (tabs.length === 0) {
            return;
        }

        const url = tabs[0].url;

        sendHttpRequest(url);
    });
}

function pageContextMenuHandler(info) {
    if (info.pageUrl) {
        sendHttpRequest(info.pageUrl);
    }
}

function imageContextMenuHandler(info) {
    if (info.srcUrl) {
        sendHttpRequest(info.srcUrl);
    }
}

function linkContextMenuHandler(info) {
    if (info.linkUrl) {
        sendHttpRequest(info.linkUrl);
    }
}

chrome.browserAction.onClicked.addListener(browserActionHandler);

chrome.contextMenus.create({
    title: "このページのURLを送る",
    contexts: ["page"],
    onclick: pageContextMenuHandler
});

chrome.contextMenus.create({
    title: "画像のURLを送る",
    contexts: ["image"],
    onclick: imageContextMenuHandler,
});

chrome.contextMenus.create({
    title: "リンク先のURLを送る",
    contexts: ["link"],
    onclick: linkContextMenuHandler,
});
