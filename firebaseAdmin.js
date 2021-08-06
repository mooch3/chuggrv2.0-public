import admin from "firebase-admin";
import serviceAccount from "./secrets.json";
import firebase from "firebase/app";
import { destroyCookie } from "nookies";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chuggr-6a851.firebaseio.com",
  });
}

const logout = async () => {
  await firebase.auth().signOut();
  await destroyCookie(null, "__session");
};

export const verifyIdToken = (token) => {
  return admin
    .auth()
    .verifyIdToken(token)
    .catch((err) => {
      // TODO: error handling
      logout();
      throw err;
    });
};
