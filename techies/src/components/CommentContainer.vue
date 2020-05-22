<template>
  <div>
    <div class="d-flex justify-center" v-if="!fetch">
      <v-btn outlined :loading="loading" color="info" @click="fetchComment">Load Comments</v-btn>
    </div>

    <div v-else>
      <h3 class="my-4 text-center text-md-left">Leave a comment</h3>
      <v-divider></v-divider>

      <v-form
        ref="form"
        class="px-2 mt-4 my-6"
        lazy-validation
        v-model="valid"
        @submit="uploadComment"
        @keydown.enter="uploadComment"
      >
        <v-textarea
          v-model="user_comment"
          label="Discuss"
          :rules="textRules"
          outlined
          auto-grow
          class="p-0"
        ></v-textarea>
        <div class="d-flex justify-center">
          <v-btn
            outlined
            :loading="loading"
            :disabled="!valid"
            color="info"
            @click="uploadComment"
            rounded
          >Submit</v-btn>
        </div>
      </v-form>
      <v-divider class="my-4"></v-divider>
      <div v-if="comments.length>0">
        <Comment
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          :post="post"
          class="mb-4"
        />
      </div>
      <div v-else class="grey lighten-5 my-12">
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
            <div class="subtitle-1">
              <p class="opacity7">This post has no comment yet</p>
              <div>
                <v-avatar size="30" class="mr-2">
                  <img :src="user.photoURL" :alt="user.displayName" />
                </v-avatar>
                <span class="opacity7">Be the first to write a comment</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { rules } from "@/mixins/rules.js";
import { formattedDate } from "@/mixins/util.js";
import Comment from "@/components/Comment.vue";
import store from "@/store/index.js";

export default {
  mixins: [rules, formattedDate],
  props: {
    postid: {
      type: String,
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
      user_comment: "",
      loading: false,
      fetch: false,
      has_comment: false
    };
  },
  components: {
    Comment
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      comments: state => state.comment.comments.comments
    })
  },

  methods: {
    uploadComment() {
      this.$refs.form.validate();
      if (this.valid) {
        this.loading = true;
        //* i have to post comment obj that includes postid & comments array
        //* but stae.comments can't be assigned directly so i push it to a variable
        //* and push a comment to upload and make an obj that includes postid and comments array and dispatch it
        let db_comments = [];

        //* but stae.comments can't be assigned directly so i push it to a variable

        this.comments.forEach(el => {
          db_comments.push(el);
        });

        //* and push a comment to upload and make an obj that includes postid and comments array and dispatch it
        db_comments.push({
          date: this.formattedDate,
          id: this.uniqueId(),
          author: { ...this.user },
          message: this.user_comment,
          likes: []
        });
        const db_comment_obj = {
          postid: this.postid,
          comments: db_comments
        };

        store
          .dispatch("comment/uploadComment", db_comment_obj)
          .then(() => {
            this.valid = true;
            this.user_comment = " ";

            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    fetchComment() {
      this.loading = true;
      store.dispatch("comment/fetchComments", this.postid).then(res => {
        this.fetch = true;
        this.loading = false;

        if (res) {
          this.has_comment = true;
        }
      });
    },
    uniqueId() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    }
  }
};
</script>

<style>
.opacity7 {
  opacity: 0.7;
}
.opacity9 {
  opacity: 0.9;
}
</style>