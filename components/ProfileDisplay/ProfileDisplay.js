import classes from "./ProfileDisplay.module.css";

const ProfileDisplay = ({ profile }) => {
  return (
    <div className={classes.grid}>
      <div>
        <img src="/CHUGGRLogo.png" />
      </div>
      <div>
        <h3>{profile.userName}</h3>
      </div>
      <div>
        <h3>
          {profile.firstName} {profile.lastName}
        </h3>
      </div>
      <div>
        <h4>Following</h4>
        <h4>{profile.numFriends} Friends</h4>
      </div>
      <div>
        <h4>Given:</h4>
        <p>
          🍺 {profile.drinksGiven.beers} 🥃 {profile.drinksGiven.shots}
        </p>
      </div>
      <div>
        <h4>Received:</h4>
        <p>
          🍺 {profile.drinksReceived.beers} 🥃 {profile.drinksReceived.shots}
        </p>
      </div>
      <div>
        <h4>{profile.bio}</h4>
      </div>
      <div></div>
      <div>
        <h4>Outstanding:</h4>
        <p>
          🍺 {profile.drinksOutstanding.beers} 🥃{" "}
          {profile.drinksOutstanding.shots}
        </p>
      </div>
      <div>
        <p>{profile.numBets} Bets Made</p>{" "}
      </div>
      <div>
        <p>{profile.betsWon} Bets Won</p>{" "}
      </div>
      <div>
        <p>{profile.betsLost} Bets Losts</p>{" "}
      </div>
    </div>
  );
};

export default ProfileDisplay;
