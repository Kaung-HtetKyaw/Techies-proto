import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import PostsFeed from "../views/PostsFeed.vue";
const SignIn = () =>
  import(/* webpackChunkName: "signin" */ "@/views/SignIn.vue");
const SignUp = () =>
  import(/* webpackChunkName: "signup" */ "@/views/SignUp.vue");
const CreatePost = () =>
  import(/* webpackChunkName: "create" */ "@/views/CreatePost.vue");
const PostShow = () =>
  import(/* webpackChunkName: "postshow" */ "@/views/PostShow.vue");
const EditPost = () =>
  import(/* webpackChunkName: "edit" */ "@/views/EditPost.vue");
const NotFound = () =>
  import(/* webpackChunkName: "notfound" */ "@/components/404.vue");
const User = () => import(/* webpackChunkName: "user" */ "@/views/User.vue");
const UpdateProfile = () =>
  import(/* webpackChunkName: "updateprofile" */ "@/views/UpdateProfile.vue");
const ReadingLists = () =>
  import(/* webpackChunkName: "updateprofile" */ "@/views/ReadingLists.vue");
import NProgress from "nprogress";
import store from "@/store/index.js";

import "firebase/firestore";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: true,
  },
  {
    path: "/pf",
    name: "postsfeed",
    component: PostsFeed,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: SignIn,
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
    path: "/p/:id",
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
        if (post.uid === store.state.user.user.uid) {
          to.params.post = post;
          console.log("post", post);
          next();
        } else {
          next({ name: "postsfeed" });
        }
      });
    },
  },
  {
    path: "/u/:id",
    name: "user",
    component: User,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "updateP",
    name: "updateprofile",
    component: UpdateProfile,

    meta: { requiresAuth: true },
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
  },
  {
    path: "/rl",
    name: "readinglists",
    component: ReadingLists,
    beforeEnter(to, from, next) {
      const lists = store.state.user.user.readingLists;
      store.dispatch("posts/fetchReadingLists", lists).then(() => {
        next();
      });
    },
  },
  {
    path: "*",
    redirect: { name: "404" },
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
    next({ name: "home" });
  } else {
    console.log("next", currentUser);
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
