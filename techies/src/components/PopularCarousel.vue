<template>
  <div>
    <h2 class="my-4">Popular on Techies</h2>
    <v-divider></v-divider>
    <v-carousel cycle height="200" hide-delimiters hide-delimiter-background show-arrows-on-hover>
      <v-carousel-item v-for="(post, i) in posts" :key="i" class>
        <v-container>
          <v-row dense class="d-flex justify-center align-center carousel-height">
            <v-col cols="12" sm="2" class="d-flex justify-center align-center">
              <h2 class="display-3 post-no font-weight-bold">{{i+1}}</h2>
            </v-col>
            <v-col cols="12" sm="10">
              <h2 class="headline font-weight-bold my-2 opacity-7">{{post.title}}</h2>
              <h5 class="body-2 font-weight-medium opacity-7">{{post.author.displayName}}</h5>
              <div>
                <span class="body-2 font-weight-medium opacity-7">{{post.date}}</span>
                <span class="mx-1">|</span>
                <span class="body-2 font-weight-medium opacity-7">{{post.readTime}}</span>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-carousel-item>
    </v-carousel>
    <v-divider class="my-4"></v-divider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
      posts: [
        {
          author: {
            displayName: "Evan You",
            photoUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
            uid: "laslUILjdasflj899h998h9"
          },
          title: "Vue Composition API",
          description:
            "With the cycle prop you can have your slides automatically transition to the next available every 6s (default).",
          content:
            "With the cycle prop you can have your slides automatically transition to the next available every 6s (default).",
          image: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
          likes: [],
          date: "Apr 30,2020",
          readTime: "3 mins",
          tags: ["Science"],
          uid: "laslUILjdasflj899h998h9"
        },
        {
          author: {
            displayName: "BD_Notail",
            photoUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
            uid: "laslUILjdasflj899h998h9"
          },
          title: "Why Current 7.24 patch is horrible ",
          description:
            "With the cycle prop you can have your slides automatically transition to the next available every 6s (default).",
          content:
            "With the cycle prop you can have your slides automatically transition to the next available every 6s (default).",
          image: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
          likes: [],
          date: "Apr 30,2020",
          readTime: "3 mins",
          tags: ["Science"],
          uid: "laslUILjdasflj899h998h9"
        }
      ]
    };
  }
};
</script>
<style scoped>
.carousel-height {
  height: 200px;
}
.post-no {
  font-family: Arial, Helvetica, sans-serif;

  opacity: 0.5;
}
.opacity-7 {
  opacity: 0.7;
}
</style>