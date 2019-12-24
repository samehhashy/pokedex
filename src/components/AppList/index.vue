<template>
  <v-card elevation="10" class="app-list">
    <v-list>
      <v-subheader class="app-list__subheader" v-text="'Select Your Pokemon'" />

      <!-- ITEM -->
      <v-list-item-group v-for="(item, index) in listData" :key="index">
        <v-list-item
          @mouseenter="
            toggleHoverCard({
              active: true,
              url: item.url,
              position: {
                x: $event.clientX + 20,
                y: $event.clientY - 60
              }
            })
          "
          @mouseleave="toggleHoverCard"
        >
          <v-list-item-avatar class="app-list__avatar">
            <v-img class="app-list__avatar__img" src="@/assets/icons/pokemon-icon.svg" />
            <span class="app-list__avatar__num" v-text="index + 1" />
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
          :loading="loading.page"
          v-if="hasNextPage"
          depressed
          block
          class="btn btn--more"
          @click="$emit('load-more')"
          >Load More</v-btn
        >
      </v-list-item-action>
    </v-list>
  </v-card>
</template>

<script>
import upperFirst from "lodash/upperFirst";

export default {
  name: "AppList",

  data() {
    return {
      listData: [],
      next: "",
      count: 0,
      loading: { list: false, page: false }
    };
  },

  computed: {
    hasNextPage() {
      return this.count !== this.listData.length;
    }
  },

  created() {
    this.getListItems();
  },

  methods: {
    upperFirst,

    getListItems() {
      this.loading.page = true;
      this.$axios("pokemon")
        .then(res => {
          this.listData = res.data.results;
          this.next = res.data.next;
          this.count = res.data.count;
          this.loading.page = false;
        })
        .catch(() => (this.loading.page = false));
    },

    toggleHoverCard(payload) {
      this.$store.dispatch("toggleHoverCard", payload);
    }
  }
};
</script>
