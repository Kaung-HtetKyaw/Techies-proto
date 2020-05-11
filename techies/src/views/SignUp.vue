<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12" md="6" offset-md="3">
          <v-card>
            <v-card-title class="primary lighten-1 white--text text-center">Sign Up</v-card-title>
            <v-card-text class="mt-6">
              <v-form ref="form" class="px-2" v-model="valid" @submit="validate" @enter="validate">
                <v-text-field outlined v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field
                  type="text"
                  v-model="displayName"
                  :counter="20"
                  :rules="nameRules"
                  label="Name"
                  outlined
                  required
                ></v-text-field>
                <v-text-field
                  type="password"
                  v-model="password"
                  :counter="20"
                  :rules="passwordRules"
                  label="Password"
                  outlined
                  required
                ></v-text-field>
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
                  <v-img v-if="local_imageUrl" :src="local_imageUrl" width="150px" class="my-4"></v-img>
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
                  >Validate</v-btn>
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
import { rules } from "@/mixins/rules.js";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import store from "@/store/index.js";

export default {
  mixins: [rules],
  data: () => ({
    valid: true,
    password: "",

    email: "",
    displayName: "",

    rawFile: null,
    local_imageUrl: null,
    imageUrl: null,
    upload_btn: false,
    upload: false,
    upload_finish: false,
    loading: false
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
      const user = {
        email: this.email,
        displayName: this.displayName,
        password: this.password,
        photoURL: this.imageUrl
      };

      if (this.valid) {
        this.loading = true;
        store
          .dispatch("user/signUp", user)
          .then(res => {
            console.log(res);
            this.loading = false;
            this.$router.push({ name: "postsfeed" });
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
        } else {
          const fileReader = new FileReader();
          fileReader.addEventListener("load", () => {
            this.local_imageUrl = fileReader.result;
          });
          fileReader.readAsDataURL(file);
          this.upload_btn = true;
        }
      }
    },
    uploadFile() {
      const filename = this.rawFile;
      this.upload = true;
      const key = Math.floor(Math.random() * 199054289);
      const ext = filename.name.slice(filename.name.lastIndexOf("."));

      const storageRef = firebase
        .storage()
        .ref("users/" + key + ext)
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
            this.upload_finish = true;
          });
        }
      );
    }
  }
};
</script>