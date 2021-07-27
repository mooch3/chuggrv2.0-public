import firebase from "firebase";
import "firebase/firestore";

export const decrementBets = async (uid) => {
    try {
        const user = await firebase.firestore().collection('testUsers').doc(uid).get();

        if (user.data().numBets > 0) {
            firebase.firestore().collection('testUsers').doc(uid).update({
                numBets: firebase.firestore.FieldValue.increment(-1)
            })
        } else {
            return;
        }

    } catch (err) {
        console.log(err);
    }
}