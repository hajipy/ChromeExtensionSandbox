import { ipcRenderer } from "electron";

import Vue from "vue";

const app = new Vue({
    el: "#app",
    data: {
        message: "hello from vue"
    }
});

ipcRenderer.on("add-url", (event: any, payload: { url: string }) => {
    console.log(`add-url: ${JSON.stringify(payload, null, 4)}`);
});
