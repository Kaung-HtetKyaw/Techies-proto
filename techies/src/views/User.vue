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
                      class="d-flex flex-column align-center align-md-start"
                    >
                      <h1 class="display-1 font-weight-medium">{{author.displayName}}</h1>
                      <h3 class="my-2 title">{{author.bio}}</h3>
                      <h5 class="body-2 opacity7 font-weight-medium mb-2">Joined since May 20,2020</h5>

                      <h5 class="body-2 font-weight-medium opacity9">
                        <span class="font-weight-bold">{{posts.length}}</span>
                        {{posts.length>1?'posts':'post'}} in total
                      </h5>
                      <v-btn
                        v-if="author.uid===user.uid"
                        small
                        tile
                        outlined
                        color="white"
                        class="mt-4"
                      >
                        <v-icon left>mdi-pencil</v-icon>Edit
                      </v-btn>
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
      <v-row dense v-else class="d-flex flex-column justify-center align-center px-6">
        <div class="my-2 my-md-4">
          <v-icon size="50" left>mdi-emoticon-sad-outline</v-icon>
        </div>
        <h1 class="headline opacity7 my-4 text-center">Your dont't have any posts yet</h1>
        <router-link :to="{name:'create'}" class="router-link">
          <v-btn outlined color="info" rounded>Create Now</v-btn>
        </router-link>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
import { mapState } from "vuex";
export default {
  props: {
    author: {
      type: Object,
      required: true
    },
    posts: {
      type: Array,
      required: true
    }
  },
  components: {
    PostCard
  },
  created() {
    console.log("author", this.author);
    console.log("posts", this.posts);
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
    // fomattedDate(){
    //   return this.author.joined.split(' ').slice(1,4)
    // }
  }
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