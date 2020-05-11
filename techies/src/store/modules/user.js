import userServices from "@/services/userAuth.js";

export const namespaced = true;
export const state = {
  user: null,
  photoURL: null,
  log_in: false,
};
export const mutations = {
  CHECK_INITIAL_USER_STATE(state, user) {
    state.user = user;
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
    commit("CHECK_INITIAL_USER_STATE", user);
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
    const commit_user = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
    //* reach out to sign up service
    return userServices.signUp(user).then(() => {
      //*get current sign in user
      const curUser = userServices.currentUser();
      //!update later (link the authentication to database for more user info)
      curUser
        .updateProfile({
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
        .then((res) => {
          console.log("res", res);
          console.log("cur", userServices.currentUser());
        });
      //*commit the user
      commit("SIGN_UP", commit_user);
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
