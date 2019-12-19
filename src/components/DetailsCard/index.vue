<template>
  <v-card elevation="10" class="app-card details-card">
    details
  </v-card>
</template>

<script>
export default {
  name: "DetailsCard",

  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>
