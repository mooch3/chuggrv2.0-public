import { useState } from "react";
import classes from "./DropDown.module.css";
import { useRouter } from "next/router";
import firebase from "firebase";
import Overlay from "../../UI/Overlay/Overlay";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import { destroyCookie } from "nookies";
import NavItems from "../NavItems/NavItems";

const DropDown = ({ close }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await firebase.auth().signOut();
    await destroyCookie(null, "token");
    router.push("/");
    setLoading(false);
  };

  return (
    <>
      {loading && <Overlay><LoadingSpinner /></Overlay>}
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
