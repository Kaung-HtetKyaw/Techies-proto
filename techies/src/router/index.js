import Vue from "vue";
import VueRouter from "vue-router";
import PostsFeed from "../views/PostsFeed.vue";
import SigIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "postsfeed",
    component: PostsFeed,
  },
  {
    path: "/login",
    name: "login",
    component: SigIn,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
