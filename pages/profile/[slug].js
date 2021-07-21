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

const Uid = ({ profile, session, bets, errorCode, user }) => {
  firebaseClient();
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  if (session) {
    return (
      <>
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
            {bets.map((bet) => (
              <Tile key={bet.betID} bet={bet} user={user} />
            ))}
          </TileGrid>
          {bets.length === 0 && (
            <h3 className="centered">
              <em>No bets to display.</em>
            </h3>
          )}
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
    const token = await verifyIdToken(cookies.token);
    const { uid } = token;

    const { slug } = context.params;

    const profileSnapshot = await db.collection("testUsers").doc(slug).get();

    const profileBets = await db
      .collection("testBets")
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
