import firebase from "firebase/app";
import "firebase/firestore";

export const updateProfilePicture = (uid, url) => {
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .set({ profilePicURL: url }, { merge: true });
};
