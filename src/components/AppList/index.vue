<template>
  <v-list elevation="20" class="app-list">
    <v-subheader class="app-list__subheader" v-text="'Select Your Pokemon'" />
    <v-list-item-group v-for="(item, i) in items" :key="i">
      <v-list-item>
        <v-list-item-avatar class="app-list__avatar">
          <v-img src="@/assets/icons/pokemon-icon.svg" />
        </v-list-item-avatar>
        <v-list-item-content class="app-list__content">
          <v-list-item-title class="app-list__content__title" v-text="upperFirst(item.name)" />
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon class="material-icons">mdi-send</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list-item-group>

    <v-list-item-action class="app-list__action">
      <v-btn depressed class="btn btn--more" v-text="'Load More'" />
    </v-list-item-action>
  </v-list>
</template>

<script>
import { upperFirst } from 'lodash'

export default {
  name: 'AppList',

  props: {
    items: {
      type: Array,
      required: true
    }
  },

  methods: {
    upperFirst
  }
}
</script>
