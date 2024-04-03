// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "www.nextani.net",
  projectId: "nextani-415707",
  storageBucket: "nextani-415707.appspot.com",
  messagingSenderId: "774743828666",
  appId: "1:774743828666:web:4dcb5b70e55a11407a7a83",
  measurementId: "G-CPPXNF5TG0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
  GoogleAuthProvider,
  signInWithRedirect,
  verifyBeforeUpdateEmail,
  deleteUser,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

export const getIdToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return user.getIdToken();
  }
  throw new Error("No authenticated user found");
};

export const register = async (email, password, displayName) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    process.env.SHOW_CONSOLE === "dev" &&
      console.log("Registered user:", userCredential.user);
    await sendVerificationEmail(userCredential.user);
    await updateProfile(userCredential.user, {
      displayName: displayName,
    });

    process.env.SHOW_CONSOLE === "dev" &&
      console.log("User profile updated with displayName:", displayName);
  } catch (error) {
    console.error("Error registering new user:", error);
    const errorMessage = getErrorMessage(error.code);
    throw new Error(errorMessage);
  }
};

export const sendVerificationEmail = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user && !user.emailVerified) {
    try {
      await sendEmailVerification(user);
      process.env.SHOW_CONSOLE === "dev" &&
        console.log("Verification email sent again.");
    } catch (error) {
      console.error("Error resending verification email:", error);
      const errorMessage = getErrorMessage(error.code);
      throw new Error(errorMessage);
    }
  } else {
    process.env.SHOW_CONSOLE === "dev" &&
      console.log("No user is signed in or email is already verified.");
  }
};

export const changeUserEmail = async (newEmail) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    try {
      await verifyBeforeUpdateEmail(user, newEmail);
      process.env.SHOW_CONSOLE === "dev" &&
        console.log("Email updated successfully.");
    } catch (error) {
      console.error("Error updating email:", error);

      const errorMessage = getErrorMessage(error.code);
      throw new Error(errorMessage);
    }
  } else {
    throw new Error("No authenticated user found");
  }
};

export const login = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    process.env.SHOW_CONSOLE === "dev" &&
      console.log("Logged in user:", userCredential.user);
  } catch (error) {
    console.error("Error logging in user:", error);
    const errorMessage = getErrorMessage(error.code);
    throw new Error(errorMessage);
  }
};

export const handleGoogleLogin = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  signInWithRedirect(auth, provider);
};

export const resetPassword = async (email) => {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
    process.env.SHOW_CONSOLE === "dev" &&
      console.log("Password reset email sent successfully.");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    const errorMessage = getErrorMessage(error.code);
    throw new Error(errorMessage);
  }
};

// Handles user logout
export const handleLogOut = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export const observeAuthState = (callback) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      process.env.SHOW_CONSOLE === "dev" &&
        console.log("User is signed in:", user);
    } else {
      process.env.SHOW_CONSOLE === "dev" && console.log("User is signed out.");
    }
    callback(user);
  });
};

export const deleteUserAccount = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    try {
      await deleteUser(user);
      process.env.SHOW_CONSOLE === "dev" &&
        console.log("User account deleted successfully.");
    } catch (error) {
      console.error("Error deleting user account:", error);
      const errorMessage = getErrorMessage(error.code);
      throw new Error(errorMessage);
    }
  } else {
    throw new Error("No authenticated user found to delete");
  }
};

const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already in use with another account. Please use a different email.";
    case "auth/weak-password":
      return "The password is too weak. Please use a stronger password with at least 6 characters.";
    case "auth/invalid-email":
      return "The email address is invalid. Please check and try again.";
    case "auth/user-disabled":
      return "This user account has been disabled by an administrator.";
    case "auth/missing-password":
      return "Missing password. Please enter a password.";
    case "auth/missing-email":
      return "Missing email. Please enter a email.";

    case "auth/user-not-found":
      return "No user found with this email. Please check the email entered or sign up.";
    case "auth/wrong-password":
      return "Wrong password. Please try again or use 'Forgot password' to reset it.";
    case "auth/too-many-requests":
      return "We have detected too many requests from your device. Please take a break then try again later.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection and try again.";
    case "auth/operation-not-allowed":
      return "This operation is not allowed. Please contact support.";
    case "auth/requires-recent-login":
      return "This operation is sensitive and requires recent authentication. Log in again before retrying this request.";
    case "auth/invalid-credential":
      return "The supplied credential is invalid. This may happen if it is malformed or has expired. Please try again or use a different authentication method.";
    default:
      return "An unexpected error occurred. Please try again later.";
  }
};
