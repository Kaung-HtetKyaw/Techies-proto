import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";
import "firebase/firestore";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import "nprogress/nprogress.css";
import "./registerServiceWorker";
import "./registerServiceWorker";

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});
// firebase init goes here
const firebaseConfig = {
  apiKey: "AIzaSyClocShGsv5xYAkvObkdu4KxRDcxbzkOkA",
  authDomain: "mayhemd2-c8045.firebaseapp.com",
  databaseURL: "https://mayhemd2-c8045.firebaseio.com",
  projectId: "mayhemd2-c8045",
  storageBucket: "mayhemd2-c8045.appspot.com",
  messagingSenderId: "893814438629",
  appId: "1:893814438629:web:a1ce4d04d0a8ba70e4320c"
};
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;
let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
