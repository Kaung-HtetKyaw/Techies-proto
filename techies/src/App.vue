<template>
  <v-app>
    <nav>
      <TheNav />
    </nav>

    <v-content class="mt-n2">
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
    <footer>
      <Footer />
      <NotiContainer />
    </footer>
  </v-app>
</template>

<script>
import TheNav from "@/components/TheNav.vue";
import Footer from "@/components/Footer.vue";
import NotiContainer from "@/components/NotificationContainer.vue";
import userServices from "@/services/userAuth.js";
import store from "@/store/index.js";
export default {
  name: "App",

  components: {
    TheNav,
    Footer,
    NotiContainer,
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
          joined: currentUser.metadata.creationTime,
        })
        .then((res) => {
         
          this.$router.push({ name: "postsfeed" });
        });
    }
  },
};
</script>
<style>
@import "style/WYSIWYG.css";
.router-link {
  text-decoration: none;
  color: initial;
}
.opacity7 {
  opacity: 0.7;
}
.opacity9 {
  opacity: 0.9;
}
</style>
