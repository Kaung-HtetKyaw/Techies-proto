import Vue from "vue";
import Vuex from "vuex";
import * as posts from "@/store/modules/posts.js";
import * as user from "@/store/modules/user.js";
import * as notification from "@/store/modules/notification.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: { posts, user, notification },
});
