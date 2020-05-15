import Vue from "vue";
import Vuex from "vuex";
import * as posts from "@/store/modules/posts.js";
import * as user from "@/store/modules/user.js";
import * as notification from "@/store/modules/notification.js";
import * as comment from "@/store/modules/comment.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: { nav_color: "primary lighten-1" },
  mutations: {},
  actions: {},
  getters: {},
  modules: { posts, user, notification, comment },
});
