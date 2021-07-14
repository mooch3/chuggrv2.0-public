import admin from "firebase-admin";
import serviceAccount from "./secrets.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chuggr-6a851.firebaseio.com",
  });
}

export const verifyIdToken = (token) => {
  return admin
    .auth()
    .verifyIdToken(token)
    .catch((err) => {
        // TODO: error handling
      throw err;
    });
};