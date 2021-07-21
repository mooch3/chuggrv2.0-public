import { useState, useEffect } from "react";
import classes from "./Friends.module.css";
import AutoComplete from "./FriendSearch/AutoComplete";
import TileGrid from "./TileGrid";
import Tile from "./Tile";
import Card from "../UI/Card";

const Friends = ({ friendSearch, firebase, uid }) => {
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("testUsers")
      .doc(uid)
      .collection("testFriends")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            setFriendsList((prevValue) => [...prevValue, change.doc.data()]);
          }
        });
      });

    return () => unsubscribe();
  }, [firebase]);

  return (
    <div className={classes.friends}>
      <Card>
        <h1 className={classes.header}>Find Friends</h1>
        <AutoComplete options={friendSearch} friendsList={friendsList} />
      </Card>
      <h1 className={classes.header}>My Friends</h1>
      <TileGrid>
        {friendsList.map((friend) => (
          <Tile
            friends={true}
            firstName={friend?.firstName}
            lastName={friend?.lastName}
            userName={friend?.userName}
            key={friend?.uid}
            id={friend?.uid}
          />
        ))}
      </TileGrid>
    </div>
  );
};

export default Friends;
