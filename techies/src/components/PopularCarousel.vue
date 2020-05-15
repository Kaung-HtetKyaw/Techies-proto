<template>
  <div>
    <h2 class="my-4">Popular on Techies</h2>
    <v-divider></v-divider>
    <v-carousel cycle height="200" hide-delimiters hide-delimiter-background show-arrows-on-hover>
      <v-carousel-item v-for="(post, i) in posts" :key="post.postid">
        <v-container>
          <v-row dense class="d-flex justify-center align-center carousel-height">
            <v-col cols="12" sm="2" class="d-flex justify-center align-center">
              <h2 class="post-no font-weight-bold">0{{i+1}}</h2>
            </v-col>
            <router-link :to="{name:'postshow',params:{id:post.postid}}" class="router-link">
              <v-col cols="12" sm="10" class="black--text">
                <h2 class="headline font-weight-bold my-2 opacity-7">{{post.title}}</h2>
                <h5 class="body-2 font-weight-medium opacity-7">{{post.author.displayName}}</h5>
                <div>
                  <span class="body-2 font-weight-medium opacity-7">{{post.date}}</span>
                  <span class="mx-1">|</span>
                  <span class="body-2 font-weight-medium opacity-7">{{post.readTime}}</span>
                </div>
              </v-col>
            </router-link>
          </v-row>
        </v-container>
      </v-carousel-item>
    </v-carousel>
    <v-divider class="my-4"></v-divider>
  </div>
</template>

<script>
export default {
  props: {
    posts: { type: Array, required: true }
  }
};
</script>
<style scoped>
.carousel-height {
  height: 200px;
}
.post-no {
  font-family: serif;
  font-size: 50px;

  opacity: 0.5;
}
.opacity-7 {
  opacity: 0.7;
}
</style>