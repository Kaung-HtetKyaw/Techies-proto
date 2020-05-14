<template>
  <div>
    <div class="d-flex justify-center" v-if="!fetch">
      <v-btn outlined :loading="loading" color="info" @click="fetchComment">Load Comments</v-btn>
    </div>

    <div v-else>
      <h3 class="my-4">Leave a comment</h3>
      <v-divider></v-divider>

      <v-form
        ref="form"
        class="px-2 mt-4 my-6"
        lazy-validation
        v-model="valid"
        @submit="uploadComment"
        @enter="uploadComment"
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
        <Comment v-for="comment in comments" :key="comment.id" :comment="comment" class="mb-4" />
      </div>
      <div v-else>
        <h2>No comments</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { uniqueId } from "@/mixins/uniqueId.js";
import { rules } from "@/mixins/rules.js";
import { formattedDate } from "@/mixins/util.js";
import Comment from "@/components/Comment.vue";
import store from "@/store/index.js";
export default {
  mixins: [rules, uniqueId, formattedDate],
  props: {
    postid: {
      type: String,
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
      comments: state => state.comment.comments
    })
  },
  created() {
    console.log("state com in comp", this.comments);
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
          id: this.uniqueId,
          author: this.user,
          message: this.user_comment,
          likes: []
        });
        const db_comment_obj = {
          postid: this.postid,
          comments: db_comments
        };

        store
          .dispatch("comment/uploadComment", db_comment_obj)
          .then(res => {
            this.valid = true;
            this.user_comment = "Discuss";

            this.loading = false;
            this.comments.forEach(el => {
              console.log("shittt", el);
            });

            console.log("res upload", res);
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
          });
      }
    },
    fetchComment() {
      this.loading = true;
      store.dispatch("comment/fetchComments", this.postid).then(res => {
        this.fetch = true;
        this.loading = false;
        console.log("has comments", res);
        if (res) {
          this.has_comment = true;
        }
      });
    }
  }
};
</script>

<style>
</style>