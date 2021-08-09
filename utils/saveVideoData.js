import firebase from "firebase/app";
import "firebase/firestore";

export const saveVideoData = (betID, userName, uid, url) => {
    firebase
    .firestore()
    .collection("videos")
    .doc(betID)
    .set(
      {
        videos: firebase.firestore.FieldValue.arrayUnion({
          userName: userName,
          uid: uid,
          timestamp: Date.now() / 1000,
          url: url,
        }),
      },
      { merge: true }
    );
}