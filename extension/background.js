function sendHttpRequest() {
    fetch("http://127.0.0.1:53737/", {
        body: JSON.stringify({ url: "http://example.com" }),
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

chrome.browserAction.onClicked.addListener(sendHttpRequest);
