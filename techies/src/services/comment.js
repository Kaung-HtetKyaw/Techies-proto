import firebase from "firebase/app";
import "firebase/firestore";

export default {
  uploadComment(comment) {
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
};
