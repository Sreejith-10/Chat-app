// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
	apiKey: "AIzaSyBAaIp_mfMLwE4f40ntDK_JTK-AL9YARKc",
	authDomain: "chat-app-167f4.firebaseapp.com",
	projectId: "chat-app-167f4",
	storageBucket: "chat-app-167f4.appspot.com",
	messagingSenderId: "51374638177",
	appId: "1:51374638177:web:5edc393bd26b5a8c1d5620",
	measurementId: "G-X8E5NV88WK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
