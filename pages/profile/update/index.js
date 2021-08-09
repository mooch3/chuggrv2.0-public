import ProfileForm from "../../../components/ProfileForm/ProfileForm";
import db from "../../../utils/db";
import { firebaseClient } from "../../../firebaseClient";
import nookies from "nookies";
import { verifyIdToken } from "../../../firebaseAdmin";
import Card from "../../../components/UI/Card";

const ProfileUpdatePage = ({ user, session }) => {
  firebaseClient();
  if (session) {
    return (
      <Card>
        <ProfileForm
          firstName={user.firstName}
          lastName={user.lastName}
          userName={user.userName}
          bio={user.bio}
        />
      </Card>
    );
  }
};

export default ProfileUpdatePage;

export const getServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.__session);
    const { uid } = token;
    const userSnapshot = await db.collection("users").doc(uid).get();

    return {
      props: {
        user: userSnapshot.data(),
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
