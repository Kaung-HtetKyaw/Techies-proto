import firebase from "firebase/app";
import "firebase/firestore";

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
  currentUser() {
    return firebase.auth().currentUser;
  },
};
