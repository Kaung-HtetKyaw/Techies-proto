<template>
  <div class="home">
    <v-container>
      <v-row dense>
        <v-col cols="12" sm="12" md="6" class="d-flex flex-column justify-center align-center">
          <h1 class="serif my-6 text-center text-md-left">All that matters to you at your fingertips</h1>
          <div>
            <v-chip
              v-for="(category,i) in categories"
              color="info"
              :key="i"
              class="ma-2"
              outlined
            >#{{category}}</v-chip>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="6" class="d-none d-md-flex">
          <v-img src="@/assets/home_hero.png"></v-img>
        </v-col>
      </v-row>

      <v-row dense class="py-0">
        <v-col cols="12" sm="12">
          <GoogleSignIn />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import GoogleSignIn from "@/components/GoogleSignBtn.vue";
export default {
  name: "Home",
  components: {
    GoogleSignIn
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapState({
      categories: state => state.user.categories
    })
  }
};
</script>
<style scoped>
.serif {
  font-family: serif;
}
</style>