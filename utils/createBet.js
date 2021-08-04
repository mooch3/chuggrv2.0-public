import firebase from "firebase/app";
import "firebase/firestore";

export const incrementBetTotal = (uid) => {
  try {
    const userRef = firebase.firestore().collection("users").doc(uid);
    userRef.update({ numBets: firebase.firestore.FieldValue.increment(1) });

    // user should be incremented
  } catch (err) {
    console.log(err);
  }
};

const createBetChat = (betID) => {
  firebase
    .firestore()
    .collection("chatRooms")
    .doc(betID)
    .set({ betID: betID });
};

const createBet = (bet, uid) => {
  try {
    const betRef = firebase.firestore().collection("bets").doc();
    betRef.set({ ...bet, ...{ betID: betRef.id } });
    createBetChat(betRef.id);
    incrementBetTotal(uid);
  } catch (err) {
    console.log(err);
  }
};

export default createBet;
