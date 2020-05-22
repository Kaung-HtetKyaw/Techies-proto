const sanitizeHtml = require("sanitize-html");
export const sanitizeCreatePost = {
  computed: {
    sanitize() {
      return sanitizeHtml(this.content, {
        allowedTags: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "blockquote",
          "p",
          "a",
          "ul",
          "ol",
          "nl",
          "li",
          "b",
          "i",
          "strong",
          "em",
          "s",
          "strike",
          "abbr",
          "code",
          "hr",
          "br",
          "div",
          "pre",
        ],
        allowedAttributes: {
          a: ["href", "rel"],
          pre: ["class", "spellcheck"],
          blockquote: ["class"],
        },
        allowedIframeHostnames: ["www.youtube.com"],
      });
    },
  },

  data() {
    return {
      customToolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
      ],
    };
  },
};

export const sanitizeEditPost = {
  computed: {
    sanitize() {
      return sanitizeHtml(this.post.content, {
        allowedTags: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "blockquote",
          "p",
          "a",
          "ul",
          "ol",
          "nl",
          "li",
          "b",
          "i",
          "strong",
          "em",
          "s",
          "strike",
          "abbr",
          "code",
          "hr",
          "br",
          "div",
          "pre",
        ],
        allowedAttributes: {
          a: ["href", "rel"],
          pre: ["class", "spellcheck"],
          blockquote: ["class"],
        },
        allowedIframeHostnames: ["www.youtube.com"],
      });
    },
  },

  data() {
    return {
      customToolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
      ],
    };
  },
};
