import { useRouter } from "next/router";
import Link from "next/link";
import classes from "./MainNavigation.module.css";
import Logo from "./Logo";

const MainNavigation = () => {
  const router = useRouter();
  return (
    <>
      <header className={classes.header}>
        <Logo />
        <ul>
          <li>
            <Link href="/">
              <a className={router.pathname === "/" ? classes.active : ""}>
                Home
              </a>
            </Link>
          </li>
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
                className={router.pathname === "/new-bet" ? classes.active : ""}
              >
                New Bet
              </a>
            </Link>
          </li>
          <li>
            <Link href="/friends">
              <a
                className={router.pathname === "/friends" ? classes.active : ""}
              >
                Friends
              </a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a
                className={router.pathname === "/profile" ? classes.active : ""}
              >
                Profile
              </a>
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
};

export default MainNavigation;
