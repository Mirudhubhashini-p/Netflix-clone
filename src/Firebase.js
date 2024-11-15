// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getFirestore, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
    apiKey: "AIzaSyDbcqzzjugzsxsjAdUT3CS8XqR0TxDu8_w",
    authDomain: "netflix-clone-a9e45.firebaseapp.com",
    projectId: "netflix-clone-a9e45",
    storageBucket: "netflix-clone-a9e45.firebasestorage.app",
    messagingSenderId: "565430522064",
    appId: "1:565430522064:web:e2b536c3f3d746a40fced5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {

        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,

        });

    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));


    }
}
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}
const logout = () => {
    signOut(auth);
}
export { auth, db, login, signup, logout };