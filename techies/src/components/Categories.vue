<template>
  <div>
    <v-divider class="my-2"></v-divider>
    <v-list-group
      v-for="item in items"
      :key="item.title"
      v-model="item.active"
      prepend-icon="mdi-form-dropdown"
      no-action
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>Categories</v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item @click="fetchAllPosts">
        <v-list-item-content>
          <v-list-item-title>All Posts</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="(subItem,i) in item.items" :key="i" @click="fetchTagPost(subItem)">
        <v-list-item-content>
          <v-list-item-title>{{subItem}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
    <div>
      <v-dialog v-model="dialog" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Please stand by
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <div v-if="!!posts">
      <v-dialog v-model="noPostDialog" persistent max-width="290">
        <v-card width="300px" class="p-4">
          <v-card-title class="headline pt-4 pb-0">
            <v-container>
              <v-row dense class="d-flex justify-center my-2">
                <v-icon size="40" color="orange">mdi-emoticon-sad</v-icon>
              </v-row>
              <v-row dense class="d-flex justify-center my-2">
                <h1 class="title text-center orange--text">
                  <div>No posts for</div>
                  <div>{{selectedCategory}}</div>
                </h1>
              </v-row>
            </v-container>
          </v-card-title>

          <v-card-actions class="background p-4">
            <v-container>
              <v-row dense class="d-flex justify-center">
                <v-btn outlined elevation="0" text color=" orange" @click="noPostDialog = false">
                  <span class="opacity9">Close</span>
                </v-btn>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import store from "@/store/index.js";
export default {
  data() {
    return {
      dialog: false,
      selectedCategory: "",
      noPostDialog: false,
      posts: [],
      items: [
        {
          items: [
            "Future",
            "Technology",
            "Health",
            "Science",
            "Business",
            "Work",
            "Culture",
            "Beauty",
            "Food",
            "Programming",
            "Design",
            "Politics",
            "Relationships",
            "Startups",
            "Crytocurrency",
            "Data Science",
            "Productivity",
            "Artificial Intelligence",
            "Religions",
            "Culture",
            "Other"
          ]
        }
      ]
    };
  },
  methods: {
    fetchTagPost(tag) {
      this.dialog = true;
      this.selectedCategory = tag;
      store.dispatch("posts/fetchTagPosts", tag).then(posts => {
        this.posts = posts;
        posts.length > 0
          ? (this.noPostDialog = false)
          : (this.noPostDialog = true);
        this.dialog = false;
      });
    },
    fetchAllPosts() {
      this.dialog = true;
      store.dispatch("posts/fetchPosts").then(posts => {
        this.posts = posts;
        posts.length > 0
          ? (this.noPostDialog = false)
          : (this.noPostDialog = true);
        this.dialog = false;
      });
    }
  }
};
</script>