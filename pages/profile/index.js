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
          <Card>
            <ProfileDisplay profile={user} />
          </Card>

          <TileGrid>
            {pastBets.length > 0 && (
              <>
                {pastBets.map((bet) => (
                  <Tile key={bet.betID} bet={bet} user={user} />
                ))}
              </>
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
    const token = await verifyIdToken(cookies.token);
    const { uid } = token;

    const userSnapshot = await db.collection("testUsers").doc(uid).get();
    const betSnapshot = await db
      .collection("testBets")
      .where("acceptedUsers", "array-contains", uid)
      .where("isFinished", "==", true)
      .get();

    betSnapshot.forEach((bet) => {
      console.log(bet.data());
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
