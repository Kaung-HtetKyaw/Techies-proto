import commentServices from "@/services/comment.js";
export const namespaced = true;
export const state = {
  comments: [],
};

export const mutations = {
  SET_COMMENTS(state, comments) {
    state.comments = comments;
  },
  UPLOAD_COMMENT(state, comment) {
    state.comments = comment;
  },
};
export const actions = {
  fetchComments({ commit }, postid) {
    return commentServices.fetchComments(postid).then((res) => {
      if (res.data()) {
        console.log("res comm", res.data());
        commit("SET_COMMENTS", res.data().comments);
        return res.data().comments;
      } else {
        return false;
      }
    });
  },
  uploadComment({ commit }, comment) {
    console.log("up com", comment);
    console.log("from comp com", comment);

    return commentServices
      .uploadComment(comment)
      .then(() => {
        console.log("res up comm", comment.comments);
        commit("UPLOAD_COMMENT", comment.comments);
        return comment.comments;
      })
      .catch((error) => {
        console.log("mod err", error);
      });
  },
};
