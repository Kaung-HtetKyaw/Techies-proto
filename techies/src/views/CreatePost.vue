<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              type="text"
              v-model="password"
              :counter="80"
              :rules="titleRules"
              label="Title"
              rounded
              required
            ></v-text-field>
            <v-textarea label="Overview for your posts" :rules="textRules" rounded auto-grow class></v-textarea>

            <div class="my-6 pl-6">
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
            <v-textarea
              label="Write the details here"
              :rules="textRules"
              rounded
              auto-grow
              class="p-0"
            ></v-textarea>
            <v-select
              v-model="tags"
              :items="items"
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
              <v-btn outlined :disabled="!valid" color="info" @click="validate" rounded>Validate</v-btn>
            </div>
          </v-form>
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
    tags: null,
    checkbox: false,
    rawFile: null,
    local_imageUrl: null,
    imageUrl: null,
    readTime: null
  }),
  computed: {
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
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
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