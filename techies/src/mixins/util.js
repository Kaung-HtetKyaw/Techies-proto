export const formattedDate = {
  computed: {
    formattedDate() {
      return new Date().toLocaleString(["en-US"], {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    },
  },
};
