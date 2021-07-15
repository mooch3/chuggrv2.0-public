import Friends from "../../components/Friends/Friends";
import nookies from "nookies";
import { verifyIdToken } from "../../firebaseAdmin";
import { firebaseClient } from "../../firebaseClient";
import db from "../../utils/db";
import firebase from "firebase";
import "firebase/firestore";

const friendsPage = ({ friendSearch, session }) => {
  firebaseClient();

  if (session) {
    const { uid } = session;
    return <Friends friendSearch={friendSearch} firebase={firebase} uid={uid} />;
  }
};

export default friendsPage;

export const getServerSideProps = async (context) => {
  let friendSearch = [];

  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid } = token;

    const friendSearchSnapshot = await db
      .collection("testUsers")
      .get();

    friendSearchSnapshot.forEach((user) => {
      friendSearch.push(user.data());
    });

    return {
      props: {
        friendSearch: friendSearch,
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
