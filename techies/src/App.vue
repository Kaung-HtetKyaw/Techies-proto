<template>
  <v-app>
    <nav>
      <TheNav />
    </nav>

    <v-content>
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
import userServices from "@/services/userAuth.js";
import store from "@/store/index.js";
export default {
  name: "App",

  components: {
    TheNav,
    Footer
  },

  data: () => ({
    //
  }),
  created() {
    //* check user auth state
    const currentUser = userServices.currentUser();
    //* if currentUser available
    //*commit is to the local store and redirect route
    if (currentUser) {
      store
        .dispatch("user/checkInitialUser", {
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          uid: currentUser.uid,
          joined: currentUser.metadata.creationTime
        })
        .then(() => {
          this.$router.push({ name: "postsfeed" });
        });
    }
  }
};
</script>
<style >
.router-link {
  text-decoration: none;
  color: initial;
}
</style>
