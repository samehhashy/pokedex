<template>
  <v-card
    elevation="5"
    :loading="loading"
    loader-height="10"
    class="app-card app-card--floating"
    min-width="265"
    min-height="466"
    :style="position"
  >
    <v-img
      v-if="this.data.sprites"
      max-width="100"
      :src="this.data.sprites.front_default"
      class="app-card__img"
    />
    <h2 class="app-card__title">{{ data.name }}</h2>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Stat</th>
            <th class="text-left">Points</th>
            <th class="text-left">Effort</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in data.stats" :key="i">
            <td>{{ upperFirst(item.stat.name.replace("-", " ")) }}</td>
            <td class="text-center">{{ item.base_stat }}</td>
            <td class="text-center">{{ item.effort }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import upperFirst from "lodash/upperFirst";

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
    ...mapGetters(["hoverCard"])
  },

  methods: {
    upperFirst,

    getData() {
      this.loading = true;
      this.$store.dispatch("retrieveItem", { field: "pokemon" }).then(data => {
        this.data = data;
        this.loading = false;
      });
    },

    storeData(data) {
      this.$store.dispatch("appendPokemon", data);
    }
  },

  watch: {
    "hoverCard.active": {
      handler(isActive) {
        this.data = {};
        isActive && this.getData();
      }
    }
  }
};
</script>
