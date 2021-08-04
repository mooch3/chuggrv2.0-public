import classes from "./DropDown.module.css";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth"
import { destroyCookie } from "nookies";
import NavItems from "../NavItems/NavItems";

const DropDown = ({ close }) => {
  const router = useRouter();
  const handleLogout = async () => {
    await firebase.auth().signOut();
    await destroyCookie(null, "__session");
    router.push("/");
  };

  return (
    <>
    <div className={classes.dd} onClick={close}>
    <NavItems
      onLogout={handleLogout}
      active={classes.active}
    />
    </div>
    </>
  );
};

export default DropDown;
