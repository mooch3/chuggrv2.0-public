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
import firebase from "firebase/app";
import "firebase/firestore";
import Head from "next/head";
import { Videos } from "../../../components/Videos/Videos";

const betSlug = ({ bet, session, userName }) => {
  firebaseClient();
  const [isDeleted, setIsDeleted] = useState(null);

  const handleDelete = () => {
    setIsDeleted(true);
  };
  if (session) {
    const { uid } = session;

    return (
      <>
        <Head>
          <title>{bet?.title}</title>
          <meta name="description" content="A bet made on CHUGGR." />
        </Head>
        {isDeleted && <h1 className="centered">This bet has been deleted.</h1>}
        {!isDeleted && (
          <Row>
            <h1
              style={{
                textTransform: "uppercase",
                letterSpacing: ".6rem",
                margin: "3rem auto 3rem auto",
                textAlign: "center",
              }}
            >
              Bet Details
            </h1>
            <Card>
              <DashboardDisplay
                bet={bet}
                uid={uid}
                onDeleteBet={handleDelete}
              />
            </Card>
            {bet?.acceptedUsers.includes(uid) && (
              <Chat
                user={uid}
                firebase={firebase}
                betId={bet?.betID}
                title={bet?.title}
                userName={userName}
              />
            )}
            <RadioSelect
              bet={bet}
              uid={uid}
              betID={bet?.betID}
              userName={userName}
            />
            <Videos betID={bet?.betID} />
          </Row>
        )}
      </>
    );
  }
};

export default betSlug;

export const getServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.__session);
    const { uid } = token;

    const { betSlug } = context.params;

    const betSnapshot = await db.collection("bets").doc(betSlug).get();
    const userSnapshot = await db.collection("users").doc(uid).get();

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
