import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXVaL75HbMlGJS4vEoy-5xERnCj_jeDIo",
  authDomain: "anybet-effd1.firebaseapp.com",
  projectId: "anybet-effd1",
  storageBucket: "anybet-effd1.firebasestorage.app",
  messagingSenderId: "473981004870",
  appId: "1:473981004870:web:3cf4f72190b9fead59ae47",
  measurementId: "G-2G1V4JPTES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export default app;
