import classes from "./Friends.module.css";
import AutoComplete from "./FriendSearch/AutoComplete";
import TileGrid from "./TileGrid";
import Tile from "./Tile";
import Card from "../UI/Card";

const Friends = ({ friendList, friendSearch }) => {
  return (
    <div className={classes.friends}>
      <Card>
        <h1 className={classes.header}>Find Friends</h1>
        <AutoComplete options={friendSearch} />
      </Card>
      <h1>My Friends</h1>
      <TileGrid>
        {friendList.map((friend) => (
          <Tile
            friends={true}
            firstName={friend.firstName}
            lastName={friend.lastName}
            userName={friend.userName}
            key={friend.uid}
            id={friend.uid}
          />
        ))}
      </TileGrid>
    </div>
  );
};

export default Friends;
