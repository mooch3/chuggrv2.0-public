import Dashboard from "../../components/Dashboard/Dashboard";
import nookies from "nookies";
import { verifyIdToken } from "../../firebaseAdmin";
import { firebaseClient } from "../../firebaseClient";
import db from "../../utils/db";
import firebase from "firebase/app";
import "firebase/firestore";
import Head from "next/head";

const PendingBets = ({ session, userName }) => {
  firebaseClient();

  if (session) {
    const { uid } = session;
    return (
      <>
      <Head>
        <title>Pending Bets</title>
        <meta
          name="description"
          content="Bets you've been invited to on CHUGGR"
        />
      </Head>
        <Dashboard
          main={false}
          pending={true}
          uid={uid}
          userName={userName}
          firebase={firebase}
        />
      </>
    );
  }
};

export default PendingBets;

export const getServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.__session);
    const { uid } = token;

    const userSnapshot = await db.collection("users").doc(uid).get();

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
