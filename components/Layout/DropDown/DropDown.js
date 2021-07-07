import classes from './DropDown.module.css';
import Link from "next/link";
import { useRouter } from 'next/router';

const DropDown = ({ close }) => {

    const router = useRouter();

    return (
        <div className={classes.dd} onClick={close}>
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
        </div>
    )
}

export default DropDown;