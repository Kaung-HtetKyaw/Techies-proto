<template>
  <v-app>
    <nav>
      <TheNav />
    </nav>

    <v-content class="my-6">
      <router-view></router-view>
    </v-content>
    <footer>
      <Footer />
    </footer>
  </v-app>
</template>

<script>
import TheNav from "@/components/TheNav.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "App",

  components: {
    TheNav,
    Footer
  },

  data: () => ({
    //
  })
};
</script>
<style >
.router-link {
  text-decoration: none;
  color: initial;
}
</style>
