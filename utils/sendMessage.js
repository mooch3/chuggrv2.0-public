import firebase from "firebase";
import "firebase/firestore";

export const sendMessage = (messageObj, betID) => {
  try {
    firebase
      .firestore()
      .collection("testChatRooms")
      .doc(betID)
      .collection("actualMessages")
      .doc()
      .set(messageObj);
  } catch (err) {
    console.log(err);
  }
};
