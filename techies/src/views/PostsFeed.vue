<template>
  <div id="PostsFeed">
    <v-container class="py-0">
      <v-row dense class>
        <v-col cols="12" sm="12" md="10" offset-md="1">
          <PopularPosts :posts="popularPosts" />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" sm="12" md="10" offset-md="1">
          <PostCard v-for="post in posts" :key="post.postid" :post="post" />
        </v-col>
      </v-row>
      <v-row dense class="my-4">
        <v-col cols="12" sm="12" md="8" offset-md="2">
          <v-skeleton-loader v-if="loading" ref="skeleton" type="article" class="mx-auto"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row dense class="mb-6" v-if="empty">
        <v-col cols="12" sm="12" md="8" offset-md="2" class="d-flex justify-center align-center">
          <v-chip class="ma-2" color="warning" outlined>
            <v-icon left>mdi-emoticon-sad-outline</v-icon>End of results
          </v-chip>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
import PopularPosts from "@/components/PopularPosts.vue";

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
    PopularPosts
  },
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    const tags = store.state.user.user.tags;
    console.log("tags", tags);
    store.dispatch("posts/fetchPosts", tags).then(response => {
      store.dispatch("posts/fetchPopularPosts").then(() => {
        NProgress.done();
        console.log(response);
        next();
      });
    });
  },

  computed: {
    ...mapState({
      posts: state => state.posts.posts,
      empty: state => state.posts.isEmpty,
      popularPosts: state => state.posts.popularPosts,
      filter: state => state.posts.filter
    })
  },
  created() {
    console.log("postsfeed posts", this.posts);
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          if (!this.filter) {
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
        }
      };
    }
  },
  mounted() {
    this.scroll();
  }
};
</script>

<style scoped>
.round-border {
  border-radius: 100px;
}
.pos-relative {
  position: relative;
}
.pos-fixed {
  position: fixed;
  height: 700px;
  margin-top: 5rem;
}
</style>