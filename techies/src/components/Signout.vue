<template>
  <div @click="signOut">
    <v-divider class="my-2"></v-divider>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-account-minus-outline</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Sign Out</v-list-item-title>
    </v-list-item>
  </div>
</template>

<script>
import store from "@/store/index.js";
export default {
  methods: {
    signOut() {
      store
        .dispatch("user/signOut")
        .then(() => {
          this.$router.push({ name: "home" });
          console.log("out success");
        })
        .catch(error => [console.log(error)]);
    }
  }
};
</script>

<style>
</style>