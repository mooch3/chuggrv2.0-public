import { useState, useEffect } from "react";

const useListener = (findBets, main, firebase, uid) => {
  const [pendingBets, setPendingBets] = useState(null);

  const query = findBets
  ? firebase
      .firestore()
      .collection("testBets")
      .where("isFinished", "==", false)
      .where("dueDate", ">", Date.now() / 1000)
  : firebase
      .firestore()
      .collection("testBets")
      .where("allUsers", "array-contains", uid)
      .where("isFinished", "==", false)

    if (main) {
        return { pendingBets }
    }

  useEffect(() => {
    let data = [];

    const unsubscribe = query.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {

        const parameter = findBets
          ? change.doc.data().allUsers.includes(uid)
          : !change.doc.data().invitedUsers.hasOwnProperty(uid);

        if (change.type === "added") {
          if (!parameter) {
            data.push(change.doc.data());
            setPendingBets([...data]);
          }
        }
        if (change.type === "modified") {
          if (parameter) {
            // if all uid in allUsers then filter out bet
            data = data.filter((bet) => bet.betID !== change.doc.data().betID);
            setPendingBets([...data]);
          }
          // filter out old documents, then replace
          if (!parameter) {
            data = data.filter((bet) => bet.betID !== change.doc.data().betID);
            setPendingBets([...data, change.doc.data()]);
          }
        }
        if (change.type === "removed") {
          data = data.filter((bet) => bet.betID !== change.doc.data().betID);
          setPendingBets([...data]);
        }
      });
    });
    return () => {
      unsubscribe();
      setPendingBets([]);
    };
  }, [firebase]);

  return { pendingBets };
};

export default useListener;
