<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12" md="6">
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="12">
                <div>
                  <h2 class="title">Most Popular on Techies</h2>
                  <v-divider class="my-2"></v-divider>
                </div>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" sm="12">
                <v-img :src="mostPopularPost.image"></v-img>
              </v-col>
              <v-col cols="12" sm="12">
                <router-link
                  :to="{name:'postshow',params:{id:mostPopularPost.postid}}"
                  class="router-link"
                >
                  <div class="my-2">
                    <h3 class="title font-weight-medium black--text">{{mostPopularPost.title}}</h3>
                  </div>
                  <div class="subtitle-2 black--text mt-2 opacity7">
                    <p>{{mostPopularPost.description}}</p>
                  </div>
                </router-link>

                <router-link
                  :to="{name:'user',params:{id:mostPopularPost.author.uid}}"
                  class="router-link"
                >
                  <div class="subtitle-2 black--text mt-2 opacity9">
                    <p class="my-0">{{mostPopularPost.author.displayName}}</p>
                  </div>
                </router-link>

                <div class="caption opacity7 my-2">
                  <span>{{mostPopularPost.date}}</span>
                  <span class="mx-1">|</span>
                  <span>{{mostPopularPost.readTime}} read</span>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="12">
                <h2 class="title">Popular posts</h2>
                <v-divider class="my-2"></v-divider>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" sm="12" v-for="post in posts" :key="post.postid">
                <v-container>
                  <v-row dense>
                    <v-col cols="12" sm="5">
                      <v-img :src="post.image"></v-img>
                    </v-col>
                    <v-col cols="12" sm="7" class="px-4">
                      <router-link
                        :to="{name:'postshow',params:{id:post.postid}}"
                        class="router-link"
                      >
                        <div class="my-2 body-2 black--text">
                          <h3>{{post.title}}</h3>
                        </div>
                      </router-link>
                      <router-link
                        :to="{name:'user',params:{id:post.author.uid}}"
                        class="router-link"
                      >
                        <div class="subtitle-2 black--text mt-2 opacity9">
                          <p class="my-0">{{post.author.displayName}}</p>
                        </div>
                      </router-link>

                      <div class="caption opacity7 my-2">
                        <span>{{post.date}}</span>
                        <span class="mx-1">|</span>
                        <span>{{post.readTime}} read</span>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  created() {
    //*format title
    this.posts.forEach(post => {
      const title = post.title.split(" ");
      const formatted_title = post.title
        .split(" ")
        .slice(0, 5)
        .join(" ");
      title.length > 5
        ? (post.title = formatted_title + "....")
        : (post.title = formatted_title);
      //*format description
      const desp = post.description.split(" ");
      const formatted_desp = post.description
        .split(" ")
        .slice(0, 10)
        .join(" ");
      desp.length > 10
        ? (post.description = formatted_desp + "....")
        : (post.description = formatted_desp);
    });
    //*format description

    console.log("posts", this.posts);
  },
  computed: {
    mostPopularPost() {
      return this.posts[0];
    }
  }
};
</script>

<style>
</style>