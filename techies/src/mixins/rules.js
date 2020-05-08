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
      selectRules: [(v) => !!v || "Item is required"],
      checkRules: [(v) => !!v || "You must agree to continue!"],
    };
  },
};
