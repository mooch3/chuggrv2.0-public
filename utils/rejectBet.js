import firebase from "firebase/app";
import "firebase/firestore";
import { removeFromInvited } from "./removeFromInvited";

export const rejectBet = (uid, betID) => {
  firebase
    .firestore()
    .collection("bets")
    .doc(betID)
    .set(
      {
        allUsers: firebase.firestore.FieldValue.arrayRemove(uid),
      },
      { merge: true }
    );

  removeFromInvited(betID, uid);
};
