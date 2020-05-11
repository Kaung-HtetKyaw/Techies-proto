<template>
  <div class="my-6">
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12" md="8" offset-md="2">
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="12">
                <v-img :src="post.image" :alt="post.title"></v-img>
              </v-col>
            </v-row>
            <v-row dense class="my-4">
              <v-col cols="12" sm="12">
                <h1 class="font-weight-bold header">{{post.title}}</h1>
              </v-col>
            </v-row>
            <v-row dense class="my-4">
              <v-col
                cols="12"
                sm="12"
                md="8"
                class="d-flex justify-sm-start justify-md-center align-center"
              >
                <v-container class="py-0">
                  <v-row dense class="d-flex flex-row align-center">
                    <v-list-item class="grow px-0">
                      <v-list-item-avatar color="grey darken-3">
                        <v-img :src="post.author.photoURL"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title
                          class="subtitle-1 font-weight-medium"
                        >{{post.author.displayName}}</v-list-item-title>
                        <v-list-item-title>
                          <div class="opacity7">
                            <span class="body-2">{{post.date}}</span>
                            <span class="mx-1">|</span>
                            <span class="body-2">{{post.readTime}} read</span>
                          </div>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-row>
                </v-container>
              </v-col>

              <v-col
                cols="12"
                sm="12"
                md="4"
                class="d-flex flex-row justify-sm-start justify-md-end align-center"
              >
                <div>
                  <v-btn icon color="pink">
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <span class="subheading mr-2">{{post.likes}}</span>
                </div>

                <div>
                  <v-btn icon color="info">
                    <v-icon>mdi-bookmark-outline</v-icon>
                  </v-btn>
                  <span class="subheading">45</span>
                </div>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" sm="12">
                <p
                  class="subtitle-1 my-4"
                  v-for="(content,i) in formattedContent"
                  :key="i"
                >{{content}}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    formattedContent() {
      return this.post.content.split("\n");
    }
  }
};
</script>


<style scoped>
.opacity7 {
  opacity: 0.7;
}
.opacity9 {
  opacity: 0.9;
}
.header {
  font-family: serif;
}
</style>