import firebase from "firebase";
import "firebase/firestore";
import { removeFromInvited } from "./removeFromInvited";

export const rejectBet = (uid, betID) => {
  firebase
    .firestore()
    .collection("testBets")
    .doc(betID)
    .set(
      {
        allUsers: firebase.firestore.FieldValue.arrayRemove(uid),
      },
      { merge: true }
    );

  removeFromInvited(betID, uid);
};
