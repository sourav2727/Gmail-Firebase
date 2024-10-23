import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,  // Access the Vite environment variable
  authDomain: "fir-d22c2.firebaseapp.com",
  projectId: "fir-d22c2",
  storageBucket: "fir-d22c2.appspot.com",
  messagingSenderId: "137860942111",
  appId: "1:137860942111:web:1a511382eab73c28d8882a",
  measurementId: "G-58JLC9WP42"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

// Set persistence before signing in
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// Listen to authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    console.log("User is signed in:", user);
  } else {
    // User is signed out
    console.log("No user signed in.");
    // Optionally redirect to sign-in page or initiate sign-in
  }
});

// Example sign-in function
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("User signed in:", result.user);
    })
    .catch((error) => {
      console.error("Sign-in error:", error);
    });
};
