import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import $axios from "@/plugins/axios";

const vuexLocalStorage = new VuexPersist({
  key: "pokedex",
  storage: window.localStorage,
  // specifying only a certain state item to be cached
  reducer: state => ({ pokemonItems: state.pokemonItems })
});

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
      // extracting the item id from the url string
      const id = Number(url.split("/")[url.split("/").length - 2]);

      return new Promise((resolve, reject) => {
        const exists = state.pokemonItems.some(item => item.id === id);
        // in case if the item has already been fetched & cached before
        if (exists) {
          const index = state.pokemonItems.map(item => item.id).indexOf(id);
          const item = state.pokemonItems[index];
          resolve(item);
          return;
        }
        // Otherwise -> in case if the item is being hovered-over for the first time, make a request
        $axios(url)
          .then(res => {
            // mutate the state with the new item in order to be cached for future queries
            commit("APPEND_ITEM", res.data);
            resolve(res.data);
          })
          .catch(() => {
            reject();
          });
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
  },

  plugins: [vuexLocalStorage.plugin]
});
