import firebase from "firebase"
import "firebase/firestore";

export const moveToOutstanding = (betID, uid) => {
    firebase.firestore().collection("bets").doc(betID).update({
        outstandingUsers: firebase.firestore.FieldValue.arrayUnion(uid),
    })
}