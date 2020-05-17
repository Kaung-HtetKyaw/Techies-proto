import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  signIn(user) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password);
  },
  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  },
  signUp(user) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
  },
  addUserInfo(user) {
    return firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set(user);
  },
  signOut() {
    return firebase.auth().signOut();
  },
  currentUser() {
    return firebase.auth().currentUser;
  },
  fetchUser(id) {
    return firebase
      .firestore()
      .collection("users")
      .doc(id)
      .get();
  },
  getUserByReadingList(readingList) {
    return firebase
      .firestore()
      .collection("users")
      .where("readingLists", "array-contains", readingList)
      .get();
  },
};
