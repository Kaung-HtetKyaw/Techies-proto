import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

export default {
  fetchPosts() {
    return firebase
      .firestore()
      .collection("posts")
      .limit(5)
      .get();
  },
  fetchMorePosts(lastVisisble) {
    console.log("enter");
    if (lastVisisble) {
      return firebase
        .firestore()
        .collection("posts")
        .startAfter(lastVisisble)
        .limit(6)
        .get();
    }
  },
  fetchPost(id) {
    return firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .get();
  },
  fetchUserPosts(uid) {
    console.log("uid", uid);
    return firebase
      .firestore()
      .collection("posts")
      .where("uid", "==", uid)
      .get();
  },
  fetchPopularPosts() {
    return firebase
      .firestore()
      .collection("posts")
      .orderBy("likesNo")
      .limit(3)
      .get();
  },
  createPost(post) {
    console.log("create post", post);
    return firebase
      .firestore()
      .collection("posts")
      .add(post);
  },
  updatePost(id, post) {
    console.log("id fb", id);
    console.log("post fb", post);
    return firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .set(post);
  },
};
