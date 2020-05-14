<template>
  <div class="my-6">
    <v-card class="mx-auto" elevation="0" color="#fff py-0">
      <v-card-text class="px-0 py-0">
        <v-container fluid>
          <v-row dense class="d-flex flex-column-reverse flex-md-row">
            <h3 class="body-1 black--text">{{comment.message}}</h3>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="py-0">
        <v-container class="py-0 px-0">
          <v-row dense class="d-flex">
            <v-col cols="12" sm="12" class="justify-center align-center">
              <v-container class="py-0">
                <v-row dense class="d-flex flex-row align-center justify-space-between">
                  <span>
                    <router-link
                      :to="{name:'user',params:{id:comment.author.uid}}"
                      class="router-link"
                    >
                      <v-list-item class="grow px-0">
                        <v-list-item-avatar color="grey darken-3">
                          <v-img :src="comment.author.photoURL"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            class="subtitle-1 font-weight-medium"
                          >{{comment.author.displayName}}</v-list-item-title>
                          <v-list-item-title
                            class="caption font-weight-light opacity7"
                          >{{comment.date}}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </router-link>
                  </span>
                  <span>
                    <div>
                      <v-btn icon color="pink">
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <span class="subheading mr-2">{{comment.likes.length}}</span>
                    </div>
                  </span>
                </v-row>
              </v-container>
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
    comment: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log("comment", this.comment);
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