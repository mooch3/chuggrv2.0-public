import firebase from "firebase";
import "firebase/firestore";

export const fulfillBet = (betID, uid, bet) => {
    firebase.firestore().collection('testBets').doc(betID).update({
        outstandingUsers: firebase.firestore.FieldValue.arrayRemove(uid),
    })

    firebase.firestore().collection('testUsers').doc(uid).update({
        "drinksOutstanding.beers": firebase.firestore.FieldValue.increment(bet.stake.beers * -1),
        "drinksOutstanding.shots": firebase.firestore.FieldValue.increment(bet.stake.shots * -1),

    })
}