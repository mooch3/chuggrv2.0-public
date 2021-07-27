import { useEffect, useState } from "react";

const usePendingBetsListener = (uid, firebase, pending) => {
    const [newBets, setNewBets] = useState([]);

    if (pending) {
      return { newBets }
  }

    useEffect(() => {
        const unsubscribe = firebase
          .firestore()
          .collection("testBets")
          .where("allUsers", "array-contains", uid)
          .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                if (change.doc.data().invitedUsers.hasOwnProperty(uid)) {
                  setNewBets((prevValue) => [...prevValue, change.doc.data()]);
                }
              }
            });
          });
  
        return () => {
          unsubscribe();
          setNewBets([]);
        };
      }, [firebase]);

      return { newBets };
}

export default usePendingBetsListener;