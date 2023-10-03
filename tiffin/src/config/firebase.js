import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth" 

const firebaseConfig = {
  apiKey: "AIzaSyDMD9P_c_tzGmqHz8pwKUm4EfAZs_L718o",
  authDomain: "tiffin-testing.firebaseapp.com",
  projectId: "tiffin-testing",
  storageBucket: "tiffin-testing.appspot.com",
  messagingSenderId: "212489934091",
  appId: "1:212489934091:web:641061ec1713ed3ec4be0e"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");

const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope("public_profile");
facebookProvider.addScope("email");

export { auth, googleProvider, facebookProvider };