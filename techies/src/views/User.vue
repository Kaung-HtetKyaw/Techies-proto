<template>
  <div class="mb-12">
    <v-container fluid class="px-0 py-0">
      <v-row dense class="px-0 py-0">
        <v-col cols="12" sm="12" class="px-0 py-0">
          <v-container fluid class="primary lighten-1 white--text py-10">
            <v-row dense>
              <v-col cols="12" sm="12" md="6" offset-md="3">
                <v-container>
                  <v-row dense class="d-flex justify-center align-center">
                    <v-col cols="12" sm="12" md="5" class="d-flex justify-center">
                      <v-avatar size="120">
                        <img :src="author.photoURL" :alt="author.displayName" />
                      </v-avatar>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="7"
                      class="d-flex flex-column align-center align-md-start px-4 py-4"
                    >
                      <h1
                        class="display-1 font-weight-medium text-center text-md-left"
                      >{{author.displayName}}</h1>
                      <h3 class="text-center text-md-left my-4 sibtitle-2">
                        <span>{{author.bio}}</span>
                      </h3>
                      <h5 class="body-2 opacity7 font-weight-medium mb-2">Joined since {{trimTime}}</h5>

                      <h5 class="body-2 font-weight-medium opacity9">
                        <span class="font-weight-bold">{{posts.length}}</span>
                        {{posts.length>1?'posts':'post'}} in total
                      </h5>
                      <router-link
                        v-if="author.uid===user.uid"
                        :to="{name:'updateprofile'}"
                        class="router-link"
                      >
                        <v-btn small tile outlined color="white" class="mt-4">
                          <v-icon left>mdi-pencil</v-icon>Update Profile
                        </v-btn>
                      </router-link>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row dense class="my-12 px-4" v-if="posts.length>0">
        <v-col cols="12" sm="12" md="8" offset-md="2">
          <h1 class="headline font-weight-medium text-center">Posts by {{author.displayName}}</h1>
          <v-divider class="my-4"></v-divider>
          <PostCard v-for="post in posts" :key="post.postid" :post="post" />
        </v-col>
      </v-row>

      <v-row v-else dense class="my-12">
        <v-col cols="12" sm="12" md="8" offset-md="2">
          <div>
            <h1 class="headline text-center text-md-left">Posts by {{author.displayName}}</h1>
          </div>
          <v-divider class="my-4"></v-divider>
          <v-container class="grey lighten-5">
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
                  <p>You haven't post anything yet.</p>
                </div>
                <div class="my-4 d-flex justify-center">
                  <router-link :to="{name:'create'}" class="router-link">
                    <v-btn small elevation="0" color="info">Create on Now</v-btn>
                  </router-link>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>



<script>
import PostCard from "@/components/PostCard.vue";
import { mapState } from "vuex";

import store from "@/store/index.js";
function fetchInfo(to, next) {
  console.log("user id", to.params.id);
  store.dispatch("user/fetchUser", to.params.id).then(user => {
    store.dispatch("posts/fetchUserPosts", user.uid).then(res => {
      console.log("res", res);
      to.params.author = user;
      to.params.posts = res.posts;
      next();
    });
  });
}
export default {
  beforeRouteEnter(to, from, next) {
    fetchInfo(to, next);
  },
  beforeRouteUpdate(to, from, next) {
    fetchInfo(to, next);
  },

  props: {
    author: {
      type: Object,
      required: true
    },
    posts: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  components: {
    PostCard
  },
  created() {
    console.log("author", this.author);
    console.log("posts", this.posts);
    console.log("id", this.id);
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    }),
    trimTime() {
      return this.author.joined
        .split(" ")
        .slice(1, 4)
        .join(" ");
    }
    // fomattedDate(){
    //   return this.author.joined.split(' ').slice(1,4)
    // }
  },
  methods: {}
};
</script>

<style scoped>
.header-wrapper {
  height: 200px;
}
.opacity7 {
  opacity: 0.7;
}
.opacity9 {
  opacity: 0.9;
}
.serif {
  font-family: serif;
}
</style>