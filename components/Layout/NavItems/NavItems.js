import { useAuth } from "../../../auth";
import Link from 'next/link';
import { useRouter } from "next/router";


const NavItems = ({ onLogout, active }) => {
    const router = useRouter();
    const { user } = useAuth();

    const handleLogout = () => {
        onLogout();
    }
    return (
        <ul>
        {!user && (
          <>
            <li>
              <Link href="/">
                <a className={router.pathname === "/" ? active : ""}>
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/auth">
                <a
                  className={
                    router.pathname === "/auth" ? active : ""
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
                    router.pathname === "/dashboard" ? active : ""
                  }
                >
                  Dashboard
                </a>
              </Link>
            </li>
            <li>
              <Link href="/find-bets">
                <a className={router.pathname === "/find-bets" ? active : ""}>
                  Find Bets
                </a>
              </Link>
            </li>
            <li>
              <Link href="/new-bet">
                <a
                  className={
                    router.pathname === "/new-bet" ? active : ""
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
                    router.pathname === "/friends" ? active : ""
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
                    router.pathname === "/profile" ? active : ""
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
    )
}

export default NavItems;