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
  signOut() {
    return firebase.auth().signOut();
  },
  currentUser() {
    return firebase.auth().currentUser;
  },
};
