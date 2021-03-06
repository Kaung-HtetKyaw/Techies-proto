import postServices from "@/services/posts.js";
import userAuth from "@/services/userAuth.js";
import uniqueId from "@/services/uniqueId.js";
import PostFactory from "@/Factory/Post/PostFactory.js";
import UserFactory from "@/Factory/User/UserFactory.js";
export const namespaced = true;
export const state = {
  posts: [],
  popularPosts: [],
  readingLists: [],
  author_posts: [],
  post: [],
  lastVisiblePost: {},
  filter: false,
  isEmpty: false
};
function getIndex(posts, post) {
  return posts.findIndex(el => {
    return el.postid === post.postid;
  });
}
export const mutations = {
  CREATE_POST(state, post) {
    state.posts.push(post);
  },
  UPDATE_POST(state, payload) {
    state.posts.splice(payload.index, 1, payload.post);
  },
  DELETE_POST(state, posts) {
    state.posts = posts;
  },
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
  SET_POPULAR_POSTS(state, posts) {
    state.popularPosts = posts;
  },
  SET_FILTER(state, condition) {
    state.filter = condition;
  },
  SET_READING_LISTS(state, posts) {
    state.readingLists = posts;
  },
  SET_POST(state, post) {
    state.post = post;
  },
  SET_MORE_POSTS(state, posts) {
    posts.forEach(post => {
      state.posts.push(post);
    });
  },
  SET_AUTHOR_POSTS(state, posts) {
    state.author_posts = posts;
  },
  SET_LIKE(state, post) {
    const postIndex = getIndex(state.posts, post);
    const author_postIndex = getIndex(state.author_posts, post);
    state.posts.splice(postIndex, 1, post);
    state.author_posts.splice(author_postIndex, 1, post);
  },
  SET_EMPTY_POST(state, empty) {
    state.isEmpty = empty;
  }
};
function deleteItemFromArray(array, item) {
  return array.filter(el => {
    return el !== item;
  });
}
export const actions = {
  fetchPosts({ commit, state }) {
    //*set the filter to flase for all posts fetch
    commit("SET_FILTER", false);
    //* initialize the posts array
    let posts = [];
    //*reach out to the server

    return postServices
      .fetchAllPosts()
      .then(response => {
        //*set last posts scrolled for infinite scrolling
        state.lastVisiblePost = response.docs[response.docs.length - 1];
        //*iterate response object to push to the posts
        response.docs.forEach(post => {
          //* format posts with Factory pattern
          const factoryPost = PostFactory.createFromDB(post);
          posts.push(factoryPost);
        });

        commit("SET_POSTS", posts);
        commit("SET_EMPTY_POST", false);

        return posts;
      })
      .catch(error => console.log(error));
  },
  fetchTagPosts({ commit }, tag) {
    //*set the filter to true for categories fetch
    //*for differentiate between normal category fetch and infinit scroll fetch
    commit("SET_FILTER", true);
    //*initialize an empty array
    let posts = [];
    //*fetch the posts that have this tag
    return postServices
      .fetchTagPosts(tag)
      .then(response => {
        //*format each posts with Post Factory
        response.docs.forEach(post => {
          //* format posts with Factory pattern
          const factoryPost = PostFactory.createFromDB(post);
          posts.push(factoryPost);
        });
        //*only overwrite the local posts array if there is one post at least
        if (posts.length > 0) {
          commit("SET_POSTS", posts);
        }

        return posts;
      })
      .catch(error => console.log(error));
  },
  fetchMorePosts({ commit, state }) {
    //*fetch the posts by passing the lastvisible post as an argument
    const db_response = postServices.fetchMorePosts(state.lastVisiblePost);
    //*initialize an empty array
    let posts = [];
    //*the database still has posts
    if (db_response) {
      return db_response.then(response => {
        //*set the latest visible post for later fetch
        state.lastVisiblePost = response.docs[response.docs.length - 1];
        //*format the posts array with factory pattern
        response.docs.forEach(post => {
          const factoryPost = PostFactory.createFromDB(post);
          posts.push(factoryPost);
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
    //*if the post is already existed in local store
    if (existed_post) {
      commit("SET_POST", existed_post);
      return existed_post;
    }

    //*if the post is not in local store
    else {
      //*fetch it from the database
      return postServices
        .fetchPost(id)
        .then(response => {
          //*format the post with Factory pattern
          const factoryPost = PostFactory.createFromDB(response);
          let post = {
            ...factoryPost
          };
          commit("SET_POST", post);
          return post;
        })
        .catch(error => console.log(error));
    }
  },
  fetchUserPosts({ commit }, uid) {
    //*initialize an empty array
    let posts = [];
    //*fetch the posts which have this  uid
    return postServices.fetchUserPosts(uid).then(response => {
      //*format the post with Factory pattern
      response.docs.forEach(post => {
        const factoryPost = PostFactory.createFromDB(post);
        posts.push(factoryPost);
      });

      commit("SET_AUTHOR_POSTS", posts);
      return { posts };
    });
  },
  fetchPopularPosts({ commit }) {
    //*initialize an empty array
    let posts = [];
    //*fetch the popular which are the 3 posts with max likesNo
    return postServices.fetchPopularPosts().then(res => {
      //*format each post with Post factory
      res.docs.forEach(el => {
        posts.push(PostFactory.createFromDB(el));
      });
      commit("SET_POPULAR_POSTS", posts);
      return posts;
    });
  },
  fetchReadingLists({ commit, getters }, lists) {
    //*initialize an empty array
    let readingLists = [];
    //*iterate each list
    lists.forEach(postid => {
      //*get the post which has this postid
      const getPostByID = getters.getPostByID(postid);
      //*if this post which has this postid is already in local store
      //*push it to the empty array
      if (getPostByID) {
        readingLists.push(getPostByID);
      }
      //*if dont find the post by this postid
      else {
        //*fetch it from the database
        postServices.fetchPost(postid).then(response => {
          if (response.data()) {
            const factoryPost = PostFactory.createFromDB(response);
            let post = {
              ...factoryPost
            };
            readingLists.push(post);
          }
        });
      }
    });
    commit("SET_READING_LISTS", readingLists);
    return readingLists;
  },
  createPost({ commit, dispatch }, post) {
    //*create it in the database first
    return postServices
      .createPost(post)
      .then(response => {
        //*format the response with Post Factory
        const commit_post = {
          postid: response.id,
          ...PostFactory.create(post)
        };
        //*Noti
        const id = uniqueId.uniqueId();
        const commit_noti = {
          type: "success",
          id: id,
          message: "Post Created"
        };

        dispatch("notification/addNoti", commit_noti, { root: true }).then(
          () => {
            //*push it to the local posts
            commit("CREATE_POST", commit_post);
          }
        );
        return commit_post;
      })
      .catch(error => {
        if (error.code) {
          const errorMsg = error.code.split("/")[1];
          const id = uniqueId.uniqueId();
          const commit_noti = {
            id: id,
            type: "error",
            message: errorMsg
          };
          dispatch("notification/deleteNoti", commit_noti, { root: true });
        }
      });
  },
  updatePost({ commit, getters, dispatch }, post) {
    //* firebase wont accept custom object(Post object in this case)
    //*so it should be destructured
    const db_post = {
      ...PostFactory.create(post.post)
    };
    //*prepare obj to commit
    const index = getters.getPostIndex(post.postid);
    const commit_post = {
      index: index,
      post: db_post
    };
    //*update it in the database first
    return postServices.updatePost(post.postid, db_post).then(() => {
      //*then update it in the local store
      commit("UPDATE_POST", commit_post);
      //*Noti
      const id = uniqueId.uniqueId();
      const commit_noti = {
        type: "success",
        id: id,
        message: "Post Updated"
      };

      dispatch("notification/addNoti", commit_noti, { root: true });
      return post;
    });
  },

  deletePost({ commit, getters, dispatch }, postid) {
    //*retrive users who have added this postid in their readinglists
    return userAuth.getUserByReadingList(postid).then(users => {
      //*delete post from users reading list which is equal to this postid
      users.docs.forEach(user => {
        //*format the user with User Factory
        let db_user = UserFactory.createFromDB(user);

        //*overwrite the existing reading list with reading list which dont have this postid
        db_user.readingLists = deleteItemFromArray(
          db_user.readingLists,
          postid
        );

        //*update this user  in the database
        userAuth.addUserInfo({ ...db_user });
      });

      //*delete post in firebase
      return postServices.deletePost(postid).then(() => {
        //*delete the entire comment doc which has this postid
        dispatch("comment/deleteCommentDoc", postid, { root: true });
        //*Noti
        const id = uniqueId.uniqueId();
        const commit_noti = {
          type: "success",
          id: id,
          message: "Post Deleted"
        };
        //*show noti
        dispatch("notification/addNoti", commit_noti, { root: true });
        //*get posts which dont have this postid
        const postsByNotID = getters.getPostByNotID(postid);
        //*replace the local posts with the above posts
        commit("DELETE_POST", postsByNotID);
        //*get posts which  have this postid
        const postsByID = getters.getPostByID(postid);
        commit("SET_AUTHOR_POSTS", postsByID);
        //*get reading list which is not this postid
        let local_readingLists = getters.getReadingListByNotID(postid);
        //*overwrite the local readinglists
        commit("SET_READING_LISTS", local_readingLists);
        //*return for later user
        return { postsByNotID, postsByID, local_readingLists };
      });
    });
  },
  likePost({ commit, getters }, { postid, uid }) {
    //*get the post and author_post(if exist) from local store by postid
    const post = getters.getPostByID(postid);
    //*push the like uid to the post likes array
    post.likes.push(uid);
    //* increment the likesNo in post
    post.likesNo = post.likes.length;
    //*update the post in database
    return postServices.updatePost(postid, { ...post }).then(() => {
      commit("SET_LIKE", post);
    });
  },
  unlikePost({ commit, getters }, { postid, uid }) {
    //*get the post from local store by postid
    const post = getters.getPostByID(postid);
    //*make array that dont include uid
    const postLikes = deleteItemFromArray(post.likes, uid);
    //*overwirte the existing likes with new likes
    post.likes = postLikes;
    //*overwrite the likeNo
    post.likesNo = post.likes.length;
    //*update the post in database
    return postServices.updatePost(postid, { ...post }).then(() => {
      commit("SET_LIKE", post);
    });
  }
};

export const getters = {
  getPostByID: state => id => {
    return state.posts.find(post => {
      return post.postid === id;
    });
  },
  getAuthorPostByNotID: state => id => {
    return state.author_posts.filter(post => {
      return post.postid !== id;
    });
  },
  getAuthorPostByID: state => id => {
    return state.author_posts.find(post => {
      return post.postid === id;
    });
  },
  getPostIndex: state => id => {
    return state.posts.findIndex(post => {
      return post.postid === id;
    });
  },
  getPostByNotID: state => id => {
    return state.posts.filter(post => {
      return post.postid !== id;
    });
  },
  getReadingListByNotID: state => id => {
    return state.readingLists.filter(post => {
      return post.postid !== id;
    });
  }
};
