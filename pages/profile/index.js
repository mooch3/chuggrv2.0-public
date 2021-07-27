import ProfileDisplay from "../../components/ProfileDisplay/ProfileDisplay";
import TileGrid from "../../components/Friends/TileGrid";
import Tile from "../../components/Friends/Tile";
import Card from "../../components/UI/Card";
import Row from "../../components/Layout/Row/Row";
import { firebaseClient } from "../../firebaseClient";
import nookies from "nookies";
import { verifyIdToken } from "../../firebaseAdmin";
import db from "../../utils/db";
import Head from 'next/head';

const Profile = ({ user, pastBets, session }) => {
  firebaseClient();

  if (session) {
    return (
      <>
      <Head>
        <title>{user?.userName}'s Profile</title>
        <meta
          name="description"
          content={`${user.userName}'s CHUGGR profile`}
        />
      </Head>
        <Row>
          <h1
            style={{
              textTransform: "uppercase",
              letterSpacing: ".6rem",
              margin: "3rem auto 1rem auto",
              textAlign: "center"
            }}
          >
            Profile Details
          </h1>
          <Card>
            <ProfileDisplay profile={user} />
          </Card>
          <h1
            style={{
              textTransform: "uppercase",
              letterSpacing: ".6rem",
              margin: "3rem auto 1rem auto",
            }}
          >
            Past Bets
          </h1>

          <TileGrid>
            <>
              {pastBets.map((bet) => (
                <Tile key={bet.betID} bet={bet} user={user} />
              ))}
            </>
            {pastBets.length === 0 && (
            <h3 className="centered" style={{gridArea: "1/2"}}>
              <em>No bets to display.</em>
            </h3>
          )}
          </TileGrid>

        </Row>
      </>
    );
  }
};

export default Profile;

export const getServerSideProps = async (context) => {
  let pastBets = [];
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.__session);
    const { uid } = token;

    const userSnapshot = await db.collection("testUsers").doc(uid).get();
    const betSnapshot = await db
      .collection("testBets")
      .where("acceptedUsers", "array-contains", uid)
      .where("isFinished", "==", true)
      .get();

    betSnapshot.forEach((bet) => {
      pastBets.push(bet.data());
    });

    return {
      props: {
        user: userSnapshot.data(),
        pastBets,
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
