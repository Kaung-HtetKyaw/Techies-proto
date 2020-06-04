<template>
  <div class="my-6">
    <v-container class="overflow-hidden">
      <v-row dense>
        <v-col cols="12" sm="12" md="8" offset-md="2">
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="12">
                <v-img
                  v-if="!!post.image"
                  :src="post.image"
                  :alt="post.title"
                ></v-img>
              </v-col>
            </v-row>
            <v-row dense class="my-4">
              <v-slide-group multiple show-arrows>
                <v-slide-item
                  v-slot:default="{ active, toggle }"
                  v-for="tag in post.tags"
                  :key="tag"
                >
                  <v-chip
                    class="ma-2"
                    outlined
                    :input-value="active"
                    @click="toggle"
                    >#{{ tag }}</v-chip
                  >
                </v-slide-item>
              </v-slide-group>
            </v-row>
            <v-row dense class="my-4">
              <v-col cols="12" sm="12">
                <h1 class="font-weight-bold header">{{ post.title }}</h1>
              </v-col>
            </v-row>
            <v-row dense class="my-4">
              <router-link
                :to="{ name: 'user', params: { id: post.uid } }"
                class="router-link"
              >
                <v-col
                  cols="12"
                  sm="12"
                  md="8"
                  class="d-flex justify-sm-start justify-md-center align-center"
                >
                  <v-container class="py-0">
                    <v-row dense class="d-flex flex-row align-center">
                      <v-list-item class="grow px-0">
                        <v-list-item-avatar color="grey darken-3">
                          <v-img :src="post.author.photoURL"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            class="subtitle-1 font-weight-medium"
                            >{{ post.author.displayName }}</v-list-item-title
                          >
                          <v-list-item-title>
                            <div class="opacity7">
                              <span class="body-2">{{ post.date }}</span>
                              <span class="mx-1">|</span>
                              <span class="body-2"
                                >{{ post.readTime }} read</span
                              >
                            </div>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-row>
                  </v-container>
                </v-col>
              </router-link>

              <v-col
                cols="12"
                sm="12"
                md="4"
                class="d-flex flex-row justify-sm-start justify-md-end align-center"
              >
                <div>
                  <v-btn icon color="pink" @click="likeOrUnlikePost">
                    <v-icon v-if="likedPost">mdi-heart</v-icon>
                    <v-icon v-else>mdi-heart-outline</v-icon>
                  </v-btn>
                  <span class="subheading mr-2" v-if="post.likes.length > 0">
                    {{ post.likes.length }}
                  </span>
                </div>

                <div>
                  <v-btn icon color="info" @click="addOrRemoveBookMark">
                    <v-icon v-if="addedToReadingList">mdi-bookmark</v-icon>
                    <v-icon v-else>mdi-bookmark-outline</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" sm="12">
                <div v-html="post.content"></div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" sm="12" md="8" offset-md="2">
          <v-container>
            <v-row dense class="d-flex flex-column align-center justify-center">
              <v-col
                cols="12"
                sm="12"
                md="12"
                class="d-flex justify-center align-center"
              >
                <div>
                  <v-btn x-large icon color="pink" @click="likeOrUnlikePost">
                    <v-icon v-if="likedPost">mdi-heart</v-icon>
                    <v-icon v-else>mdi-heart-outline</v-icon>
                  </v-btn>
                  <span class="subheading mr-2" v-if="post.likes.length > 0">
                    {{ post.likes.length }}
                  </span>
                </div>
                <div>
                  <v-btn x-large icon color="info" @click="addOrRemoveBookMark">
                    <v-icon v-if="addedToReadingList">mdi-bookmark</v-icon>
                    <v-icon v-else>mdi-bookmark-outline</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" sm="12" md="8" offset-md="2">
          <CommentContainer :postid="post.postid" :post="post" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import store from "@/store/index.js";
import { mapState } from "vuex";
import CommentContainer from "@/components/CommentContainer.vue";
export default {
  components: {
    CommentContainer
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    id: {
      type: String,
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
.overflow-hidden {
  overflow: hidden;
}
.opacity7 {
  opacity: 0.7;
}
.opacity9 {
  opacity: 0.9;
}
.header {
  font-family: serif;
}
</style>
