import firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyCsgKFyABoKVXtRxEt89x9eVYKmHrOUuDI",
  authDomain: "qhacks-2020.firebaseapp.com",
  projectId: "qhacks-2020",
  storageBucket: "qhacks-2020.appspot.com",
  messagingSenderId: "814885124725",
  appId: "1:814885124725:web:77394ef5b52c3acba7d63c",
};

firebase.initializeApp(firebaseConfig);

export default firebase;