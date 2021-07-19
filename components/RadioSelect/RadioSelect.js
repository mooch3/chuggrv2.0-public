import { useState } from "react";
import PrettyButton from "../UI/Buttons/PrettyButton";
import classes from "./RadioSelect.module.css";
import { joinBet } from "../../utils/joinBet";
import { joinUninvitedBet } from "../../utils/joinUninvitedBet";

const RadioSelect = ({ bet, pending, uid, userName, betID, uninvited }) => {
  const [side, setSide] = useState("side1");

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
    if (uninvited) {
      joinUninvitedBet(side, betID, uid, userName);
    } else {
      joinBet(side, betID, uid, userName);
    }
  };
  return (
    <div className={pending ? classes["pending-container"] : classes.container}>
      {pending ? <h4>Join Bet</h4> : <h1>Close Bet</h1>}
      <form>
        <input
          type="radio"
          name="select"
          id="side1"
          value="side1"
          defaultChecked
          onChange={handleSelect}
        />
        <label htmlFor="side1">{side1}</label>
        <input
          type="radio"
          name="select"
          id="side2"
          value="side2"
          onChange={handleSelect}
        />
        <label htmlFor="side2">{side2}</label>
      </form>
      <PrettyButton onClick={handleJoinBet}>
        {pending ? "Join Bet" : "Close Bet"}
      </PrettyButton>
    </div>
  );
};

export default RadioSelect;
