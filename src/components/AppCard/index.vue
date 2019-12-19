<template>
  <v-card class="app-card" max-width="400">
    <v-card-title v-text="item.name" />

    <!-- <v-card-subtitle>Number 10</v-card-subtitle>

    <v-card-text>
      <div>Whitehaven Beach</div>

      <div>Whitsunday Island, Whitsunday Islands</div>
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
    }
  },

  computed: {
    pokeItem() {
      const pokeItem = JSON.parse(localStorage.pokeItem);
      return pokeItem.name;
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
      if (this.pokeItem) {
        console.log("TCL: getData -> this.pokeItem", this.pokeItem);
        return this.pokeItem;
      }
      this.loading = true;
      this.$axios(url).then(res => {
        this.item = res.data;
        localStorage.setItem("pokeItem", JSON.stringify(this.item));
        this.loading = false;
      });
    }
  },

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
