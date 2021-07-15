import { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import { firebaseClient } from "../../firebaseClient";
import nookies from "nookies";
import { verifyIdToken } from "../../firebaseAdmin";
import db from "../../utils/db";

const FullDashboard = ({ session, bets }) => {
  firebaseClient();

  if (session) {
    const { uid } = session;
    const [pendingBets, setPendingBets] = useState(null);

    useEffect(() => {
      setPendingBets(null);
    }, []);
    return (
      <>
        <Dashboard newBets={pendingBets} bets={bets} main={true} uid={uid} />
      </>
    );
  }
};

export default FullDashboard;

export const getServerSideProps = async (context) => {
  let bets = [];
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid } = token;

    const querySnapshot = await db
      .collection("testBets")
      .where("acceptedUsers", "array-contains", uid)
      .get();

    querySnapshot.forEach((bet) => {
      bets.push(bet.data());
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
