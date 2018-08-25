import { ipcRenderer } from "electron";

import Vue from "vue";
import Vuex, { MutationTree, mapState } from "vuex";

Vue.use(Vuex);

class State {
    public urls: string[] = [];
}

const mutations: MutationTree<State> = {
    addUrl(state, url: string) {
        state.urls.push(url);
    },
};

const store = new Vuex.Store({
    state: new State(),
    mutations,
});

const app = new Vue({
    el: "#app",
    store,
    computed: {
        ...mapState([
            "urls",
        ]),
    },
});

ipcRenderer.on("add-url", (event: any, payload: { url: string }) => {
    console.log(`add-url: ${JSON.stringify(payload, null, 4)}`);

    app.$store.commit("addUrl", payload.url);
});
