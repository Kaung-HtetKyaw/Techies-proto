import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  signIn(user) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password);
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
};
