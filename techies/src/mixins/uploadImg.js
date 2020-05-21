import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
export const createPostUpoad = {
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      if (event.target.files[0]) {
        const file = event.target.files[0];
        this.rawFile = file;
        let filename = file.name;
        if (filename.lastIndexOf(".") <= 0) {
          return alert("Shit");
        }
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.local_imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(file);
        this.upload_btn = true;
      }
    },
    uploadFile() {
      const filename = this.rawFile;
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
            this.imageUrl = downloadURL;
            this.upload = false;
            this.upload_btn = false;
          });
        }
      );
    },
  },
};
export const editPostUpload = {
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      if (event.target.files[0]) {
        const file = event.target.files[0];
        this.rawFile = file;
        let filename = file.name;
        if (filename.lastIndexOf(".") <= 0) {
          return alert("Shit");
        }
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.local_imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(file);
        this.upload_btn = true;
      }
    },
    uploadFile() {
      const filename = this.rawFile;
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
            this.post.image = downloadURL;
            this.upload = false;
            this.upload_btn = false;
            this.choose_btn = false;
          });
        }
      );
    },
  },
};

export const updateProfileUpload = {
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      if (event.target.files[0]) {
        const file = event.target.files[0];
        this.rawFile = file;
        let filename = file.name;
        if (filename.lastIndexOf(".") <= 0) {
          return alert("Shit");
        } else {
          const fileReader = new FileReader();
          fileReader.addEventListener("load", () => {
            this.local_imageUrl = fileReader.result;
          });
          fileReader.readAsDataURL(file);
          this.upload_btn = true;
        }
      }
    },
    uploadFile() {
      const filename = this.rawFile;
      this.upload = true;
      const key = Math.floor(Math.random() * 199054289);
      const ext = filename.name.slice(filename.name.lastIndexOf("."));

      const storageRef = firebase
        .storage()
        .ref("users/" + key + ext)
        .put(filename);

      storageRef.on(
        "state_changed",
        function() {},
        function() {
          // Handle unsuccessful uploads
        },
        () => {
          storageRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.user.photoURL = downloadURL;
            console.log("this user photourl", this.user);
            this.upload = false;
            this.upload_btn = false;
            this.upload_finish = true;
            this.choose_btn = false;
          });
        }
      );
    },
  },
};
