<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              type="text"
              v-model="title"
              :counter="80"
              :rules="titleRules"
              label="Title"
              required
            ></v-text-field>
            <v-textarea
              label="Overview for your posts"
              v-model="description"
              :rules="textRules"
              auto-grow
              class
            ></v-textarea>

            <div class="my-6">
              <v-btn
                v-if="!imageUrl"
                outlined
                color="info"
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
                v-if="local_imageUrl"
                :src="local_imageUrl"
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
                v-model="content"
                :editorToolbar="customToolbar"
              ></vue-editor>
            </div>
            <v-select
              v-model="tags"
              :items="categories"
              chips
              deletable-chips
              label="Choose tags"
              multiple
              :rules="postCatRules"
              required
            >
              <template v-slot:prepend-item></template>
            </v-select>
            <v-select
              v-model="readTime"
              :items="createReadTime"
              chips
              deletable-chips
              label="Choose read time"
              :rules="selectRules"
              required
            >
              <template v-slot:prepend-item></template>
            </v-select>

            <div class="d-flex justify-center align-center">
              <v-btn
                outlined
                :loading="loading"
                :disabled="!valid"
                color="info"
                @click="create"
                rounded
                >Validate</v-btn
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
import { createPostUpoad } from "@/mixins/uploadImg.js";
import { sanitizeCreatePost } from "@/mixins/contentSanitize.js";
import store from "@/store/index.js";
import { VueEditor } from "vue2-editor";
export default {
  mixins: [rules, createPostUpoad, sanitizeCreatePost],
  components: {
    "vue-editor": VueEditor
  },
  data: () => ({
    valid: true,
    title: "",

    description: "",
    content: "",
    select: null,
    loading: false,
    tags: null,
    checkbox: false,
    rawFile: null,
    local_imageUrl: null,
    imageUrl: null,
    readTime: null,
    upload: false,
    upload_btn: false
  }),
  mounted() {},
  computed: {
    ...mapState({
      user: state => state.user.user,
      categories: state => state.user.categories
    }),
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
        year: "numeric"
      });
    }
  },
  methods: {
    create() {
      const post = {
        title: this.title,
        description: this.description,
        author: { ...this.user },
        content: this.content,
        image: this.imageUrl,
        date: this.formattedDate,
        uid: this.user.uid,
        likes: [],
        likesNo: 0,
        readTime: this.readTime,
        tags: this.tags
      };

      this.$refs.form.validate();
      if (this.valid && this.content !== "") {
        this.loading = true;

        store
          .dispatch("posts/createPost", post)
          .then(res => {
            this.loading = false;
            this.$router.push({ name: "postshow", params: { id: res.postid } });
          })
          .catch(() => {
            this.loading = false;
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
    }
  }
};
</script>
