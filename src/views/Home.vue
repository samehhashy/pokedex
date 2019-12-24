<template>
  <div class="home">
    <!-- <v-parallax class="home__hero" src="@/assets/imgs/hero-img.jpg">
      <div class="overlay" />
      <h1 class="home__hero__title" v-text="'POKEDEX'" />
    </v-parallax> -->

    <main class="home__body">
      <v-container>
        <v-row justify="space-around">
          <!-- LIST ITEMS -->
          <v-col cols="12" sm="6" xl="5">
            <pokemon-list />
          </v-col>

          <!-- DETAILS CARD -->
          <v-col cols="12" sm="6" xl="5">
            <pokemon-details />
          </v-col>
        </v-row>
      </v-container>
    </main>

    <!-- HOVER CARD -->
    <transition name="fade">
      <hover-card v-show="hoverCard.active" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",

  components: {
    PokemonList: () => import("@/components/AppList"),
    PokemonDetails: () => import("@/components/DetailsCard"),
    HoverCard: () => import("@/components/HoverCard")
  },

  computed: {
    ...mapGetters(["hoverCard"])
  }
};
</script>
