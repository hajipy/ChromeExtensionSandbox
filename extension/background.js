function sendNativeMessage() {
    const port = chrome.runtime.connectNative("net.hajipy.sandbox");

    port.onMessage.addListener((message) => {
        console.log("receive " + JSON.stringify(message, null, 0));
    });

    port.onDisconnect.addListener(() => {
        console.log("disconnected");
    });

    port.postMessage({ text: "hello from chrome extension" });
}

chrome.browserAction.onClicked.addListener(sendNativeMessage);
