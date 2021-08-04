import firebase from "firebase/app";
import "firebase/firestore";

export const addToAllUsers = (betID, uid) => {
    try {
        firebase.firestore().collection('bets').doc(betID).update({
            allUsers: firebase.firestore.FieldValue.arrayUnion(uid),
        })
    } catch (err) {
        console.log(err)
    }
}