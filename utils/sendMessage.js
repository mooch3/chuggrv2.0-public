import firebase from "firebase/app";
import "firebase/firestore";

export const sendMessage = (messageObj, betID) => {
  try {
    firebase
      .firestore()
      .collection("chatRooms")
      .doc(betID)
      .collection("actualMessages")
      .doc()
      .set(messageObj);
  } catch (err) {
    console.log(err);
  }
};
