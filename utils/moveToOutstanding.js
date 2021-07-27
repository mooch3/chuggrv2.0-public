import firebase from "firebase"
import "firebase/firestore";

export const moveToOutstanding = (betID, uid) => {
    firebase.firestore().collection("testBets").doc(betID).update({
        outstandingUsers: firebase.firestore.FieldValue.arrayUnion(uid),
    })
}