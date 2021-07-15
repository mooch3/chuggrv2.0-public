import { useState } from "react";
import classes from "./DropDown.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../../auth";
import firebase from "firebase";
import Overlay from "../../UI/Overlay/Overlay";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";

const DropDown = ({ close }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await firebase.auth().signOut();
    router.push("/");
    setLoading(false);
  };

  return (
    <>
      {loading && <Overlay><LoadingSpinner /></Overlay>}
    <div className={classes.dd} onClick={close}>
      <ul>
        {!user && (
          <>
            <li>
              <Link href="/">
                <a className={router.pathname === "/" ? classes.active : ""}>
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/auth">
                <a
                  className={router.pathname === "/auth" ? classes.active : ""}
                >
                  Log in
                </a>
              </Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <Link href="/dashboard">
                <a
                  className={
                    router.pathname === "/dashboard" ? classes.active : ""
                  }
                >
                  Dashboard
                </a>
              </Link>
            </li>
            <li>
                <Link href="/find-bets">
                  <a className={router.pathname === "/find-bets" ? classes.active : ""}>
                    Find Bets
                  </a>
                </Link>
              </li>
            <li>
              <Link href="/new-bet">
                <a
                  className={
                    router.pathname === "/new-bet" ? classes.active : ""
                  }
                >
                  New Bet
                </a>
              </Link>
            </li>
            <li>
              <Link href="/friends">
                <a
                  className={
                    router.pathname === "/friends" ? classes.active : ""
                  }
                >
                  Friends
                </a>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <a
                  className={
                    router.pathname === "/profile" ? classes.active : ""
                  }
                >
                  Profile
                </a>
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Sign out</button>
            </li>
          </>
        )}
      </ul>
    </div>
    </>
  );
};

export default DropDown;
