<template>
  <div class="my-6">
    <v-card class="mx-auto" elevation="0" color="#fff py-0">
      <v-card-title class="py-0 px-0">
        <h5 class="headline">Popular on Techies</h5>
      </v-card-title>

      <v-divider class="my-2"></v-divider>

      <v-card-text class="px-0 py-0">
        <v-container fluid>
          <v-row
            v-for="(post,index) in posts"
            :key="post.postid"
            dense
            class="d-flex flex-row py-0"
          >
            <v-col cols="12" sm="3" class="my-1">
              <p class="display-1 opacity9">0{{index+1}}</p>
            </v-col>
            <v-col cols="12" sm="9">
              <h5 class="title font-weight-medium black--text">{{post.title}}</h5>
              <h5 class="body-2 black--text font-weight-light py-2">{{post.author.displayName}}</h5>
              <div class="caption">
                <span class="px-1">{{post.date}}</span>
                <span>|</span>
                <span class="px-1">{{post.readTime}} read</span>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
  //   computed: {
  //     ...mapState({
  //       user: state => state.user.user
  //     }),
  //     formattedDescription() {
  //       const desp = this.post.description.split(" ");
  //       const formatted_desp = this.post.description
  //         .split(" ")
  //         .slice(0, 50)
  //         .join(" ");
  //       return desp.length > 50 ? formatted_desp + "...." : formatted_desp;
  //     }
  //   }
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