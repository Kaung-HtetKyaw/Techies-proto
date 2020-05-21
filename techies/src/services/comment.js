import firebase from "firebase/app";
import "firebase/firestore";

export default {
  uploadComment(comment) {
    console.log("comment db", comment);
    return firebase
      .firestore()
      .collection("comments")
      .doc(comment.postid)
      .set(comment);
  },
  fetchComments(postid) {
    return firebase
      .firestore()
      .collection("comments")
      .doc(postid)
      .get();
  },
  deleteComment(id) {
    return firebase
      .firestore()
      .collection("comments")
      .doc(id)
      .delete();
  },
};
