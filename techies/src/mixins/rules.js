export const rules = {
  data() {
    return {
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length <= 20) || "Password must be less than 20 characters",
      ],
      selectRules: [(v) => !!v || "Item is required"],
      checkRules: [(v) => !!v || "You must agree to continue!"],
      titleRules: [
        (v) => !!v || "Title is required",
        (v) => (v && v.length <= 80) || "Title must be less than 80 characters",
      ],
      textRules: [(v) => !!v || "This field is required"],
      fileRules: [(v) => !!v || "Please choose a thumbnail for your post"],
    };
  },
};
