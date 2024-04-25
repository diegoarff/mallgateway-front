import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAL6ZMwn4b-vH8pi89sKTJz1mSvhXzK4_M",
  authDomain: "imgstorage-b6657.firebaseapp.com",
  projectId: "imgstorage-b6657",
  storageBucket: "imgstorage-b6657.appspot.com",
  messagingSenderId: "1097422902074",
  appId: "1:1097422902074:web:f9e1b686b9caf2f395b603",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
