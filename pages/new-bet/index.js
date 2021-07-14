import BetForms from "../../components/BetForms/BetForms";
import db from "../../utils/db";
import { verifyIdToken } from "../../firebaseAdmin";
import nookies from "nookies";
import { firebaseClient } from "../../firebaseClient";

const NewBet = ({ userName, session }) => {
  firebaseClient();

  if (session) {
    return (
      <>
        <BetForms userName={userName} />
      </>
    );
  }
};

export const getServerSideProps = async (context) => {
  // TODO: pack the verifyIdToken and cookie checking process into an exportable function
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid } = token;
    const userSnapshot = await db.collection("testUsers").doc(uid).get();

    return {
      props: {
        userName: userSnapshot.data().userName,
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
