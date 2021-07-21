import firebase from "firebase";
import "firebase/firestore";

export const incrementBeersShotsGiven = (bet, side) => {
  let winners;
  let losers;

  if (side === "side1") {
    winners = bet.side1Users;
    losers = bet.side2Users;
  }
  if (side === "side2") {
    winners = bet.side2Users;
    losers = bet.side1Users;
  }

  if (Object.keys(losers).length > 0) {
    for (const user in winners) {
      firebase
        .firestore()
        .collection("testUsers")
        .doc(user)
        .update({
          "drinksGiven.beers": firebase.firestore.FieldValue.increment(
            bet.stake.beers
          ),
          "drinksGiven.shots": firebase.firestore.FieldValue.increment(
            bet.stake.shots
          ),
        });
    }
  } else {
      return;
  }
};
