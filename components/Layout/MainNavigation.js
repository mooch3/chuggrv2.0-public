import { useState } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import classes from "./MainNavigation.module.css";
import Logo from "./Logo";
import MenuToggler from "./MenuToggler/MenuToggler";
import { useAuth } from "../../auth";
import firebase from "firebase";
import Overlay from '../UI/Overlay/Overlay';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

const MainNavigation = ({ open, openNav }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await firebase.auth().signOut();
    router.push("/");
    setLoading(false);
  }

  return (
    <>
    {loading && <Overlay><LoadingSpinner /></Overlay>}
      <header className={classes.header}>
        <Logo />
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
                    className={
                      router.pathname === "/auth" ? classes.active : ""
                    }
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
                <button
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </li>
            </>
          )}
        </ul>
        <MenuToggler openNav={openNav} open={open} />
      </header>
    </>
  );
};

export default MainNavigation;
