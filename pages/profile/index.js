import ProfileDisplay from "../../components/ProfileDisplay/ProfileDisplay";
import TileGrid from "../../components/Friends/TileGrid";
import Tile from "../../components/Friends/Tile";
import Card from "../../components/UI/Card";
import Row from "../../components/Layout/Row/Row";
import { firebaseClient } from "../../firebaseClient";
import nookies from "nookies";
import { verifyIdToken } from "../../firebaseAdmin";
import db from "../../utils/db";

const Profile = ({ user, pastBets, session }) => {
  firebaseClient();

  if (session) {
    return (
      <>
        <Row>
          <h1 className="centered">Profile Details</h1>
          <Card>
            <ProfileDisplay profile={user} />
          </Card>
          <h1 className="centered">Past Bets</h1>

          <TileGrid>
            <>
              {pastBets.map((bet) => (
                <Tile key={bet.betID} bet={bet} user={user} />
              ))}
            </>
          </TileGrid>
          {pastBets.length === 0 && (
            <h3 className="centered"><em>No bets to display.</em></h3>
          )}
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
    const token = await verifyIdToken(cookies.token);
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
