// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection,addDoc,getDocs,updateDoc, doc,getDoc , deleteDoc} from "firebase/firestore";
import { getAuth , signInWithEmailAndPassword , createUserWithEmailAndPassword} from "firebase/auth";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7l0a4gYSwEAFjg5kzYxFRsJcy9X3U0QI",
  authDomain: "todolist-3ae82.firebaseapp.com",
  projectId: "todolist-3ae82",
  storageBucket: "todolist-3ae82.appspot.com",
  messagingSenderId: "843229229417",
  appId: "1:843229229417:web:f1df619f269c8355144df8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const database = getDatabase(app);
const auth = getAuth(app)

// mes collections
const userCollection=collection(db, 'Users');

export {db, auth,createUserWithEmailAndPassword,addDoc,signInWithEmailAndPassword,getDocs,updateDoc, doc, getDoc , collection , userCollection, deleteDoc , database};