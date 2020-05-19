import userServices from "@/services/userAuth.js";
import uniqueId from "@/services/uniqueId.js";
import UserFactory from "@/Factory/User/UserFactory";
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
  UPDATE_PROFILE(state, user) {
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
  SET_READING_LIST(state, readingList) {
    state.user.readingLists = readingList;
  },
};
export const actions = {
  checkInitialUser({ commit, dispatch }, user) {
    console.log("current user check", user);
    return userServices.fetchUser(user.uid).then((res) => {
      console.log("return user check", res.data());
      //*add new user property

      const commit_user = {
        ...UserFactory.createFromDB(res),
      };

      const id = uniqueId.uniqueId();
      const commit_noti = {
        type: "success",
        id: id,
        message: `Signed in as ${commit_user.displayName}`,
      };

      dispatch("notification/addNoti", commit_noti, { root: true }).then(() => {
        commit("CHECK_INITIAL_USER_STATE", commit_user);
        return commit_user;
      });
    });
  },
  fetchUser({ commit }, id) {
    return userServices.fetchUser(id).then((res) => {
      console.log("fetch user", res.data());
      const commit_user = {
        uid: res.id,
        ...UserFactory.createFromDB(res),
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
            //*Noti&
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
  signInWithGoogle({ commit, dispatch }) {
    //*sign in with google
    return userServices.signInWithGoogle().then((sign_res) => {
      console.log("new user", sign_res);
      const isNewUser = sign_res.additionalUserInfo.isNewUser;
      //*fetch the user with uid got from google sign in
      return userServices.fetchUser(sign_res.user.uid).then((user_res) => {
        //*if old user=> just fetch it and commit
        if (user_res.data()) {
          //*add new user property
          user_res.data().isNewUser = isNewUser;
          //*Format the user with Factory pattern
          const user = UserFactory.createFromDB(user_res);

          //*Noti
          const id = uniqueId.uniqueId();
          const commit_noti = {
            type: "success",
            id: id,
            message: `Account Created`,
          };

          commit("SIGN_UP", user);
          dispatch("notification/addNoti", commit_noti, { root: true }).then(
            () => {
              return user;
            }
          );
        }
        //*if new user=> store the info from google sign in to database
        else {
          //*add new user property
          sign_res.user.isNewUser = isNewUser;
          //*format the user with Factory pattern
          const user = UserFactory.create(sign_res.user);
          console.log("response user", sign_res.user);
          console.log("user sign in info", user);
          return userServices.addUserInfo({ ...user }).then(() => {
            //*Noti
            const id = uniqueId.uniqueId();
            const commit_noti = {
              type: "success",
              id: id,
              message: `Account Created`,
            };

            commit("SIGN_UP", user);
            dispatch("notification/addNoti", commit_noti, { root: true }).then(
              () => {
                return user;
              }
            );
          });
        }
      });
    });
  },
  updateProfile({ commit, dispatch }, user) {
    //* format user obj to commit obj for excluding password
    console.log("state edit user", user);
    return userServices.addUserInfo(user).then(() => {
      const id = uniqueId.uniqueId();
      const commit_noti = {
        type: "success",
        id: id,
        message: `Account Updated`,
      };

      commit("UPDATE_PROFILE", user);
      dispatch("notification/addNoti", commit_noti, { root: true }).then(() => {
        return user;
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
  addToBookMark({ state, commit }, postid) {
    let user = state.user;
    //*push postid to current user readinglists array
    user.readingLists.push(postid);

    //*update the post in database
    return userServices.addUserInfo({ ...user }).then(() => {
      console.log("user reading lists changed", user);
      commit("SET_READING_LIST", user.readingLists);
    });
  },
  removeFromBookMark({ state, commit }, postid) {
    let user = state.user;
    //* make array that dont include postid
    const readingList = deleteItemFromArray(user.readingLists, postid);
    //* overwrite the existing readinglist with new readinglist
    user.readingLists = readingList;
    //*update the user in database
    return userServices.addUserInfo({ ...user }).then(() => {
      console.log("user reading lists changed", user);
      commit("SET_READING_LIST", user.readingLists);
    });
  },
};
function deleteItemFromArray(array, item) {
  return array.filter((el) => {
    return el !== item;
  });
}
export const getters = {};
