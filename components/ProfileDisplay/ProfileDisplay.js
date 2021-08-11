import classes from "./ProfileDisplay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const ProfileDisplay = ({ profile }) => {
  return (
    <div className={classes.grid}>
      <div>
        <img src={profile.profilePicURL ? profile.profilePicURL : "/CHUGGRLogo.png"} />
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
      <div>
        <Link href="/profile/update" >
          <p style={{color: 'blue', cursor: 'pointer'}}>Edit Profile <FontAwesomeIcon icon={faEdit} /></p>
        </Link>
        
      </div>
    </div>
  );
};

export default ProfileDisplay;
