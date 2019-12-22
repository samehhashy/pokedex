<template>
  <v-card min-width="300" height="300" :loading="loading" class="app-card" max-width="400">
    <v-card-title v-text="item.name" />

    <!-- <v-card-subtitle></v-card-subtitle>

    <v-card-text>

    </v-card-text> -->

    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AppCard",

  props: {
    url: {
      type: String,
      default: ""
    },
    shown: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      loading: false,
      item: {}
    };
  },

  methods: {
    getData(url) {
      this.loading = true;
      this.reqTimer().then(() => {
        if (this.shown) {
          this.$axios(url).then(res => {
            this.item = res.data;
            this.loading = false;
          });
        }
      });
    },

    storeData(data) {
      this.$store.dispatch("appendPokemon", data);
    },

    reqTimer() {
      new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1500);
      });
    }
  },

  // mounted() {
  //   this.url && this.getData(this.url);
  // }

  watch: {
    url: {
      immediate: true,
      handler(val) {
        val && this.getData(val);
      }
    }
  }
};
</script>
