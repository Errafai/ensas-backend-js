import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Étudiants, remplacez ceci par votre propre config Firebase
const firebaseConfig = {

  apiKey: "AIzaSyDl_ZotC1HAoXMVnzbiV1ZEJAntZeE5bkA",

  authDomain: "projectj-manager.firebaseapp.com",

  projectId: "projectj-manager",

  storageBucket: "projectj-manager.firebasestorage.app",

  messagingSenderId: "405863016772",

  appId: "1:405863016772:web:3b2bdcd3f3cf3674a90f11",

  measurementId: "G-4MS8Q74NXP"

};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };