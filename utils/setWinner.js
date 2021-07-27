import firebase from "firebase";
import "firebase/firestore";

export const setWinner = (betID, side) => {
  let winningSide;
  if (side === "side1") {
    winningSide = "one";
  }
  if (side === "side2") {
    winningSide = "two";
  }
  firebase.firestore().collection("testBets").doc(betID).set(
    {
      winner: winningSide,
      isFinished: true,
      dateFinished: Date.now() / 1000,
      invitedUsers: {},
    },
    { merge: true }
  );
};
