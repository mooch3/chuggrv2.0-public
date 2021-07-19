import { useState } from "react";
import Row from "../../../components/Layout/Row/Row";
import DashboardDisplay from "../../../components/Dashboard/DashboardDisplay/DashboardDisplay";
import Card from "../../../components/UI/Card";
import RadioSelect from "../../../components/RadioSelect/RadioSelect";
import Chat from "../../../components/Chat/Chat";
import { verifyIdToken } from "../../../firebaseAdmin";
import db from "../../../utils/db";
import { firebaseClient } from "../../../firebaseClient";
import nookies from "nookies";
import firebase from "firebase";
import "firebase/firestore";

const betSlug = ({ bet, session, userName }) => {
  firebaseClient();
  const [isDeleted, setIsDeleted] = useState(null);
  
  const handleDelete = () => {
    setIsDeleted(true);
  }
  if (session) {
    const { uid } = session;
    

    return (
      <>
      {isDeleted && <h1 className="centered">This bet has been deleted.</h1>}
       {!isDeleted && <Row>
          <h1 className="centered">Bet Details</h1>
          <Card>
            <DashboardDisplay bet={bet} uid={uid} onDeleteBet={handleDelete} />
          </Card>
          <Chat
            user={uid}
            firebase={firebase}
            betId={bet.betID}
            title={bet.title}
            userName={userName}
          />
          <RadioSelect bet={bet} />
        </Row>}
      </>
    );
  }
};

export default betSlug;

export const getServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid } = token;

    const { betSlug } = context.params;

    const betSnapshot = await db.collection("testBets").doc(betSlug).get();
    const userSnapshot = await db.collection("testUsers").doc(uid).get();

    const errorCode = betSnapshot.exists ? false : true;

    if (errorCode) {
      context.res.statusCode = 404;
      return {
        props: {
          errorCode,
          session: {
            uid: uid,
          },
        },
      };
    }

    return {
      props: {
        bet: betSnapshot.data(),
        userName: userSnapshot.data().userName,
        session: {
          uid: uid,
        },
      },
    };
  } catch (err) {
    console.log(err);
    context.res.writeHead(302, { location: "/auth" });
    context.res.end();
    return { props: {} };
  }
};
