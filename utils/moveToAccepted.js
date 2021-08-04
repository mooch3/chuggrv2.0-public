import firebase from "firebase/app";
import "firebase/firestore";

export const moveToAcceptedUsers = (betID, uid) => {
  firebase
    .firestore()
    .collection("bets")
    .doc(betID)
    .update({
      acceptedUsers: firebase.firestore.FieldValue.arrayUnion(uid),
    });
};
