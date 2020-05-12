import Vue from "vue";
import VueRouter from "vue-router";
import PostsFeed from "../views/PostsFeed.vue";
import SigIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import CreatePost from "@/views/CreatePost.vue";
import PostShow from "@/views/PostShow.vue";
import EditPost from "@/views/EditPost.vue";
import User from "@/views/User.vue";
import NProgress from "nprogress";
import store from "@/store/index.js";

import "firebase/firestore";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "postsfeed",
    component: PostsFeed,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: SigIn,
    beforeEnter(to, from, next) {
      if (store.state.user.user) {
        next({ name: "postsfeed" });
      } else {
        next();
      }
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/:id",
    name: "postshow",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PostShow,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      store.dispatch("posts/fetchPost", to.params.id).then((post) => {
        to.params.post = post;
        next();
      });
    },
  },
  {
    path: "/create/:id",
    name: "create",
    component: CreatePost,
    meta: { requiresAuth: true },
  },
  {
    path: "/e/:id",
    name: "edit",
    component: EditPost,
    meta: { requiresAuth: true },
    props: true,
    beforeEnter(to, from, next) {
      store.dispatch("posts/fetchPost", to.params.id).then((post) => {
        to.params.post = post;
        console.log("post", post);
        next();
      });
    },
  },
  {
    path: "/u/:id",
    name: "user",
    component: User,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      store.dispatch("user/fetchUser", to.params.id).then((user) => {
        store.dispatch("posts/fetchUserPosts", user.uid).then((res) => {
          console.log("res", res);
          to.params.author = user;
          to.params.posts = res.posts;
          next();
        });
      });
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  const requiresAuth = to.matched.some((el) => el.meta.requiresAuth);
  const currentUser = store.state.user.user;

  if (requiresAuth && !currentUser) {
    next({ name: "login" });
  } else {
    console.log("next", currentUser);
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
