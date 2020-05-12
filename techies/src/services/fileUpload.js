import firebase from "firebase/app";
import "firebase/firestore";

export default {
  async uploadFile(rawFile) {
    const filename = rawFile;
    this.upload = true;
    const key = Math.floor(Math.random() * 199054289);
    const ext = filename.name.slice(filename.name.lastIndexOf("."));

    const storageRef = firebase
      .storage()
      .ref("posts/" + key + ext)
      .put(filename);

    storageRef.on(
      "state_changed",
      function() {},
      function() {
        // Handle unsuccessful uploads
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
          return downloadURL;
        });
      }
    );
  },
};
