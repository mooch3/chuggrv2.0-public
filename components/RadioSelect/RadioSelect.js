import PrettyButton from "../UI/Buttons/PrettyButton";
import classes from "./RadioSelect.module.css";

const RadioSelect = ({ bet, pending }) => {
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
  return (
    <div className={pending ? classes['pending-container'] : classes.container}>
     {pending  ? <h4>Join Bet</h4> : <h1>Close Bet</h1>}
      <form>
        <input type="radio" name="select" id="side1" />
        <label htmlFor="side1">{side1}</label>
        <input type="radio" name="select" id="side2" />
        <label htmlFor="side2">{side2}</label>
      </form>
      <PrettyButton>{pending ? "Join Bet" : "Close Bet"}</PrettyButton>
    </div>
  );
};

export default RadioSelect;
