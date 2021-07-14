import Friends from "../../components/Friends/Friends";
import nookies from "nookies";
import { verifyIdToken } from "../../firebaseAdmin";
import { firebaseClient } from "../../firebaseClient";
import db from "../../utils/db";
import firebase from "firebase";
import "firebase/firestore";

const DUMMY_DATA = [
  {
    firstName: "David",
    lastName: "Meuschke",
    uid: "1H6NmAURoIObziexAYUXaWiBYFo1",
    userName: "Papa Bear",
  },
  {
    firstName: "Derek",
    lastName: "Smith",
    uid: "1H6NmAURoIObziexAYU31XaWiBYFo1",
    userName: "Daddy",
  },
  {
    firstName: "Daniel",
    lastName: "Luo",
    uid: "1H6NmAURo1frbziexAYU31XaWiBYFo1",
    userName: "Bolderkat",
  },
];

const DUMMY_SEARCH = [
  "Daniel",
  "David",
  "Caleb",
  "Tory",
  "Darnell",
  "Damian",
  "Derek",
  "Darren",
];

const friendsPage = ({ friendSearch, session }) => {
  firebaseClient();

  if (session) {
    return <Friends friendSearch={friendSearch} firebase={firebase}/>;
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
