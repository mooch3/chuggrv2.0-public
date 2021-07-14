import firebase from "firebase";
import "firebase/firestore";

const incrementBetTotal = (uid) => {
  try {
    const userRef = firebase.firestore().collection("testUsers").doc(uid);
    userRef.update({ numBets: firebase.firestore.FieldValue.increment(1) });

    // user should be incremented
  } catch (err) {
    console.log(err);
  }
};

const createBet = (bet, uid) => {
  try {
    const betRef = firebase.firestore().collection("testBets").doc();
    betRef.set({ ...bet, ...{ betID: betRef.id } });
    incrementBetTotal(uid);

  } catch (err) {
    console.log(err);
  }
};

export default createBet;
