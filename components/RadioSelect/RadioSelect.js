import { useState } from "react";
import PrettyButton from "../UI/Buttons/PrettyButton";
import classes from "./RadioSelect.module.css";
import { joinBet } from "../../utils/joinBet";
import { joinUninvitedBet } from "../../utils/joinUninvitedBet";
import { incrementBeersShotsGiven } from "../../utils/incrementBeersShotsGiven";
import { incrementBeersShotsReceived } from "../../utils/incrementBeersShotsReceived";
import { setWinner } from "../../utils/setWinner";
import { fulfillBet } from "../../utils/fulfillBet";
import { sliceString } from "../../helpers/sliceString";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const RadioSelect = ({ bet, uid, userName, betID, onAcceptBet }) => {
  const [side, setSide] = useState("side1");
  const [isClosed, setIsClosed] = useState(false);
  const [isFulfilled, setIsFulfilled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleSelect = (event) => {
    setSide(event.target.value);
  };

  let side1;
  let side2;
  if (bet?.type === "spread") {
    side1 = "Over";
    side2 = "Under";
  }

  if (bet?.type === "event") {
    side1 = "For";
    side2 = "Against";
  }

  if (bet?.type === "moneyline") {
    side1 = bet.team1;
    side2 = bet.team2;
  }

  const handleJoinBet = () => {
    if (!bet?.allUsers.includes(uid)) {
      joinUninvitedBet(side, betID, uid, userName);
      onAcceptBet();
    } else {
      joinBet(side, betID, uid, userName);
      onAcceptBet();
    }
  };

  const handleCloseBet = () => {
    incrementBeersShotsReceived(bet, side);
    incrementBeersShotsGiven(bet, side);
    setWinner(betID, side);
    setIsClosed(true);
  };

  const handleFulfillBet = () => {
    fulfillBet(betID, uid, bet);
    setIsFulfilled(true);
  };

  const handleUpload = (event) => {
    console.log(event.target.files[0]);

    if (event.target.files[0]?.type !== "video/mp4") {
      setError("The video must be in mp4 format for browser compatibility.");
      return;
    }

    if (event.target.files[0]?.size > 50000000) {
      setError("The video must be less than 50 megabytes.");
      return;
    }

    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`${betID}/${file.name}`);
    const uploadTask = storageRef.put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => {
        // Error
        console.log(err);
      },
      async () => {
        // file completed upload
        console.log("file uploaded");
        // set reference in firestore to this bets videos
        const downloadURL = await storageRef.getDownloadURL();

        firebase
          .firestore()
          .collection("videos")
          .doc(betID)
          .set(
            {
              videos: firebase.firestore.FieldValue.arrayUnion({
                userName: userName,
                uid: uid,
                timestamp: Date.now() / 1000,
                url: downloadURL,
              }),
            },
            { merge: true }
          );
      }
    );
  };

  return (
    <div
      className={
        bet?.acceptedUsers.includes(uid)
          ? classes.container
          : classes["pending-container"]
      }
    >
      {!bet?.acceptedUsers.includes(uid) &&
        !bet?.isFinished &&
        bet?.dueDate > Date.now() / 1000 && <h4>Join Bet</h4>}
      {bet?.acceptedUsers.includes(uid) && !bet?.isFinished && !isClosed && (
        <h1>Close Bet</h1>
      )}
      {bet?.isFinished && bet?.outstandingUsers.includes(uid) && (
        <h4>Did you finish your drinks?</h4>
      )}
      {!bet?.isFinished && !isClosed && (
        <form>
          <input
            type="radio"
            name="select"
            id="side1"
            value="side1"
            defaultChecked
            onChange={handleSelect}
          />
          <label htmlFor="side1">
            {side1?.length > 10 ? sliceString(side1, 10) : side1}
          </label>
          <input
            type="radio"
            name="select"
            id="side2"
            value="side2"
            onChange={handleSelect}
          />
          <label htmlFor="side2">
            {side2?.length > 10 ? sliceString(side2, 10) : side2}
          </label>
        </form>
      )}
      {!bet?.acceptedUsers.includes(uid) &&
        !bet?.isFinished &&
        bet?.dueDate > Date.now() / 1000 && (
          <PrettyButton onClick={handleJoinBet}>Join Bet</PrettyButton>
        )}
      {bet?.acceptedUsers.includes(uid) && !bet?.isFinished && !isClosed && (
        <PrettyButton onClick={handleCloseBet}>Close Bet</PrettyButton>
      )}
      {bet?.isFinished && bet?.outstandingUsers.includes(uid) && !isFulfilled && (
        <>
          {progress !== 100 && (
            <>
              <progress value={progress} max="100">
                {progress}%
              </progress>
              <label htmlFor="file-upload" className={classes.uploader}>
                Upload a Video
              </label>
              {error && <p className={classes.error}>{error}</p>}
            </>
          )}
          {progress === 100 && <p>Upload Complete!</p>}
          <input type="file" id="file-upload" onChange={handleUpload} />
          <PrettyButton onClick={handleFulfillBet}>Yes</PrettyButton>
        </>
      )}
      {isClosed && (
        <h1>This bet is now closed. Make sure the bet gets fulfilled!</h1>
      )}
      {isFulfilled && <h1>Nice job fulfilling your bet.</h1>}
      {bet?.isFinished &&
        !bet?.outstandingUsers.includes(uid) &&
        bet?.winner === "one" && <h1>{side1} Won!</h1>}
      {bet?.isFinished &&
        !bet?.outstandingUsers.includes(uid) &&
        bet?.winner === "two" && <h1>{side2} Won!</h1>}
    </div>
  );
};

export default RadioSelect;
