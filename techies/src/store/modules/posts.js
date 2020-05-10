import postServices from "@/services/posts.js";
export const namespaced = true;
export const state = {
  posts: [],
  my_posts: [],
  post: [],
  lastVisiblePost: {},
  isEmpty: false,
};
export const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
  SET_POST(state, post) {
    state.post = post;
  },
  SET_MORE_POSTS(state, posts) {
    posts.forEach((post) => {
      state.posts.push(post);
    });
  },
  SET_EMPTY_POST(state, empty) {
    state.isEmpty = empty;
  },
};

export const actions = {
  fetchPosts({ commit, state }) {
    let posts = [];
    return postServices.fetchPosts().then((response) => {
      state.lastVisiblePost = response.docs[response.docs.length - 1];
      response.docs.forEach((post) => {
        posts.push({
          postid: post.id,
          ...post.data(),
        });
      });
      commit("SET_POSTS", posts);
      commit("SET_EMPTY_POST", false);

      return posts;
    });
  },
  fetchMorePosts({ commit, state }) {
    const db_response = postServices.fetchMorePosts(state.lastVisiblePost);
    let posts = [];
    if (db_response) {
      return db_response.then((response) => {
        //*set the latest visible post for later fetch
        state.lastVisiblePost = response.docs[response.docs.length - 1];
        //*format the posts array
        response.docs.forEach((post) => {
          posts.push({
            postid: post.id,
            ...post.data(),
          });
        });
        commit("SET_MORE_POSTS", posts);

        console.log(posts);
        return posts;
      });
    } else {
      console.log("empty");
      commit("SET_EMPTY_POST", true);
    }
  },
  fetchPost({ commit, getters }, id) {
    console.log("fetchpost");
    //*check the post with payload id already exist?
    const existed_post = getters.getPostByID(id);
    if (existed_post) {
      console.log(existed_post);
      console.log("exist");
      commit("SET_POST", existed_post);
      return existed_post;
    } else {
      console.log("no exist");
      return postServices
        .fetchPost(id)
        .then((response) => {
          let post = {
            postid: response.id,
            ...response.data(),
          };
          commit("SET_POST", post);
          return post;
        })
        .catch((error) => console.log(error));
    }
  },
};
export const getters = {
  getPostByID: (state) => (id) => {
    console.log(state.posts);
    return state.posts.find((post) => {
      return post.postid === id;
    });
  },
};
