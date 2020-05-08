<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" sm="12" md="8" offset-md="2">
        <Carousel class="d-none d-md-flex flex-column" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="12" md="8" offset-md="2">
        <PostCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
import Carousel from "@/components/PopularCarousel.vue";
export default {
  components: {
    PostCard,
    Carousel
  }
};
</script>

<style>
</style>