import { useState } from "react";
import useForm from "../../hooks/useForm";
import PrettyButton from "../UI/Buttons/PrettyButton";
import classes from "./Form.module.css";
import { useAuth } from "../../auth";

const isNotEmpty = (value) => value.trim().length > 0;
const isValidStake = (value) =>
  value.trim().length > 0 && 0 <= value && value < 4 && !isNaN(value);
const dateIsFuture = (value) =>
  new Date(value) >= Date.now() + 60 * 60 * 1000 * 24;

const Moneyline = ({ addBet, userName }) => {
  const { user } = useAuth();

  const [side, setSide] = useState("side1");

  const [status, setStatus] = useState("Submit");

  const {
    isValid: teamOneValid,
    hasError: teamOneHasError,
    valueChangedHandler: teamOneChangedHandler,
    onBlurHandler: teamOneBlurHandler,
    reset: teamOneReset,
    value: teamOneValue,
  } = useForm(isNotEmpty);

  const {
    isValid: teamTwoValid,
    hasError: teamTwoHasError,
    valueChangedHandler: teamTwoChangedHandler,
    onBlurHandler: teamTwoBlurHandler,
    reset: teamTwoReset,
    value: teamTwoValue,
  } = useForm(isNotEmpty);

  const {
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangedHandler: dateChangedHandler,
    onBlurHandler: dateBlurHandler,
    reset: dateReset,
    value: dateValue,
  } = useForm(dateIsFuture);

  const {
    isValid: beerValid,
    hasError: beerHasError,
    valueChangedHandler: beerChangedHandler,
    onBlurHandler: beerBlurHandler,
    reset: beerReset,
    value: beerValue,
  } = useForm(isValidStake);

  const {
    isValid: shotValid,
    hasError: shotHasError,
    valueChangedHandler: shotChangedHandler,
    onBlurHandler: shotBlurHandler,
    reset: shotReset,
    value: shotValue,
  } = useForm(isValidStake);

  const handleRadioChange = (event) => {
    setSide(event.target.value);
  };

  let formIsValid = false;

  if (
    teamOneValid &&
    teamTwoValid &&
    dateIsValid &&
    beerValid &&
    shotValid &&
    beerValue + shotValue > 0
  ) {
    formIsValid = true;
  }

  const invalidHelper = `${classes["form-control"]} ${classes["invalid"]}`;

  const teamOneInputClasses = !teamOneHasError
    ? classes["form-control"]
    : invalidHelper;
  const teamTwoInputClasses = !teamTwoHasError
    ? classes["form-control"]
    : invalidHelper;
  const dateInputClasses = !dateHasError
    ? classes["form-control"]
    : invalidHelper;
  const beerInputClasses = !beerHasError
    ? classes["form-control"]
    : invalidHelper;
  const shotInputClasses = !shotHasError
    ? classes["form-control"]
    : invalidHelper;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    let sideSelect;

    if (side === "side1") {
      sideSelect = {
        side1Users: {
          [user.uid]: userName,
        },
        side2Users: {},
      };
    }

    if (side === "side2") {
      sideSelect = {
        side1Users: {},
        side2Users: {
          [user.uid]: userName,
        },
      };
    }

    if (!side) {
      return;
    }

    const betObj = {
      acceptedUsers: [user.uid],
      allUsers: [user.uid],
      dateOpened: Date.now() / 1000,
      dueDate: Date.parse(dateValue) / 1000,
      invitedUsers: {},
      isFinished: false,
      stake: {
        beers: +beerValue,
        shots: +shotValue,
      },
      title: `${teamOneValue} vs. ${teamTwoValue} `,
      team1: teamOneValue,
      team2: teamTwoValue,
      type: "moneyline",
    };

    // make async request

    setStatus("Sending...");
    // async call is done
    addBet({...sideSelect, ...betObj});
    setStatus("Posted");

    teamOneReset();
    teamTwoReset();
    dateReset();
    beerReset();
    shotReset();
  };

  return (
    <>
      {status === "Posted" ? (
        <h1 className={classes.header}>Your bet has been made.</h1>
      ) : (
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes["control-group"]}>
            <div className={teamOneInputClasses}>
              <label htmlFor="team1">Team 1</label>
              <input
                required
                onBlur={teamOneBlurHandler}
                onChange={teamOneChangedHandler}
                value={teamOneValue}
                autoComplete="off"
                type="text"
                id="team1"
              />
              {teamOneHasError && (
                <p className={classes["invalid-notif"]}>
                  Please enter a team or person's name for this side.
                </p>
              )}
            </div>
            <div className={teamTwoInputClasses}>
              <label htmlFor="team2">Team 2</label>
              <input
                required
                onBlur={teamTwoBlurHandler}
                onChange={teamTwoChangedHandler}
                value={teamTwoValue}
                autoComplete="off"
                type="text"
                id="team1"
              />
              {teamTwoHasError && (
                <p className={classes["invalid-notif"]}>
                  Please enter a team or person's name for this side.
                </p>
              )}
            </div>
          </div>
          <div className={classes["control-group"]}>
            <div className={beerInputClasses}>
              <label htmlFor="beers">🍺 Beers</label>
              <input
                required
                onBlur={beerBlurHandler}
                onChange={beerChangedHandler}
                value={beerValue}
                autoComplete="off"
                type="number"
                id="beers"
              />
              {beerHasError && (
                <p className={classes["invalid-notif"]}>
                  Please select a number of beers to bet that is between 0 and
                  4.
                </p>
              )}
              {beerValue + shotValue <= 0 && (
                <p className={classes["invalid-notif"]}>
                  You must bet at least 1 drink.
                </p>
              )}
            </div>
            <div className={shotInputClasses}>
              <label htmlFor="shots">🥃 Shots</label>
              <input
                required
                onBlur={shotBlurHandler}
                onChange={shotChangedHandler}
                value={shotValue}
                autoComplete="off"
                type="number"
                id="shots"
              />
              {shotHasError && (
                <p className={classes["invalid-notif"]}>
                  Please select a number of shots to bet that is between 0 and
                  4.
                </p>
              )}
            </div>
          </div>
          <div className={classes["control-group"]}>
            <div className={dateInputClasses}>
              <label htmlFor="date">Bet Due Date</label>
              <input
                required
                onBlur={dateBlurHandler}
                onChange={dateChangedHandler}
                value={dateValue}
                autoComplete="off"
                type="date"
                id="date"
              />
              {dateHasError && (
                <p className={classes["invalid-notif"]}>
                  The date must be one full day in the future.
                </p>
              )}
            </div>
            <div className={classes["radio-control"]}>
              <input
                type="radio"
                name="select"
                id="side1"
                defaultChecked
                value="side1"
                onChange={handleRadioChange}
              />
              <label htmlFor="side1">Team 1</label>
              <input
                type="radio"
                name="select"
                id="side2"
                value="side2"
                onChange={handleRadioChange}
              />
              <label htmlFor="side2">Team 2</label>
            </div>
          </div>
          <div className={classes["form-actions"]}>
            <PrettyButton disabled={!formIsValid}>{status}</PrettyButton>
          </div>
        </form>
      )}
    </>
  );
};

export default Moneyline;
