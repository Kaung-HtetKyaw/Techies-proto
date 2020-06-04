<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12" md="6" offset-md="3">
          <v-card :loading="loading">
            <v-card-title class="primary lighten-1 white--text text-center"
              >Update Profile</v-card-title
            >
            <v-card-text class="mt-6">
              <v-form
                ref="form"
                class="px-2"
                v-model="valid"
                @submit="validate"
                @enter="validate"
              >
                <v-text-field
                  type="text"
                  v-model="user.displayName"
                  :counter="20"
                  :rules="nameRules"
                  label="Name"
                  outlined
                  required
                ></v-text-field>

                <v-textarea
                  counter="200"
                  v-model="user.bio"
                  label="Describe yourself"
                  :rules="bioRules"
                  outlined
                  auto-grow
                  class="p-0"
                ></v-textarea>
                <v-select
                  v-model="user.tags"
                  :items="categories"
                  chips
                  deletable-chips
                  label="Select Your interest"
                  multiple
                  :rules="selectRules"
                  required
                  outlined
                >
                  <template v-slot:prepend-item></template>
                </v-select>
                <div class="mb-6">
                  <v-btn
                    v-if="choose_btn"
                    outlined
                    color="info"
                    rounded
                    required
                    @click="onPickFile"
                    >Choose Profile Photo</v-btn
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
                    width="150px"
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

                <div class="d-flex justify-end">
                  <v-btn
                    outlined
                    :loading="loading"
                    :disabled="!valid"
                    color="info"
                    @click="validate"
                    rounded
                    >Update Profile</v-btn
                  >
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { rules } from "@/mixins/rules.js";
import { updateProfileUpload } from "@/mixins/uploadImg.js";
import store from "@/store/index.js";

export default {
  mixins: [rules, updateProfileUpload],
  data: () => ({
    valid: true,
    tags: null,
    bio: "",
    displayName: "",
    rawFile: null,
    local_imageUrl: null,
    imageUrl: null,
    upload_btn: false,
    choose_btn: true,
    upload: false,
    upload_finish: false,
    loading: false
  }),
  computed: {
    ...mapState({
      categories: state => state.user.categories,
      user: state => state.user.user
    }),
    getImageUrl() {
      return this.local_imageUrl ? this.local_imageUrl : this.user.photoURL;
    }
  },

  methods: {
    validate() {
      this.$refs.form.validate();

      const user = {
        email: this.user.email,
        displayName: this.user.displayName,
        photoURL: this.user.photoURL,
        tags: this.user.tags,
        bio: this.user.bio,
        uid: this.user.uid,
        joined: this.user.joined,
        readingLists: this.user.readingLists,
        isNewUser: false
      };

      if (this.valid) {
        this.loading = true;
        store
          .dispatch("user/updateProfile", user)
          .then(() => {
            store.dispatch("posts/fetchUserPosts", user.uid).then(users => {
              if (users.posts.length > 0) {
                users.posts.forEach(post => {
                  post.author = user;
                  store
                    .dispatch("posts/updatePost", {
                      postid: post.postid,
                      post: post
                    })
                    .then(() => {
                      this.loading = false;
                      this.$router.push({
                        name: "user",
                        params: { id: this.user.uid }
                      });
                    });
                });
              } else {
                this.loading = false;
                this.$router.push({
                  name: "user",
                  params: { id: this.user.uid }
                });
              }
            });
          })
          .catch(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>
