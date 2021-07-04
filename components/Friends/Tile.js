import { useRouter } from "next/router";
import classes from "./Tile.module.css";
import TileInfo from "./TileInfo";

const Tile = ({ firstName, lastName, userName, id, friends, bet, user }) => {
  const router = useRouter();

  const showPostHandler = () => {
    if (!bet) {
      router.push(`/profile/${id}`);
    }
    if (bet) {
      router.push(`/bets/${bet.betID}`);
    }

  };

  return (
    <div
      onClick={showPostHandler}
      className={classes.tile}
      style={{ backgroundImage: `url(/CHUGGRLogoSM.png)` }}
    >
      <TileInfo
        bet={bet}
        friends={friends}
        firstName={firstName}
        lastName={lastName}
        userName={userName}
        user={user}
      />
    </div>
  );
};

export default Tile;
