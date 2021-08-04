import firebase from "firebase/app";
import "firebase/firestore";

const incrementFriendTotal = (uid) => {
  try {
    const userRef = firebase.firestore().collection("users").doc(uid);
    userRef.update({ numFriends: firebase.firestore.FieldValue.increment(1) });

    // user should be incremented
  } catch (err) {
    console.log(err);
  }
};

const addFriend = (friendObj, uid) => {
  try {

    firebase.firestore().collection('users').doc(uid).collection('friends').doc(friendObj.uid).get().then(doc => {
        if (!doc.exists) {
            firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .collection("friends")
            .doc(friendObj.uid)
            .set(friendObj);
      
            incrementFriendTotal(uid);
        } else if (doc.exists) {
            return;
        }
    })


  } catch (err) {
    console.log(err);
  }
};

export default addFriend;