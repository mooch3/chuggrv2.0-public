import firebase from "firebase/app";
import "firebase/firestore";
import { incrementBetTotal } from "./createBet";
import { moveToAcceptedUsers } from "./moveToAccepted";
import { addToAllUsers } from "./addToAllUsers";

export const joinUninvitedBet = (side, betID, uid, userName) => {
  let selectedSide;
  if (side === "side1") {
    selectedSide = "side1Users";
  }
  if (side === "side2") {
    selectedSide = "side2Users";
  }

  firebase
    .firestore()
    .collection("bets")
    .doc(betID)
    .set({
      [selectedSide]: {
        [uid]: userName,
      },
    }, { merge: true});
  incrementBetTotal(uid);
  moveToAcceptedUsers(betID, uid);
  addToAllUsers(betID, uid)
};
