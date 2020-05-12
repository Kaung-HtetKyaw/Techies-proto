<template>
  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ noti.message }}
    <v-btn :color="noti.type" text @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import store from "@/store/index.js";
export default {
  props: {
    noti: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      snackbar: true,
      timeout: 3000
    };
  },
  computed: {},
  mounted() {
    setTimeout(() => {
      store.dispatch("notification/deleteNoti", this.noti).then(() => {
        this.snackbar = false;
        console.log("noti removed");
      });
    }, this.timeout);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  }
};
</script>

<style>
</style>