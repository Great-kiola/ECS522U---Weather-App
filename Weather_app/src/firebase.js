// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyDYLcGutg3paJLBOd2BpfiUMUUYsda-U_U",
  authDomain: "testing-3c169.firebaseapp.com",
  projectId: "testing-3c169",
  storageBucket: "testing-3c169.firebasestorage.app",
  messagingSenderId: "636335767488",
  appId: "1:636335767488:web:5a7c600ff90b69340b5225",
  measurementId: "G-L7TYFS48NN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app); 
export { auth };           
