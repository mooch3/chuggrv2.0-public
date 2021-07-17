import Dashboard from "../../components/Dashboard/Dashboard";
import nookies from "nookies";
import { verifyIdToken } from "../../firebaseAdmin";
import { firebaseClient } from "../../firebaseClient";
import db from "../../utils/db";
import firebase from "firebase";
import "firebase/firestore";

const PendingBets = ({ newBets, session, userName}) => {
  firebaseClient();

  if (session) {
    const { uid } = session
    return (
      <>
        <Dashboard bets={newBets} main={false} pending={true} uid={uid} userName={userName} firebase={firebase} />
      </>
    );
  }
};

export default PendingBets;

export const getServerSideProps = async (context) => {
  let newBets = [];
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid } = token;

    const userSnapshot = await db.collection('testUsers').doc(uid).get();

    const querySnapshot = await db
      .collection("testBets")
      .where("allUsers", "array-contains", uid)
      .get();

    querySnapshot.forEach((bet) => {
   
      if (bet.data().invitedUsers.hasOwnProperty(uid)) {
        newBets.push(bet.data());
      }
    });
    return {
      props: {
        newBets,
        userName: userSnapshot.data().userName,
        session: {
          uid: uid,
        },
      },
    };
  } catch (err) {
    context.res.writeHead(302, { location: "/auth" });
    context.res.end();
    return { props: {} };
  }
};
