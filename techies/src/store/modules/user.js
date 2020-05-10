import userServices from "@/services/userAuth.js";

export const namespaced = true;
export const state = {
  user: null,
  photoURL: null,
};
export const mutations = {
  LOG_IN(state, user) {
    state.user = user;
  },
  SIGN_UP(state, user) {
    state.user = user;
  },
  UPLOAD_IMAGE(state, url) {
    state.photoURL = url;
  },
};
export const actions = {
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
        return db_user;
      })
      .catch((error) => console.log(error));
  },
  signUp({ commit }, user) {
    return userServices
      .signUp({ email: user.email, password: user.password })
      .then(() => {
        const currentUser = userServices.currentUser();

        console.log("curren u", currentUser);
        currentUser
          .updateProfile({
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
          .then(() => {
            const local_user = {
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              uid: currentUser.uid,
            };
            console.log("res", local_user);
            commit("SIGN_UP", local_user);
            return local_user;
          });
      });
  },
};
export const getters = {};
