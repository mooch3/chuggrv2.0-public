import BetForms from "../../components/BetForms/BetForms";
import db from "../../utils/db";
import { verifyIdToken } from "../../firebaseAdmin";
import nookies from "nookies";
import { firebaseClient } from "../../firebaseClient";
import Head from "next/head";

const NewBet = ({ userName, session, allFriends }) => {
  firebaseClient();

  if (session) {
    const { uid } = session;
    return (
      <>
      <Head>
        <title>Create Bets</title>
        <meta
          name="description"
          content="Make a bet on CHUGGR"
        />
      </Head>
        <BetForms userName={userName} uid={uid} allFriends={allFriends} />
      </>
    );
  }
};

export const getServerSideProps = async (context) => {
  // TODO: pack the verifyIdToken and cookie checking process into an exportable function
  let allFriends = [];

  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.__session);
    const { uid } = token;
    const userSnapshot = await db.collection("users").doc(uid).get();
    const friendSnapshot = await db.collection("users").doc(uid).collection("friends").get();
    
    friendSnapshot.forEach(friend => {
        // invitedUsers: {uid: userName} 
      let friendObj = {};
      friendObj.id = friend.data().uid;
      friendObj.title = friend.data().userName;
      friendObj.selected = false;
      allFriends.push(friendObj);
    });

    return {
      props: {
        userName: userSnapshot.data().userName,
        allFriends: allFriends,
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
export default NewBet;
