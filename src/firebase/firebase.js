import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmZwQz5oAfCG_bpXdiZuzYRB3oFyl9chU",
  authDomain: "belajar-lc2.firebaseapp.com",
  projectId: "belajar-lc2",
  storageBucket: "belajar-lc2.firebasestorage.app",
  messagingSenderId: "10758639944",
  appId: "1:10758639944:web:7a3f434002c7f76530637d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
