<template>
  <v-card elevation="10" class="app-list">
    <v-list>
      <v-subheader class="app-list__subheader" v-text="'Select Your Pokemon'" />

      <!-- ITEM -->
      <v-list-item-group v-for="(item, i) in items" :key="i">
        <v-list-item @mouseenter="showCard(item.url, $event)" @mouseleave="hideCard">
          <v-list-item-avatar class="app-list__avatar">
            <v-img class="app-list__avatar__img" src="@/assets/icons/pokemon-icon.svg" />
            <span class="app-list__avatar__num" v-text="i + 1" />
          </v-list-item-avatar>

          <v-list-item-content class="app-list__content">
            <v-list-item-title class="app-list__content__title" v-text="upperFirst(item.name)" />
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon class="material-icons" v-text="'mdi-send'" />
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>

      <!-- PAGINATION -->
      <v-list-item-action class="app-list__action">
        <v-btn
          :loading="loading"
          v-if="hasPagination"
          depressed
          block
          class="btn btn--more"
          @click="$emit('load-more')"
          >Load More</v-btn
        >
      </v-list-item-action>
    </v-list>

    <transition name="fade">
      <pokemon-card
        :url="itemURL"
        v-show="pokemonCard"
        class="app-card--floating"
        :style="cardPosition"
        @mousemove="pokemonCard = true"
      />
    </transition>
  </v-card>
</template>

<script>
import { upperFirst } from "lodash";

export default {
  name: "AppList",

  components: {
    PokemonCard: () => import("@/components/AppCard")
  },

  props: {
    items: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    hasPagination: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      pokemonCard: false,
      position: {
        x: 0,
        y: 0
      },
      itemURL: ""
    };
  },

  computed: {
    cardPosition() {
      return {
        transform: `translate3d(${this.position.x}px, ${this.position.y}px, 0)`
      };
    }
  },

  methods: {
    upperFirst,

    showCard(url, e) {
      this.position.x = e.clientX + 20;
      this.position.y = e.clientY - 60;
      this.itemURL = url;
      this.pokemonCard = true;
    },

    hideCard() {
      this.pokemonCard = false;
    }
  }
};
</script>
