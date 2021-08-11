import { useState, useEffect } from "react";
import classes from "./Friends.module.css";
import AutoComplete from "./FriendSearch/AutoComplete";
import TileGrid from "./TileGrid";
import Tile from "./Tile";
import Card from "../UI/Card";
import ViewMore from "../UI/ViewMore/ViewMore";

const Friends = ({ friendSearch, firebase, uid }) => {
  const [friendsList, setFriendsList] = useState([]);
  const [index, setIndex] = useState(3);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("friends")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            setFriendsList((prevValue) => [...prevValue, change.doc.data()]);
          }
        });
      });

    return () => unsubscribe();
  }, [firebase]);

  const handleViewMore = () => {
    if (index + 3 >= friendsList.length) {
      setIndex(friendsList.length);
      return;
    }
    setIndex((prevValue) => prevValue + 3);
  };

  return (
    <div className={classes.friends}>
      <Card>
        <h1 className={classes.header}>Find Friends</h1>
        <AutoComplete options={friendSearch} friendsList={friendsList} />
      </Card>
      <h1 className={classes.header}>My Friends</h1>
      <TileGrid>
        {friendsList.slice(0, index).map((friend) => (
          <Tile
            friends={true}
            firstName={friend?.firstName}
            lastName={friend?.lastName}
            userName={friend?.userName}
            profilePicURL={friend?.profilePicURL}
            key={friend?.uid}
            id={friend?.uid}
          />
        ))}
      </TileGrid>
      {index < friendsList.length && (
        <ViewMore onScroll={handleViewMore} tooltip="View More Friends" />
      )}
    </div>
  );
};

export default Friends;
