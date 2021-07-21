import firebase from "firebase";
import "firebase/firestore";

export const addToAllUsers = (betID, uid) => {
    try {
        firebase.firestore().collection('testBets').doc(betID).update({
            allUsers: firebase.firestore.FieldValue.arrayUnion(uid),
        })
    } catch (err) {
        console.log(err)
    }
}