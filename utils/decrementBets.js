import firebase from "firebase/app";
import "firebase/firestore";

export const decrementBets = async (uid) => {
    try {
        const user = await firebase.firestore().collection('users').doc(uid).get();

        if (user.data().numBets > 0) {
            firebase.firestore().collection('users').doc(uid).update({
                numBets: firebase.firestore.FieldValue.increment(-1)
            })
        } else {
            return;
        }

    } catch (err) {
        console.log(err);
    }
}