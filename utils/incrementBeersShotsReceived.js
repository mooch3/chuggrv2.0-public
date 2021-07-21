import firebase from "firebase";
import "firebase/firestore";
import { moveToOutstanding } from "./moveToOutstanding";

export const incrementBeersShotsReceived = (bet, side) => {
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
      for (const user in losers) {
        firebase
          .firestore()
          .collection("testUsers")
          .doc(user)
          .update({
            "drinksReceived.beers": firebase.firestore.FieldValue.increment(
              bet.stake.beers
            ),
            "drinksReceived.shots": firebase.firestore.FieldValue.increment(
              bet.stake.shots
            ),
            "drinksOutstanding.beers": firebase.firestore.FieldValue.increment(
                bet.stake.beers
            ),
            "drinksOutstanding.shots": firebase.firestore.FieldValue.increment(
                bet.stake.shots
            )
          });
          moveToOutstanding(bet.betID, user);
      }
}