import userServices from "@/services/userAuth.js";
import uniqueId from "@/services/uniqueId.js";
export const namespaced = true;
export const state = {
  user: null,
  photoURL: null,
  log_in: false,
  author: {},
  categories: [
    "Future",
    "Technology",
    "Health",
    "Science",
    "Business",
    "Work",
    "Culture",
    "Beauty",
    "Food",
    "Programming",
    "Design",
    "Politics",
    "Relationships",
    "Startups",
    "Crytocurrency",
    "Data Science",
    "Productivity",
    "Artificial Intelligence",
    "Religions",
    "Culture",
    "Other",
  ],
};
export const mutations = {
  CHECK_INITIAL_USER_STATE(state, user) {
    state.user = user;
  },
  FETCH_USER(state, user) {
    state.author = user;
  },
  LOG_IN(state, user) {
    state.user = user;
  },
  SIGN_UP(state, user) {
    state.user = user;
  },
  SIGN_OUT(state, user) {
    state.user = user;
  },
  SET_AUTH_STATE(state, auth) {
    state.log_in = auth;
  },
  UPLOAD_IMAGE(state, url) {
    state.photoURL = url;
  },
};
export const actions = {
  checkInitialUser({ commit, dispatch }, user) {
    return userServices.fetchUser(user.uid).then((res) => {
      const commit_user = {
        uid: res.id,
        ...res.data(),
      };

      const id = uniqueId.uniqueId();
      const commit_noti = {
        type: "success",
        id: id,
        message: `Signed in as ${commit_user.displayName}`,
      };

      dispatch("notification/addNoti", commit_noti, { root: true }).then(() => {
        commit("CHECK_INITIAL_USER_STATE", commit_user);
      });
    });
  },
  fetchUser({ commit }, id) {
    return userServices.fetchUser(id).then((res) => {
      const commit_user = {
        uid: res.id,
        ...res.data(),
      };

      commit("FETCH_USER", commit_user);
      return commit_user;
    });
  },
  signIn({ commit, dispatch }, user) {
    return userServices
      .signIn(user)
      .then((response) => {
        return userServices
          .fetchUser(response.user.uid)
          .then((user_response) => {
            //*format the response to get desired user obj
            const db_user = {
              uid: user_response.id,
              ...user_response.data(),
            };

            commit("LOG_IN", db_user);
            commit("SET_AUTH_STATE", true);
            const id = uniqueId.uniqueId();
            const commit_noti = {
              type: "success",
              id: id,
              message: `Signed in as ${db_user.displayName}`,
            };

            dispatch("notification/addNoti", commit_noti, { root: true }).then(
              () => {
                //*commit it

                return db_user;
              }
            );
          });
      })
      .catch((error) => console.log(error));
  },
  signUp({ commit, dispatch }, user) {
    //* format user obj to commit obj for excluding password
    let commit_user;
    //* reach out to sign up service
    return userServices.signUp(user).then((res) => {
      commit_user = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        tags: user.tags,
        bio: user.bio,
        uid: res.user.uid, //*get uid from response from firebase
        joined: res.user.metadata.creationTime, //*get joined date
      };
      return userServices.addUserInfo(commit_user).then(() => {
        const id = uniqueId.uniqueId();
        const commit_noti = {
          type: "success",
          id: id,
          message: `Account Created`,
        };

        commit("SIGN_UP", commit_user);
        dispatch("notification/addNoti", commit_noti, { root: true }).then(
          () => {
            return commit_user;
          }
        );
      });
    });
  },
  signOut({ commit, dispatch }) {
    return userServices.signOut().then(() => {
      const id = uniqueId.uniqueId();
      const commit_noti = {
        type: "success",
        id: id,
        message: "Signed Out",
      };
      commit("SIGN_OUT", null);
      commit("SET_AUTH_STATE", false);
      dispatch("notification/addNoti", commit_noti, { root: true });
    });
  },
};
export const getters = {};
