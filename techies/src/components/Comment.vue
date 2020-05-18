<template>
  <div class="my-6">
    <v-card class="mx-auto" elevation="0" color="#fff py-0">
      <v-card-text class="px-0 py-0">
        <v-container fluid>
          <v-row dense class="d-flex flex-column-reverse flex-md-row">
            <h3 class="body-1 black--text">{{comment.message}}</h3>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="py-0">
        <v-container class="py-0 px-0">
          <v-row dense class="d-flex">
            <v-col cols="12" sm="12" class="justify-center align-center">
              <v-container class="px-0">
                <v-row dense class="d-flex flex-row align-center justify-space-between">
                  <span>
                    <router-link
                      :to="{name:'user',params:{id:comment.author.uid}}"
                      class="router-link"
                    >
                      <v-list-item class="grow px-0">
                        <v-list-item-avatar size="30" color="grey darken-3">
                          <v-img :src="comment.author.photoURL"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            class="subtitle-2 font-weight-medium ellipsis"
                          >{{comment.author.displayName}}</v-list-item-title>
                          <v-list-item-title
                            class="caption font-weight-light opacity7"
                          >{{comment.date}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </router-link>
                  </span>
                  <span class="d-flex flex-row justify-center align-center">
                    <div>
                      <v-btn icon color="pink" @click="likeOrUnlike">
                        <v-icon v-if="likedComment">mdi-heart</v-icon>
                        <v-icon v-else>mdi-heart-outline</v-icon>
                      </v-btn>
                      <span
                        v-if="comment.likes.length>0"
                        class="subheading mr-2"
                      >{{comment.likes.length}}</span>
                    </div>
                    <div>
                      <v-menu
                        close-on-content-click
                        bottom
                        left
                        v-if="comment.author.uid===user.uid||user.uid===post.uid"
                      >
                        <template v-slot:activator="{ on }">
                          <v-btn icon v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                          </v-btn>
                        </template>

                        <v-list width="200px">
                          <div v-if="comment.author.uid===user.uid">
                            <v-list-item class="d-flex justify-center">
                              <v-dialog v-model="edit" persistent width="300px">
                                <template v-slot:activator="{ on }">
                                  <v-btn
                                    class="black--text opacity7"
                                    text
                                    block
                                    v-on="on"
                                  >Edit Comment</v-btn>
                                </template>
                                <v-card max-width="300px" class="p-4">
                                  <v-card-title class="primary lighten-1 white--text">
                                    <span class="headline">Edit Your Comment</span>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12" sm="12">
                                          <v-textarea
                                            counter="200"
                                            v-model="comment.message"
                                            label="Edit Your Comment"
                                            :rules="textRules"
                                            auto-grow
                                            class="py-4"
                                          ></v-textarea>
                                        </v-col>
                                        <v-col cols="12" sm="12" class="px-6">
                                          <div
                                            class="d-flex flex-column flex-md-row justify-sm-center justify-md-space-between"
                                          >
                                            <v-btn
                                              text
                                              elevation="0"
                                              outlined
                                              class="my-2"
                                              @click="edit=false"
                                            >Cancel</v-btn>
                                            <v-btn
                                              elevation="0"
                                              :loading="loading"
                                              :disabled="!valid"
                                              color="info"
                                              class="my-2"
                                              @click="update"
                                            >Update</v-btn>
                                          </div>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>
                                </v-card>
                              </v-dialog>
                            </v-list-item>
                            <v-divider></v-divider>
                          </div>
                          <v-list-item
                            class="d-flex justify-center"
                            v-if="comment.author.uid===user.uid||user.uid===post.uid"
                          >
                            <v-dialog v-model="deleteDialog" persistent max-width="290">
                              <template v-slot:activator="{ on }">
                                <v-btn
                                  class="black--text opacity7"
                                  text
                                  block
                                  v-on="on"
                                >Delete comment</v-btn>
                              </template>
                              <v-card width="300px" class="p-4">
                                <v-card-title class="headline py-4">
                                  <v-container>
                                    <v-row dense class="d-flex justify-center my-2">
                                      <v-icon size="40" color="pink">mdi-delete-empty-outline</v-icon>
                                    </v-row>
                                    <v-row dense class="d-flex justify-center my-2">
                                      <h1 class="title pink--text">Delete Comment</h1>
                                    </v-row>
                                  </v-container>
                                </v-card-title>

                                <v-card-actions class="background p-4">
                                  <v-container>
                                    <v-row dense class="d-flex justify-center my-6">
                                      <p
                                        class="body-2 opacity9"
                                      >Deleting a comment will permanently remove it from the post</p>
                                    </v-row>
                                    <v-row dense class="d-flex justify-space-between">
                                      <v-btn
                                        outlined
                                        elevation="0"
                                        text
                                        color=" text"
                                        @click="deleteDialog=false"
                                      >
                                        <span class="opacity9">Cancel</span>
                                      </v-btn>
                                      <v-btn
                                        color="pink"
                                        :loading="deleting"
                                        elevation="0"
                                        dark
                                        @click="deleteComment"
                                      >Delete</v-btn>
                                    </v-row>
                                  </v-container>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>
                  </span>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
    <v-divider class="my-2"></v-divider>
  </div>
</template>

<script>
import { rules } from "@/mixins/rules.js";
import { mapState } from "vuex";
import store from "@/store/index.js";
export default {
  mixins: [rules],
  props: {
    comment: {
      type: Object,
      required: true
    },
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      valid: true,
      edit: true,
      deleteDialog: false,
      loading: false,
      deleting: false
    };
  },
  created() {
    console.log("comment post", this.post);
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    }),
    likedComment() {
      const liked = this.comment.likes.includes(this.user.uid);
      console.log("did he like the comment", liked);
      return liked;
    }
  },
  methods: {
    update() {
      if (this.valid) {
        this.loading = true;
        let db_comment = this.comment;
        db_comment.message = this.comment.message;
        store.dispatch("comment/updateComment", db_comment).then(res => {
          this.edit = false;
          this.loading = false;
          console.log("updated comment", res);
        });
      }
    },
    deleteComment() {
      this.deleting = true;
      store.dispatch("comment/deleteComment", this.comment.id).then(() => {
        this.deleting = false;
        this.deleteDialog = false;
        console.log("deleted");
      });
    },
    likeOrUnlike() {
      if (!this.likedComment) {
        const payload = {
          id: this.comment.id,
          uid: this.user.uid
        };
        store.dispatch("comment/likeComment", payload).then(() => {
          console.log("liked");
        });
      } else {
        const payload = {
          id: this.comment.id,
          uid: this.user.uid
        };
        store.dispatch("comment/unlikeComment", payload).then(() => {
          console.log("unliked");
        });
      }
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
.ellipsis {
  width: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.background {
  background-color: rgb(248, 245, 245);
}
</style>