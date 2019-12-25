import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import $axios from "@/plugins/axios";
import { getId } from "@/utils/helpers";

const vuexLocalStorage = new VuexPersist({
  key: "pokedex",
  storage: window.localStorage,
  // specifying only a certain state-item to be cached
  reducer: state => ({
    pokemonItems: state.pokemonItems,
    ["evolution-chainItems"]: state["evolution-chainItems"]
  })
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemonList: [],
    pokemonItems: [],
    ["evolution-chainItems"]: [],
    pokemon: {},
    evolution: {},
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
      state[`${payload.field}Items`].push(payload.data);
    },

    SET_HOVER_CARD(state, payload) {
      state.hoverCard = payload;
    },

    RETRIEVE_CACHED_ITEM(state, data) {
      const index = state[`${data.field}Items`].map(item => item.id).indexOf(data.id);
      state[data.field === "evolution-chain" ? "evolution" : "pokemon"] =
        state[`${data.field}Items`][index];
    }
  },

  actions: {
    retrieveItem({ commit, state, dispatch, getters }, { field, id = getId(state.hoverCard.url) }) {
      return new Promise((resolve, reject) => {
        const exists = getters.itemExists(id, field);
        if (exists) {
          commit("RETRIEVE_CACHED_ITEM", { field, id });
          resolve(state.pokemon);
          return;
        }
        dispatch("fetchItem", { url: `${field}/${id}`, field })
          .then(data => resolve(data))
          .catch(() => reject());
      });
    },

    fetchItem({ commit }, payload) {
      return new Promise((resolve, reject) => {
        $axios(payload.url)
          .then(res => {
            commit("APPEND_ITEM", { data: res.data, field: payload.field });
            resolve(res.data);
          })
          .catch(() => reject());
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
    pokemonItems: state => state.pokemonItems,
    pokemon: state => state.pokemon,
    evolution: state => state.evolution,
    hoverCard: state => state.hoverCard,
    itemExists: state => (id, field) => state[`${field}Items`].some(item => item.id === id)
  },

  plugins: [vuexLocalStorage.plugin]
});
