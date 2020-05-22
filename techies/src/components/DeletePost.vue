<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn icon color="red" v-on="on">
          <v-icon>mdi-delete-empty-outline</v-icon>
        </v-btn>
      </template>
      <v-card width="300px" class="p-4">
        <v-card-title class="headline py-4">
          <v-container>
            <v-row dense class="d-flex justify-center my-2">
              <v-icon size="40" color="pink">mdi-delete-empty-outline</v-icon>
            </v-row>
            <v-row dense class="d-flex justify-center my-2">
              <h1 class="title pink--text">Delete Post</h1>
            </v-row>
          </v-container>
        </v-card-title>

        <v-card-actions class="background p-4">
          <v-container>
            <v-row dense class="d-flex justify-center my-6">
              <p
                class="body-2 opacity9"
              >Deleting a post will permanently remove it from your posts list</p>
            </v-row>
            <v-row dense class="d-flex justify-space-between">
              <v-btn outlined elevation="0" text color=" text" @click="dialog = false">
                <span class="opacity9">Cancel</span>
              </v-btn>
              <v-btn color="pink" :loading="loading" elevation="0" dark @click="deletePost">Delete</v-btn>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import store from "@/store/index.js";

export default {
  props: {
    postid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      loading: false
    };
  },
  methods: {
    deletePost() {
      this.loading = true;

      store
        .dispatch("posts/deletePost", this.postid)
        .then(deletedPostRelatedInformation => {
          //*update the local user by removing the deleted post from readingLists
          let user = store.state.user.user;
          user.readingLists = deletedPostRelatedInformation.local_readingLists;
          store.dispatch("user/updateLocalUser", user);
          this.loading = false;
          this.dialog = false;
          this.$router.push({ name: "postsfeed" });
        });
    }
  }
};
</script>
<style scoped>
.background {
  background-color: rgb(248, 245, 245);
}
.opacity9 {
  opacity: 0.9;
}
</style>