<template>
  <div>
    <v-row dense class="my-6">
      <v-col cols="12" sm="12" class="d-flex flex-column justify-center align-center">
        <p
          class="subtitle-2 info--text text-center"
        >Get started to keep in touch with the latest articles</p>

        <div>
          <v-btn elevation="0" color="info" @click="dialog=true">Get Started</v-btn>
        </div>
      </v-col>
      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="300">
          <v-card class="py-2">
            <v-card-title class="headline text-center my-4 d-flex justify-center">Join Techies</v-card-title>

            <v-card-text
              class="caption text-center"
            >Create an account to receive great stories in your inbox, personalize your homepage, and follow authors and topics that you love.</v-card-text>

            <v-card-actions class="d-flex flex-column justify-center align-center my-4">
              <v-btn :loading="loading" outlined @click="signInWithGoogle" class="mb-6">
                <v-icon size="20" class="px-2">mdi-google</v-icon>Sign In with Google
              </v-btn>
              <p
                class="overline text-center my-4 px-4"
              >Techies is an knowledge sharing social platform</p>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-row>
  </div>
</template>

<script>
import store from "@/store/index.js";

export default {
  data() {
    return {
      dialog: false,
      loading: false
    };
  },
  methods: {
    signInWithGoogle() {
      this.loading = true;
      store.dispatch("user/signInWithGoogle").then(() => {
        this.dialog = false;
        this.loading = false;
        this.$router.push({ name: "postsfeed" });
      });
    }
  }
};
</script>

<style>
</style>