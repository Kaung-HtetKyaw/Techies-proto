<template>
  <div>
    <div>
      <vue-editor
        required
        v-model="content"
        :editorToolbar="customToolbar"
      ></vue-editor>
    </div>
    <div v-html="sanitize"></div>
  </div>
</template>

<script>
const sanitizeHtml = require("sanitize-html");
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },
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
          "pre"
        ],
        allowedAttributes: {
          a: ["href", "rel"],
          pre: ["class", "spellcheck"],
          blockquote: ["class"]
        },
        allowedIframeHostnames: ["www.youtube.com"]
      });
    }
  },

  data() {
    return {
      customToolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"]
      ]
    };
  }
};
</script>
<style></style>
