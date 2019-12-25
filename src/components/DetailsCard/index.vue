<template>
  <v-card elevation="10" class="app-card details-card">
    <!-- <v-treeview :items="evolutionChain" /> -->
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import cloneDeepWith from "lodash/cloneDeepWith";

export default {
  name: "DetailsCard",

  computed: {
    ...mapGetters({ data: "evolution" })

    // evolutionChain() {
    //   let data = [];

    //   return data;
    // }
  },

  methods: {
    generateTreeRecursively() {
      const customizer = val => val;
      const clone = cloneDeepWith(this.data.evolves_to, customizer);
      console.log("TCL: generateTreeRecursively -> clone", clone);
    }
  },

  created() {
    this.generateTreeRecursively();
  }
};
</script>
