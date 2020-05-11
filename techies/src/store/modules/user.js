import userServices from "@/services/userAuth.js";

export const namespaced = true;
export const state = {
  user: null,
  photoURL: null,
  log_in: false,
  author: {},
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
  checkInitialUser({ commit }, user) {
    return userServices.fetchUser(user.uid).then((res) => {
      const commit_user = {
        uid: res.id,
        ...res.data(),
      };
      console.log("user check", commit_user);
      commit("CHECK_INITIAL_USER_STATE", commit_user);
    });
  },
  fetchUser({ commit }, id) {
    return userServices.fetchUser(id).then((res) => {
      const commit_user = {
        uid: res.id,
        ...res.data(),
      };
      console.log("user fetch", commit_user);
      commit("FETCH_USER", commit_user);
      return commit_user;
    });
  },
  signIn({ commit }, user) {
    return userServices
      .signIn(user)
      .then((response) => {
        //*format the response to get desired user obj
        const db_user = {
          email: response.user.email,
          displayName: response.user.displayName,
          uid: response.user.uid,
          photoURL: response.user.photoURL,
          joined: response.user.metadata.creationTime,
        };
        //*commit it
        commit("LOG_IN", db_user);
        commit("SET_AUTH_STATE", true);
        return db_user;
      })
      .catch((error) => console.log(error));
  },
  signUp({ commit }, user) {
    //* format user obj to commit obj for excluding password
    let commit_user;
    //* reach out to sign up service
    return userServices.signUp(user).then((res) => {
      console.log("res", res);
      commit_user = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: res.user.uid, //*get uid from response from firebase
        joined: res.user.metadata.creationTime, //*get joined date
      };
      userServices.addUserInfo(commit_user).then((response) => {
        console.log("added user", response);
        commit("SIGN_UP", commit_user);
      });
      return commit_user;
    });
  },
  signOut({ commit }) {
    return userServices.signOut().then(() => {
      commit("SIGN_OUT", null);
      commit("SET_AUTH_STATE", false);
    });
  },
};
export const getters = {};
