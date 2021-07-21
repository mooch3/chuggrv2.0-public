import Dashboard from "../../components/Dashboard/Dashboard";
import { firebaseClient } from "../../firebaseClient";
import nookies from "nookies";
import { verifyIdToken } from "../../firebaseAdmin";
import db from "../../utils/db";
import firebase from "firebase";
import "firebase/firestore";

const findBetsDashboard = ({ session, userName }) => {
  firebaseClient();

  if (session) {
    const { uid } = session;

    return (
      <>
        <Dashboard findBets={true} uid={uid} userName={userName} firebase={firebase} pending={true} />
      </>
    );
  }
};

export default findBetsDashboard;

export const getServerSideProps = async (context) => {
  let bets = [];
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid } = token;
    
    const userSnapshot = await db.collection("testUsers").doc(uid).get();

    return {
      props: {
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
