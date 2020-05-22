<template>
  <div class="my-6">
    <v-card class="mx-auto" elevation="0" color="#fff py-0">
      <v-card-title class="py-0 px-0">
        <v-slide-group multiple show-arrows>
          <v-slide-item v-slot:default="{ active, toggle }" v-for="tag in post.tags" :key="tag">
            <v-chip class="ma-2" outlined :input-value="active" @click="toggle">#{{tag}}</v-chip>
          </v-slide-item>
        </v-slide-group>
      </v-card-title>

      <v-card-text class="px-0 py-0">
        <v-container fluid>
          <v-row dense class="d-flex flex-column-reverse flex-md-row">
            <v-col cols="12" sm="12" md="9" class="my-1">
              <router-link :to="{name:'postshow',params:{id:post.postid}}" class="router-link">
                <h2 class="title font-weight-medium black--text mb-4 serif">{{post.title}}</h2>
                <h3 class="subtitle-1 black--text mt-2 opacity7">{{formattedDescription}}</h3>
              </router-link>
            </v-col>
            <v-col cols="12" sm="12" md="3" class="d-flex justify-center align-center my-1">
              <v-img contain v-if="!!post.image" :src="post.image" :alt="post.title"></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="py-0">
        <v-container class="py-0 px-0">
          <v-row dense class="d-flex">
            <v-col cols="12" sm="12" md="6" class="justify-center align-center">
              <v-container class="py-0">
                <v-row dense class="d-flex flex-row align-center">
                  <router-link :to="{name:'user',params:{id:post.uid}}" class="router-link">
                    <v-list-item class="grow px-0">
                      <v-list-item-avatar color="grey darken-3">
                        <v-img :src="post.author.photoURL"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title
                          class="subtitle-1 font-weight-medium"
                        >{{post.author.displayName}}</v-list-item-title>
                        <v-list-item-title>
                          <div class="opacity7">
                            <span class="body-2">{{post.date}}</span>
                            <span class="mx-1">|</span>
                            <span class="body-2">{{post.readTime}} read</span>
                          </div>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </router-link>
                </v-row>
              </v-container>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
              class="d-flex justify-sm-start justify-md-end align-center"
            >
              <div class="pr-2">
                <v-btn icon color="pink" @click="likeOrUnlikePost">
                  <v-icon v-if="likedPost">mdi-heart</v-icon>
                  <v-icon v-else>mdi-heart-outline</v-icon>
                </v-btn>
                <span v-if="post.likes.length>0" class="subheading mr-2">{{post.likes.length}}</span>
              </div>

              <div class="pr-2">
                <v-btn icon color="info" @click="addOrRemoveBookMark">
                  <v-icon v-if="addedToReadingList">mdi-bookmark</v-icon>
                  <v-icon v-else>mdi-bookmark-outline</v-icon>
                </v-btn>
              </div>

              <div v-if="post.uid===user.uid" class="pr-2">
                <router-link :to="{name:'edit',params:{id:post.postid}}" class="router-link">
                  <v-btn icon color="info">
                    <v-icon>mdi-pencil-circle-outline</v-icon>
                  </v-btn>
                </router-link>
              </div>

              <div v-if="post.uid===user.uid" class="pr-2">
                <DeletePost :postid="post.postid" />
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
    <v-divider class="my-2"></v-divider>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/index.js";
const DeletePost = () =>
  import(/* webpackChunkName: "deletepost" */ "@/components/DeletePost.vue");
export default {
  components: {
    DeletePost
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },

  methods: {
    addOrRemoveBookMark() {
      if (!this.addedToReadingList) {
        store.dispatch("user/addToBookMark", this.post.postid).then(() => {});
      } else {
        store
          .dispatch("user/removeFromBookMark", this.post.postid)
          .then(() => {});
      }
    },
    likeOrUnlikePost() {
      if (!this.likedPost) {
        const payload = {
          postid: this.post.postid,
          uid: this.user.uid
        };
        store.dispatch("posts/likePost", payload).then(() => {});
      } else {
        const payload = {
          postid: this.post.postid,
          uid: this.user.uid
        };
        store.dispatch("posts/unlikePost", payload).then(() => {});
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    }),
    formattedDescription() {
      const desp = this.post.description.split(" ");
      const formatted_desp = this.post.description
        .split(" ")
        .slice(0, 20)
        .join(" ");
      return desp.length > 20 ? formatted_desp + "...." : formatted_desp;
    },
    addedToReadingList() {
      const added = this.user.readingLists.includes(this.post.postid);

      return added;
    },
    likedPost() {
      const liked = this.post.likes.includes(this.user.uid);

      return liked;
    }
  }
};
</script>

<style scoped>
.opacity7 {
  opacity: 0.7;
}
.opacity9 {
  opacity: 0.9;
}
.serif {
  font-family: serif !important;
}
</style>