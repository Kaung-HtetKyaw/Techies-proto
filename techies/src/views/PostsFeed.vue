<template>
  <div>
    <v-container class="py-0">
      <v-row dense class="d-none d-md-flex flex-column">
        <v-col cols="12" sm="12" md="8" offset-md="2">
          <Carousel />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" sm="12" md="8" offset-md="2">
          <PostCard v-for="post in posts" :key="post.postid" :post="post" />
        </v-col>
      </v-row>
      <v-row dense class="my-4">
        <v-col cols="12" sm="12" md="8" offset-md="2">
          <v-skeleton-loader v-if="loading" ref="skeleton" type="article" class="mx-auto"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
import Carousel from "@/components/PopularCarousel.vue";
import store from "@/store/index.js";
import NProgress from "nprogress";
import { mapState } from "vuex";
export default {
  data: () => {
    return {
      loading: false
    };
  },
  components: {
    PostCard,
    Carousel
  },
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    store.dispatch("posts/fetchPosts").then(response => {
      NProgress.done();
      console.log(response);
      next();
    });
  },

  computed: {
    ...mapState({
      posts: state => state.posts.posts,
      empty: state => state.posts.isEmpty
    })
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          if (!this.loading) {
            if (!this.empty) {
              this.loading = true;
              store
                .dispatch("posts/fetchMorePosts")
                .then(() => {
                  this.loading = false;
                })
                .catch(() => {
                  this.loading = false;
                });
            }
          }
        }
      };
    }
  },
  mounted() {
    this.scroll();
  }
};
</script>

<style>
</style>