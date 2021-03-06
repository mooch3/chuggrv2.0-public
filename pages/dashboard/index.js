import Dashboard from "../../components/Dashboard/Dashboard";
import { firebaseClient } from "../../firebaseClient";
import nookies from "nookies";
import { verifyIdToken } from "../../firebaseAdmin";
import db from "../../utils/db";
import firebase from "firebase/app";
import "firebase/firestore";
import Head from 'next/head';

const FullDashboard = ({ session, bets }) => {
  firebaseClient();

  if (session) {
    const { uid } = session;

    return (
      <>
      <Head>
        <title>Dashboard</title>
        <meta 
          name="description"
          content="CHUGGR dashboard for bets and challenges"
        />
      </Head>
        <Dashboard firebase={firebase} bets={bets} main={true} uid={uid} />
      </>
    );
  }
};

export default FullDashboard;

export const getServerSideProps = async (context) => {
  let bets = [];
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.__session);
    const { uid } = token;

    const querySnapshot = await db
      .collection("bets")
      .where("acceptedUsers", "array-contains", uid)
      .get();

    querySnapshot.forEach((bet) => {
      if (bet.data().outstandingUsers.includes(uid)) {
        bets.push(bet.data());
      } else if (!bet.data().isFinished) {
        bets.push(bet.data());
      }
    });
    return {
      props: {
        bets,
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
