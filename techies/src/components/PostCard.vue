<template>
  <div class="my-6">
    <v-card class="mx-auto" elevation="0" color="#fff py-0">
      <v-card-title class="py-0 px-0">
        <v-chip v-for="tag in post.tags" :key="tag" class="ma-2" outlined>#{{tag}}</v-chip>
      </v-card-title>

      <v-card-text class="px-0 py-0">
        <v-container fluid>
          <v-row dense class="d-flex flex-column-reverse flex-md-row">
            <v-col cols="12" sm="12" md="9" class="my-1">
              <router-link :to="{name:'postshow',params:{id:post.postid}}" class="router-link">
                <h2 class="headline font-weight-medium black--text mb-4 serif">{{post.title}}</h2>
                <h3
                  class="subtitle-1 black--text font-weight-medium mt-2 opacity7"
                >{{post.description}}</h3>
              </router-link>
            </v-col>
            <v-col cols="12" sm="12" md="3" class="d-flex justify-center align-center my-1">
              <v-img contain :src="post.image"></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="py-0">
        <v-container class="py-0 px-0">
          <v-row dense class="d-flex">
            <v-col cols="12" sm="12" md="7" class="justify-center align-center">
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
              md="5"
              class="d-flex justify-sm-start justify-md-end align-center"
            >
              <div>
                <v-btn icon color="pink">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <span class="subheading mr-2">256</span>
              </div>

              <div>
                <v-btn icon color="info">
                  <v-icon>mdi-bookmark-outline</v-icon>
                </v-btn>
                <span class="subheading">45</span>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
    <v-divider class="my-2"></v-divider>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
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
.serif {
  font-family: serif !important;
}
</style>