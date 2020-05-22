import store from "@/store/index.js";
export const signOut = {
  methods: {
    signOut() {
      store
        .dispatch("user/signOut")
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch((error) => [console.log(error)]);
    },
  },
};
