import firebase from "firebase";
import "firebase/firestore";

export const decrementBets = (uid) => {
    try {
        firebase.firestore().collection('testUsers').doc(uid).update({
            numBets: firebase.firestore.FieldValue.increment(-1)
        })
    } catch (err) {
        console.log(err);
    }
}