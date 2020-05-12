import postServices from "@/services/posts.js";
import uniqueId from "@/services/uniqueId.js";
export const namespaced = true;
export const state = {
  posts: [],
  author_profile: {},
  author_posts: [],
  post: [],
  lastVisiblePost: {},
  isEmpty: false,
};
export const mutations = {
  CREATE_POST(state, post) {
    state.posts.push(post);
  },
  UPDATE_POST(state, payload) {
    state.posts.splice(payload.index, 1, payload.post);
  },
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
  SET_AUTHOR_PROFILE(state, profile) {
    state.author_profile = profile.author;
    state.author_posts = profile.posts;
  },
  SET_EMPTY_POST(state, empty) {
    state.isEmpty = empty;
  },
};

export const actions = {
  fetchPosts({ commit, state }) {
    let posts = [];
    return postServices
      .fetchPosts()
      .then((response) => {
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
      })
      .catch((error) => console.log(error));
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
        return posts;
      });
    } else {
      commit("SET_EMPTY_POST", true);
    }
  },
  fetchPost({ commit, getters }, id) {
    //*check the post with payload id already exist?
    const existed_post = getters.getPostByID(id);
    if (existed_post) {
      commit("SET_POST", existed_post);
      return existed_post;
    } else {
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
  fetchUserPosts({ commit }, uid) {
    let posts = [];
    return postServices.fetchUserPosts(uid).then((response) => {
      commit("SET_AUTHOR_PROFILE", response);

      response.docs.forEach((post) => {
        posts.push({
          postid: post.id,
          ...post.data(),
        });
      });
      return { posts };
    });
  },
  createPost({ commit, dispatch }, post) {
    return postServices
      .createPost(post)
      .then((response) => {
        //*format the response to commit
        const commit_post = {
          postid: response.id,
          ...post,
        };
        const id = uniqueId.uniqueId();
        const commit_noti = {
          type: "success",
          id: id,
          message: "Post Created",
        };

        dispatch("notification/addNoti", commit_noti, { root: true }).then(
          () => {
            commit("CREATE_POST", commit_post);
          }
        );
        return commit_post;
      })
      .catch((error) => {
        if (error.code) {
          const errorMsg = error.code.split("/")[1];
          const id = uniqueId.uniqueId();
          const commit_noti = {
            id: id,
            type: "error",
            message: errorMsg,
          };
          dispatch("notification/deleteNoti", commit_noti, { root: true });
        }
      });
  },
  updatePost({ commit, getters, dispatch }, post) {
    const db_post = {
      title: post.title,
      description: post.description,
      author: post.author,
      content: post.content,
      image: post.image,
      date: post.date,
      uid: post.uid,
      likes: post.likes,
      readTime: post.readTime,
      tags: post.tags,
    };
    const index = getters.getPostIndex(post.postid);
    const commit_post = {
      index: index,
      post: post,
    };
    return postServices.updatePost(post.postid, db_post).then(() => {
      commit("UPDATE_POST", commit_post);
      const id = uniqueId.uniqueId();
      const commit_noti = {
        type: "success",
        id: id,
        message: "Post Updated",
      };

      dispatch("notification/addNoti", commit_noti, { root: true });
      return post;
    });
  },
};
export const getters = {
  getPostByID: (state) => (id) => {
    return state.posts.find((post) => {
      return post.postid === id;
    });
  },
  getPostIndex: (state) => (id) => {
    return state.posts.findIndex((post) => {
      return post.postid === id;
    });
  },
};
