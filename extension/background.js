function sendHttpRequest() {
    chrome.tabs.query({ "active": true, "lastFocusedWindow": true }, (tabs) => {
        console.log(tabs);

        if (tabs.length === 0) {
            return;
        }

        const url = tabs[0].url;

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
    });
}

chrome.browserAction.onClicked.addListener(sendHttpRequest);
