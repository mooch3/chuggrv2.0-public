import nookies from "nookies";
import { verifyIdToken } from "../../firebaseAdmin";

export const authorizeRoute = async (context) => {
    try {
        const cookies = nookies.get(context);
        const token = await verifyIdToken(cookies.__session);
        const { uid } = token;

        return {
            session: {
                uid: uid,
              }
        }
    } catch (err) {
        context.res.writeHead(302, { location: "/auth" });
        context.res.end();
        return {};
    }
};
