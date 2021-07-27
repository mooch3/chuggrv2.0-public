import firebase from "firebase";
import "firebase/firestore";

export const moveToAcceptedUsers = (betID, uid) => {
  firebase
    .firestore()
    .collection("testBets")
    .doc(betID)
    .update({
      acceptedUsers: firebase.firestore.FieldValue.arrayUnion(uid),
    });
};
