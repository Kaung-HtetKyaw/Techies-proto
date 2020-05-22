import commentServices from "@/services/comment.js";
import CommentFactory from "@/Factory/Comment/CommentFactory.js";
import uniqueId from "@/services/uniqueId.js";
export const namespaced = true;
export const state = {
  comments: {},
};
function getIndex(array, item) {
  return array.findIndex((el) => {
    return el.id === item.id;
  });
}
export const mutations = {
  SET_COMMENTS(state, comments) {
    state.comments = comments;
  },
  UPLOAD_COMMENT(state, comment) {
    state.comments = comment;
  },
  UPDATE_COMMENT(state, comment) {
    state.comments = comment;
  },
  DELETE_COMMENT(state, comments) {
    state.comments = comments;
  },
  DELETE_COMMENT_DOC() {},
  SET_COMMENT_LIKE(state, comment) {
    const index = getIndex(state.comments.comments, comment);
    state.comments.comments.splice(index, 1, comment);
  },
};
export const actions = {
  fetchComments({ commit }, postid) {
    return commentServices.fetchComments(postid).then((res) => {
      if (res.data()) {
        const factoryComment = CommentFactory.createFromDB(res);

        commit("SET_COMMENTS", factoryComment);
        return factoryComment;
      } else {
        const comment = {
          postid: postid,
          comments: [],
        };
        return commentServices.uploadComment(comment).then(() => {
          commit("SET_COMMENTS", comment);
          return !!comment.comments;
        });
      }
    });
  },
  uploadComment({ commit }, comment) {
    return commentServices
      .uploadComment({ ...comment })
      .then(() => {
        commit("UPLOAD_COMMENT", comment);
        return comment;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  updateComment({ commit, getters, state, dispatch }, comment) {
    const commentObj = state.comments;
    const commentIndex = getters.getCommentIndex(comment.id);
    commentObj.comments.splice(commentIndex, 1, comment);

    return commentServices.uploadComment({ ...commentObj }).then(() => {
      commit("UPDATE_COMMENT", commentObj);
      const id = uniqueId.uniqueId();
      const commit_noti = {
        type: "success",
        id: id,
        message: "Edited",
      };

      dispatch("notification/addNoti", commit_noti, { root: true }).then(() => {
        return commentObj;
      });
    });
  },
  //*this delete comment is to remove a comment in comments array of one of comments docs
  deleteComment({ commit, getters, state, dispatch }, id) {
    //*get comment that is not the id
    const commentsByNotID = getters.getCommentByNotID(id);
    //*get local store comments
    const comments = state.comments;
    //*overwirte it
    comments.comments = commentsByNotID;
    return commentServices.uploadComment({ ...comments }).then(() => {
      commit("DELETE_COMMENT", comments);
      const id = uniqueId.uniqueId();
      const commit_noti = {
        type: "success",
        id: id,
        message: "Edited",
      };

      dispatch("notification/addNoti", commit_noti, { root: true });
    });
  },
  //*this is to delete the entire comment doc which includes postid and comments array
  deleteCommentDoc({ commit }, id) {
    return commentServices.deleteComment(id).then(() => {
      commit("DELETE_COMMENT_DOC");
    });
  },
  likeComment({ commit, getters, state }, { id, uid }) {
    const commentObj = state.comments;
    //*get the comment and  from local store by id
    const comment = getters.getCommentByID(id);
    //*push the like uid to the post likes array
    comment.likes.push(uid);
    //*overwirte the old comment
    const index = getIndex(commentObj.comments, comment);
    commentObj.comments.splice(index, 1, comment);

    //*update the post in database
    return commentServices.uploadComment({ ...commentObj }).then(() => {
      commit("SET_COMMENT_LIKE", comment);
    });
  },
  unlikeComment({ commit, getters, state }, { id, uid }) {
    const commentObj = state.comments;
    //*get the comment and  from local store by id
    const comment = getters.getCommentByID(id);
    //*remove the uid from comment likes
    const commentLikes = deleteItemFromArray(comment.likes, uid);
    //*overwrite the comment likes
    comment.likes = commentLikes;
    //*overwirte the old comment
    const index = getIndex(commentObj.comments, comment);
    commentObj.comments.splice(index, 1, comment);

    //*update the post in database
    return commentServices.uploadComment({ ...commentObj }).then(() => {
      commit("SET_COMMENT_LIKE", comment);
    });
  },
};
function deleteItemFromArray(array, item) {
  return array.filter((el) => {
    return el !== item;
  });
}
export const getters = {
  getCommentByID: (state) => (id) => {
    return state.comments.comments.find((comment) => {
      return comment.id === id;
    });
  },
  getCommentIndex: (state) => (id) => {
    return state.comments.comments.findIndex((post) => {
      return post.postid === id;
    });
  },
  getCommentByNotID: (state) => (id) => {
    return state.comments.comments.filter((comment) => {
      return comment.id !== id;
    });
  },
};
