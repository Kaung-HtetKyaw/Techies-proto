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
              rounded
              required
            ></v-text-field>
            <v-textarea
              label="Overview for your posts"
              v-model="description"
              :rules="textRules"
              rounded
              auto-grow
              class
            ></v-textarea>

            <div class="mb-6">
              <v-btn
                v-if="!imageUrl"
                outlined
                color="info"
                rounded
                required
                @click="onPickFile"
              >Choose a file</v-btn>
              <input
                type="file"
                class="d-none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
              />
              <v-img v-if="local_imageUrl" :src="local_imageUrl" width="300px" class="my-4"></v-img>
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
            <v-textarea
              v-model="content"
              label="Write the details here"
              :rules="textRules"
              rounded
              auto-grow
              class="p-0"
            ></v-textarea>
            <v-select
              v-model="tags"
              :items="categories"
              chips
              deletable-chips
              label="Choose tags"
              multiple
              :rules="selectRules"
              required
              rounded
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
              rounded
            >
              <template v-slot:prepend-item></template>
            </v-select>

            <div class="d-flex justify-center align-center">
              <v-btn outlined :disabled="!valid" color="info" @click="create" rounded>Validate</v-btn>
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
import store from "@/store/index.js";
import firebase from "firebase/app";
import "firebase/firestore";
export default {
  mixins: [rules],

  data: () => ({
    valid: true,
    title: "",

    description: "",
    content: "",
    select: null,

    tags: null,
    checkbox: false,
    rawFile: null,
    local_imageUrl: null,
    imageUrl: null,
    readTime: null,
    upload: false,
    upload_btn: false
  }),
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
        author: this.user,
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
      if (this.valid) {
        this.loading = true;

        store
          .dispatch("posts/createPost", post)
          .then(res => {
            console.log(res);
            this.loading = false;
            this.$router.push({ name: "postshow", params: { id: res.postid } });
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
      }
    },

    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      if (event.target.files[0]) {
        const file = event.target.files[0];
        this.rawFile = file;
        let filename = file.name;
        if (filename.lastIndexOf(".") <= 0) {
          return alert("Shit");
        }
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.local_imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(file);
        this.upload_btn = true;
      }
    },
    uploadFile() {
      const filename = this.rawFile;
      this.upload = true;
      const key = Math.floor(Math.random() * 199054289);
      const ext = filename.name.slice(filename.name.lastIndexOf("."));

      const storageRef = firebase
        .storage()
        .ref("posts/" + key + ext)
        .put(filename);

      storageRef.on(
        "state_changed",
        function() {},
        function() {
          // Handle unsuccessful uploads
        },
        () => {
          storageRef.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.imageUrl = downloadURL;
            this.upload = false;
            this.upload_btn = false;
          });
        }
      );
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