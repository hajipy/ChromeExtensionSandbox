import * as path from "path";
import * as url from "url";

import { app, BrowserWindow } from "electron";
import Koa from "koa";
import KoaBodyParser from "koa-bodyparser";
import KoaRouter from "koa-router";
// @ts-ignore
import KoaCors from "@koa/cors";

let webServer: Koa | null;
let window: BrowserWindow | null;

function startWebServer() {
    webServer = new Koa();
    webServer.use(KoaBodyParser());
    webServer.use(KoaCors());

    const router = new KoaRouter();

    router.post("/", (ctx) => {
        if (ctx.request.body) {
            // @ts-ignore
            if (ctx.request.body.url) {
                if (window !== null) {
                    // @ts-ignore
                    window.webContents.send("add-url", { url: ctx.request.body.url });
                }
            }
        }

        ctx.body = "hello world";
    });

    webServer.use(router.routes());

    webServer.listen(53737);
}

function createWindow() {
    window = new BrowserWindow({ width: 800, height: 600 });

    window.loadURL(url.format({
        pathname: path.join(__dirname, "../../static/index.html"),
        protocol: "file:",
        slashes: true
    }));

    window.webContents.openDevTools();

    window.on("closed", () => {
        window = null;
    });
}

app.on("ready", () => {
    startWebServer();
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (window === null) {
        createWindow();
    }
});
