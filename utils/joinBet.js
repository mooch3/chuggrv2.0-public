import firebase from "firebase";
import "firebase/firestore";
import { incrementBetTotal } from "./createBet";
import { removeFromInvited } from "./removeFromInvited";
import { moveToAcceptedUsers } from "./moveToAccepted";

export const joinBet = (side, betID, uid, userName) => {
  let selectedSide;
  if (side === "side1") {
    selectedSide = "side1Users";
  }
  if (side === "side2") {
    selectedSide = "side2Users";
  }

  firebase
    .firestore()
    .collection("testBets")
    .doc(betID)
    .set({
      [selectedSide]: {
        [uid]: userName,
      },
    }, { merge: true});
  incrementBetTotal(uid);
  removeFromInvited(betID, uid);
  moveToAcceptedUsers(betID, uid);
};
