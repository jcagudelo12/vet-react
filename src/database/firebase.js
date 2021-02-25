import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5-Sbs1-Mhvye38eP49BmV3yQG3jrKBII",
  authDomain: "vet-app-a301d.firebaseapp.com",
  projectId: "vet-app-a301d",
  storageBucket: "vet-app-a301d.appspot.com",
  messagingSenderId: "1021033915298",
  appId: "1:1021033915298:web:f01b5848d640357decc8fb",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
