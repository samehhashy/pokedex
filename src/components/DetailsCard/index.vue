<template>
  <v-card elevation="10" class="app-card details-card">
    {{ data }}
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DetailsCard",

  computed: {
    ...mapGetters({ data: "currPokemon" })
  }
};
</script>
