import firebase from "firebase/app";
import "firebase/firestore";

export const updateProfile = (updateObj, uid) => {
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .set(updateObj, { merge: true });
};
