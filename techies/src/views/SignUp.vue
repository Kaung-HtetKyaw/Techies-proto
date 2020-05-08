<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12" md="6" offset-md="3">
          <v-card>
            <v-card-title class="primary lighten-1 white--text text-center">Sign Up</v-card-title>
            <v-card-text class="mt-6">
              <v-form ref="form" class="px-2" v-model="valid" lazy-validation>
                <v-text-field outlined v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field
                  type="password"
                  v-model="password"
                  :counter="10"
                  :rules="nameRules"
                  label="Password"
                  outlined
                  required
                ></v-text-field>
                <div class="mb-6">
                  <v-btn outlined color="info" rounded required @click="onPickFile">Choose a file</v-btn>
                  <input
                    type="file"
                    class="d-none"
                    ref="fileInput"
                    accept="image/*"
                    @change="onFilePicked"
                  />
                  <v-img v-if="local_imageUrl" :src="local_imageUrl" width="150px" class="my-4"></v-img>
                </div>

                <v-select
                  v-model="select"
                  :items="items"
                  :rules="selectRules"
                  label="Item"
                  required
                  outlined
                ></v-select>

                <v-checkbox
                  outlined
                  v-model="checkbox"
                  :rules="checkRules"
                  label="Do you agree?"
                  required
                ></v-checkbox>
                <div class="d-flex justify-end">
                  <v-btn outlined :disabled="!valid" color="info" @click="validate" rounded>Validate</v-btn>
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
export default {
  mixins: [rules],
  data: () => ({
    valid: true,
    password: "",

    email: "",

    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    rawFile: null,
    local_imageUrl: null,
    imageUrl: null
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
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
      }
    }
  }
};
</script>