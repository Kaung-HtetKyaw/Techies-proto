<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              type="text"
              v-model="post.title"
              :counter="80"
              :rules="titleRules"
              label="Title"
              rounded
              required
            ></v-text-field>
            <v-textarea
              label="Overview for your posts"
              v-model="post.description"
              :rules="textRules"
              rounded
              auto-grow
              class
            ></v-textarea>

            <div class="mb-6">
              <v-btn
                v-if="choose_btn"
                outlined
                color="info"
                rounded
                required
                @click="onPickFile"
                >Choose a file</v-btn
              >
              <input
                type="file"
                class="d-none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
              />
              <v-img
                v-if="getImageUrl"
                :src="getImageUrl"
                width="300px"
                class="my-4"
              ></v-img>
              <div class="my-4" v-if="upload_btn">
                <v-btn
                  outlined
                  small
                  color="success"
                  :loading="upload"
                  rounded
                  required
                  @click="uploadFile"
                >
                  Upload
                  <v-icon right dark>mdi-cloud-upload</v-icon>
                </v-btn>
              </div>
            </div>
            <div>
              <vue-editor
                required
                v-model="post.content"
                :editorToolbar="customToolbar"
              ></vue-editor>
            </div>
            <v-select
              v-model="post.tags"
              :items="categories"
              chips
              deletable-chips
              label="Choose tags"
              multiple
              :rules="postCatRules"
              required
              rounded
            >
              <template v-slot:prepend-item></template>
            </v-select>
            <v-select
              v-model="post.readTime"
              :items="createReadTime"
              chips
              deletable-chips
              label="Choose read time"
              :rules="selectRules"
              required
              rounded
            >
              <template v-slot:prepend-item></template>
            </v-select>

            <div class="d-flex justify-center align-center">
              <v-btn
                outlined
                :loading="loading"
                :disabled="!valid"
                color="info"
                @click="update"
                rounded
                >Update</v-btn
              >
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { rules } from "@/mixins/rules.js";
import { editPostUpload } from "@/mixins/uploadImg.js";
import { sanitizeEditPost } from "@/mixins/contentSanitize.js";
import { VueEditor } from "vue2-editor";
import store from "@/store/index.js";
export default {
  mixins: [rules, editPostUpload, sanitizeEditPost],
  components: {
    "vue-editor": VueEditor,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    valid: true,
    rawFile: null,
    local_imageUrl: null,
    imageUrl: null,
    upload: false,
    upload_btn: false,
    choose_btn: true,
    loading: false,
  }),
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      categories: (state) => state.user.categories,
    }),
    getImageUrl() {
      return this.local_imageUrl ? this.local_imageUrl : this.post.image;
    },
    createReadTime() {
      let readTime = [];
      for (let x = 1; x <= 61; x++) {
        if (x <= 60) {
          if (x == 1) {
            readTime.push(`${x} min`);
          } else {
            readTime.push(`${x} mins`);
          }
        } else {
          readTime.push(`more than ${x - 1} mins`);
        }
      }
      return readTime;
    },
    formattedDate() {
      return new Date().toLocaleString(["en-US"], {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    },
  },
  methods: {
    update() {
      console.log("post", this.post);
      console.log("uid", this.post.author.uid);
      console.log("user", this.user.uid);
      const post = {
        title: this.post.title,
        description: this.post.description,
        author: this.post.author,
        content: this.post.content,
        image: this.post.image,
        date: this.formattedDate,
        uid: this.user.uid,
        likes: this.post.likes,
        likesNo: this.post.likesNo,
        readTime: this.post.readTime,
        tags: this.post.tags,
      };
      console.log("s post", post);
      this.$refs.form.validate();
      if (this.valid) {
        this.loading = true;

        store
          .dispatch("posts/updatePost", {
            postid: this.post.postid,
            post: post,
          })
          .then((res) => {
            console.log(res);
            this.loading = false;
            this.$router.push({ name: "postshow", params: { id: res.postid } });
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
          });
      }
    },

    toggle() {
      this.$nextTick(() => {
        if (this.likesAllFruit) {
          this.selectedFruits = [];
        } else {
          this.selectedFruits = this.fruits.slice();
        }
      });
    },
  },
};
</script>
