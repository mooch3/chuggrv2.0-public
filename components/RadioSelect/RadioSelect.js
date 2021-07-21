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

const RadioSelect = ({ bet, uid, userName, betID, onAcceptBet }) => {
  const [side, setSide] = useState("side1");
  const [isClosed, setIsClosed] = useState(false);
  const [isFulfilled, setIsFulfilled] = useState(false);

  const handleSelect = (event) => {
    setSide(event.target.value);
  };

  let side1;
  let side2;
  if (bet.type === "spread") {
    side1 = "Over";
    side2 = "Under";
  }

  if (bet.type === "event") {
    side1 = "For";
    side2 = "Against";
  }

  if (bet.type === "moneyline") {
    side1 = bet.team1;
    side2 = bet.team2;
  }

  const handleJoinBet = () => {
    if (!bet.allUsers.includes(uid)) {
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
    setIsClosed(true)
  };

  const handleFulfillBet = () => {
    fulfillBet(betID, uid, bet)
    setIsFulfilled(true);
  };

  return (
    <div
      className={
        bet.acceptedUsers.includes(uid) ? classes.container : classes["pending-container"]
      }
    >
      {!bet.acceptedUsers.includes(uid) &&
        !bet.isFinished &&
        bet.dueDate > Date.now() / 1000 && <h4>Join Bet</h4>}
      {bet.acceptedUsers.includes(uid) && !bet.isFinished && <h1>Close Bet</h1>}
      {bet.isFinished && bet.outstandingUsers.includes(uid) && (
        <h4>Did you finish your drinks?</h4>
      )}
      {!bet.isFinished && !isClosed && (
        <form>
          <input
            type="radio"
            name="select"
            id="side1"
            value="side1"
            defaultChecked
            onChange={handleSelect}
          />
          <label htmlFor="side1">{side1.length > 10 ? sliceString(side1, 10) : side1}</label>
          <input
            type="radio"
            name="select"
            id="side2"
            value="side2"
            onChange={handleSelect}
          />
          <label htmlFor="side2">{side2.length > 10 ? sliceString(side2, 10) : side2}</label>
        </form>
      )}
      {!bet.acceptedUsers.includes(uid) &&
        !bet.isFinished &&
        bet.dueDate >
          Date.now() /
            1000 && (<PrettyButton onClick={handleJoinBet}>Join Bet</PrettyButton>)}
      {bet.acceptedUsers.includes(uid) && !bet.isFinished && !isClosed &&  (
        <PrettyButton onClick={handleCloseBet}>Close Bet</PrettyButton>
      )}
      {bet.isFinished && bet.outstandingUsers.includes(uid) && !isFulfilled && (
        <PrettyButton onClick={handleFulfillBet}>Yes</PrettyButton>
      )}
      {isClosed && <h1>Make sure the bet gets fulfilled!</h1>}
      {isFulfilled && <h1>Nice job fulfilling your bet.</h1>}
      {bet.isFinished && !bet.outstandingUsers.includes(uid) && bet.winner === "one" && <h1>{side1} Won!</h1> }
      {bet.isFinished && !bet.outstandingUsers.includes(uid) && bet.winner === "two" && <h1>{side2} Won!</h1>}

    </div>
  );
};

export default RadioSelect;
