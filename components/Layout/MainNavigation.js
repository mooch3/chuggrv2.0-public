import { useRouter } from "next/router";
import classes from "./MainNavigation.module.css";
import Logo from "./Logo";
import MenuToggler from "./MenuToggler/MenuToggler";
import firebase from "firebase";
import { destroyCookie } from "nookies";
import NavItems from "./NavItems/NavItems";

const MainNavigation = ({ open, openNav }) => {
  const router = useRouter();
  const handleLogout = async () => {
    await firebase.auth().signOut();
    await destroyCookie(null, "__session");
    router.push("/");
  };

  return (
    <>
      <header className={classes.header}>
        <Logo />
        <NavItems active={classes.active} onLogout={handleLogout} />
        <MenuToggler openNav={openNav} open={open} />
      </header>
    </>
  );
};

export default MainNavigation;
