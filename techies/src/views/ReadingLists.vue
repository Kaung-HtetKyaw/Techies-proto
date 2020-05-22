<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12" md="8" class="my-12">
          <div>
            <h1 class="headline text-center text-md-left">Reading List</h1>
          </div>
          <v-divider class="my-4"></v-divider>
          <div>
            <v-container v-if="readingLists.length==0" class="grey lighten-5 p-4">
              <v-row dense>
                <v-col cols="12" sm="12" md="4" class="d-flex justify-center align-center">
                  <v-img max-width="150" src="@/assets/readinglist.png"></v-img>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="8"
                  class="d-flex flex-column justify-center align-center align-md-start"
                >
                  <div class="opacity7 subtitle-1">
                    <p>You haven't save anything yet.</p>
                    <p>
                      Tap
                      <v-icon>mdi-bookmark-outline</v-icon>icon on posts to save them for later.
                    </p>
                  </div>
                  <div class="my-4 d-flex justify-sm-center justify-md-start">
                    <router-link :to="{name:'postsfeed'}" class="router-link">
                      <v-btn small elevation="0" color="info">Posts worth saving</v-btn>
                    </router-link>
                  </div>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-else>
              <v-row dense v-for="post in readingLists" :key="post.postid">
                <v-col cols="12" sm="12">
                  <PostCard :post="post" />
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
const PostCard = () =>
  import(/* webpackChunkName: "postcard" */ "@/components/PostCard.vue");
import { mapState } from "vuex";
export default {
  components: {
    PostCard
  },

  computed: {
    ...mapState({
      readingLists: state => state.posts.readingLists
    })
  }
};
</script>

<style>
.opacity9 {
  opacity: 0.9;
}
.opacity7 {
  opacity: 0.7;
}
</style>