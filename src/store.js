import Vue from "vue";
import Vuex from "vuex";
// import VuexPersist from "vuex-persist";
import $axios from "@/plugins/axios";
// import { reqTimer } from "@/utils/helpers";

// const vuexLocalStorage = new VuexPersist({
//   key: "pokedex",
//   storage: window.localStorage,
//   reducer: state => state.pokemonItems
//   // Function that passes a mutation and lets you decide if it should update the state in localStorage.
//   // filter: mutation => (true)
// });

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemonList: [],
    pokemonItems: [],
    currPokemon: {},
    hoverCard: {
      active: false,
      url: "",
      position: {
        x: 0,
        y: 0
      }
    }
  },

  mutations: {
    APPEND_LIST_PAGE(state, payload) {
      state.pokemonList.push(...payload);
    },

    APPEND_ITEM(state, payload) {
      console.log("TCL: APPEND_ITEM -> payload", payload);
      state.pokemonItems.push(payload);
    },

    SET_HOVER_CARD(state, payload) {
      state.hoverCard = payload;
    }
  },

  actions: {
    fetchPokemons({ commit }) {
      return new Promise((resolve, reject) => {
        $axios("pokemon")
          .then(res => {
            commit("APPEND_LIST_PAGE", res.data.results);
            resolve({ next: res.data.next, count: res.data.count });
          })
          .catch(() => {
            reject();
          });
      });
    },

    getHoverItem({ commit, state }) {
      const url = state.hoverCard.url;
      const id = url.split("/")[url.split("/").length - 2];
      const index = state.pokemonItems.map(item => item.id).indexOf(id);
      console.log(state.pokemonItems.map(item => item.id));
      console.log("id -->", id);
      console.log("index -->", index);

      return new Promise((resolve, reject) => {
        if (index >= 0) {
          const item = state.pokemonItems[index];
          resolve(item);
        } else {
          $axios(url)
            .then(res => {
              console.log("request success");
              commit("APPEND_ITEM", res.data);
              resolve(res.data);
            })
            .catch(() => {
              reject();
            });
        }
      });
    },

    toggleHoverCard({ commit, state }, payload) {
      if (!payload.active) {
        state.hoverCard.active = false;
        return;
      }
      commit("SET_HOVER_CARD", payload);
    }
  },

  getters: {
    pokemonList: state => state.pokemonList,
    currPokemon: state => state.currPokemon,
    hoverCard: state => state.hoverCard
  }

  // plugins: [vuexLocalStorage.plugin]
});
