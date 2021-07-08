import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import Footer from './Footer';
import DropDown from "./DropDown/DropDown";
import { useState } from "react";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const openNavHandler = () => {
    setOpen(prevValue => !prevValue);
  }

  const handleSelect = () => {
    setOpen(false);
  }

  return (
    <>
      <MainNavigation openNav={openNavHandler} open={open} />
      {open && <DropDown open={open} close={handleSelect} />}
      {!open && <main className={classes.main}>{children}</main>}
      <Footer />
    </>
  );
};

export default Layout;
