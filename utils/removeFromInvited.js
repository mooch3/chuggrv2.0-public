import firebase from "firebase"
import "firebase/firestore"

export const removeFromInvited = (betID, uid) => {
    firebase.firestore().collection('testBets').doc(betID).set({
        invitedUsers: {
            [uid]: firebase.firestore.FieldValue.delete(),
        }
    }, { merge: true })
}