<template>
  <div>
    <v-list-item class="d-flex justify-center align-center">
      <v-avatar size="40">
        <img :src="user.photoURL" :alt="user.displayName" />
      </v-avatar>
      <v-list-item-title class="ml-4 body-1">{{user.displayName}}</v-list-item-title>
    </v-list-item>
    <v-divider class="my-2"></v-divider>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
</style>