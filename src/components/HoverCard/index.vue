<template>
  <v-card
    min-width="300"
    height="300"
    :loading="loading"
    class="app-card app-card--floating"
    max-width="400"
    :style="position"
  >
    <!-- <v-card-title v-text="data.name" /> -->
    <!-- <v-card-subtitle></v-card-subtitle>
    <v-card-text></v-card-text> -->
    <!-- <v-card-actions></v-card-actions> -->
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HoverCard",

  data() {
    return {
      loading: false,
      data: {}
    };
  },

  computed: {
    position() {
      const pos = this.hoverCard.position;
      return {
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
      };
    },
    ...mapGetters(["pokemonList", "hoverCard"])
  },

  methods: {
    getData() {
      this.loading = true;
      this.$store.dispatch("getHoverItem").then(data => {
        this.data = data;
        this.loading = false;
      });
    },
    // getData(item) {
    //   this.loading = true;
    //   reqTimer().then(() => {
    //     if (this.hoverCard.active) {
    //       this.$store
    //         .dispatch("fetchItem", item)
    //         .then(() => (this.loading = false))
    //         .catch(() => (this.loading = false));
    //     }
    //   });
    // },

    storeData(data) {
      this.$store.dispatch("appendPokemon", data);
    }
  },

  watch: {
    "hoverCard.active": {
      handler(isActive) {
        isActive && this.getData();
      }
    }
  }
};
</script>
