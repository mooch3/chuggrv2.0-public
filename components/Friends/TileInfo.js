import classes from "./TileInfo.module.css";

const TileInfo = ({ firstName, lastName, userName, friends, bet, user }) => {
  return (
    <div className={classes.info}>
      {friends ? (
        <>
          <h1>{userName.toUpperCase()}</h1>
          <p>{firstName}</p>
          <p>{lastName}</p>{" "}
        </>
      ) : (
        <>
          <h1>{bet?.type.toUpperCase()}</h1>
          <p>{bet?.title}</p>
          <p>
          🍺 {bet?.stake.beers} 🥃 {bet?.stake.shots}
          </p>
          <p>{bet?.winner === "one" && bet?.side1Users.hasOwnProperty(user.uid) && "Won"}</p>
          <p>{bet?.winner === "two" && bet?.side1Users.hasOwnProperty(user.uid) && "Lost"}</p>
          <p>{bet?.winner === "two" && bet?.side2Users.hasOwnProperty(user.uid) && "Won"}</p>
          <p>{bet?.winner === "one" && bet?.side2Users.hasOwnProperty(user.uid) && "Lost"}</p>
        </>
      )}
    </div>
  );
};

export default TileInfo;
