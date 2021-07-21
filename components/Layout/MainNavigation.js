import { useState } from "react";
import { useRouter } from "next/router";
import classes from "./MainNavigation.module.css";
import Logo from "./Logo";
import MenuToggler from "./MenuToggler/MenuToggler";
import firebase from "firebase";
import Overlay from "../UI/Overlay/Overlay";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import { destroyCookie } from "nookies";
import NavItems from "./NavItems/NavItems";

const MainNavigation = ({ open, openNav }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    setLoading(true);
    await firebase.auth().signOut();
    await destroyCookie(null, "token");
    router.push("/");
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <Overlay>
          <LoadingSpinner />
        </Overlay>
      )}
      <header className={classes.header}>
        <Logo />
        <NavItems active={classes.active} onLogout={handleLogout} />
        <MenuToggler openNav={openNav} open={open} />
      </header>
    </>
  );
};

export default MainNavigation;
