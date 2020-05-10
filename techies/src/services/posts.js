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

  uploadImage(imageData) {
    const key = Math.floor(Math.random() * 199054289);
    const ext = imageData.name.slice(imageData.name.lastIndexOf("."));
    let url;
    const storageRef = firebase
      .storage()
      .ref("posts/" + key + ext)
      .put(imageData);

    storageRef.on(
      "state_changed",
      function() {},
      function() {
        // Handle unsuccessful uploads
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          url = downloadURL;
          return downloadURL;
        });
        console.log("serv url", url);
      }
    );
    return url;
  },
};
