import { useState } from "react";
import Row from "../../components/Layout/Row/Row";
import Card from "../../components/UI/Card";
import ProfileDisplay from "../../components/ProfileDisplay/ProfileDisplay";
import TileGrid from "../../components/Friends/TileGrid";
import Tile from "../../components/Friends/Tile";
import nookies from "nookies";
import db from "../../utils/db";
import { firebaseClient } from "../../firebaseClient";
import { verifyIdToken } from "../../firebaseAdmin";
import Error from "next/error";
import Head from "next/head";
import ViewMore from "../../components/UI/ViewMore/ViewMore";

const Uid = ({ profile, session, bets, errorCode, user }) => {
  firebaseClient();
  const [index, setIndex] = useState(3);

  const handleViewMore = () => {
    if (index + 3 > bets.length) {
      setIndex(bets.length);
      return;
    }
    setIndex(prevValue => prevValue + 3);
  }
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }
  
  if (session) {
    return (
      <>
      <Head>
        <title>{profile?.userName}'s Profile</title>
        <meta
          name="description"
          content={`${profile.userName}'s CHUGGR profile`}
        />
      </Head>
        <Row>
          <h1
            style={{
              textTransform: "uppercase",
              letterSpacing: ".6rem",
              margin: "3rem auto 3rem auto",
              textAlign: "center",
            }}
          >
            Profile Details
          </h1>
          <Card>
            <ProfileDisplay profile={profile} />
          </Card>
          <h1
            style={{
              textTransform: "uppercase",
              letterSpacing: ".6rem",
              margin: "3rem auto 0 auto",
              textAlign: "center",
            }}
          >
            Past Bets
          </h1>
          <TileGrid>
            {bets.slice(0, index).map((bet) => (
              <Tile key={bet.betID} bet={bet} user={user} />
            ))}
          </TileGrid>
          {bets.length === 0 && (
            <h3 className="centered">
              <em>No bets to display.</em>
            </h3>
          )}
          {bets.length > index && <ViewMore onScroll={handleViewMore} tooltip="view more bets" />}
        </Row>
      </>
    );
  }
};

export default Uid;

export const getServerSideProps = async (context) => {
  let pastBets = [];

  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.__session);
    const { uid } = token;

    const { slug } = context.params;

    const profileSnapshot = await db.collection("users").doc(slug).get();

    const profileBets = await db
      .collection("bets")
      .where("acceptedUsers", "array-contains", slug)
      .where("isFinished", "==", true)
      .get();

    profileBets.forEach((bet) => {
      pastBets.push(bet.data());
    });

    const errorCode = profileSnapshot.exists ? false : 404;

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
        profile: profileSnapshot.data(),
        user: {
          uid: profileSnapshot.data().uid,
        },
        bets: pastBets,
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
