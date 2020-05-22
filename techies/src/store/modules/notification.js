export const namespaced = true;
export const state = {
  notifications: [],
};
export const mutations = {
  ADD(state, noti) {
    state.notifications.push(noti);
  },
  DELETE(state, index) {
    state.notifications.splice(index, 1);
  },
};

export const actions = {
  addNoti({ commit }, noti) {
    commit("ADD", noti);
  },
  deleteNoti({ commit, getters }, noti) {
    const index = getters.getNotiIndex(noti.id);
    commit("DELETE", index);
  },
};
export const getters = {
  getNotiIndex: (state) => (id) => {
    return state.notifications.findIndex((noti) => {
      return noti.id === id;
    });
  },
};
