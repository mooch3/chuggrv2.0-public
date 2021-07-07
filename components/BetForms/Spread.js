import { useState } from "react";
import useForm from "../../hooks/useForm";
import PrettyButton from "../UI/Buttons/PrettyButton";
import classes from "./Form.module.css";

const isNotEmpty = (value) => value.trim().length > 0;
const isValidStake = (value) =>
  value.trim().length > 0 && 0 <= value && value < 4 && !isNaN(value);
const isValidLine = (value) => !isNaN(value) && value.trim().length > 0;
const dateIsFuture = (value) =>
  new Date(value) >= Date.now() + 60 * 60 * 1000 * 24;

const authCtx = {
  userName: "D-Rok",
  uid: "0smr2kLqYPcWphcyEuTksgsG3qA2",
};

const Spread = ({ _id, addBet }) => {
  const [side, setSide] = useState("side1");

  const [status, setStatus] = useState("Submit");

  const {
    isValid: titleValid,
    hasError: titleHasError,
    valueChangedHandler: titleChangedHandler,
    onBlurHandler: titleBlurHandler,
    reset: titleReset,
    value: titleValue,
  } = useForm(isNotEmpty);

  const {
    isValid: lineValid,
    hasError: lineHasError,
    valueChangedHandler: lineChangedHandler,
    onBlurHandler: lineBlurHandler,
    reset: lineReset,
    value: lineValue,
  } = useForm(isValidLine);

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
    titleValid &&
    lineValid &&
    dateIsValid &&
    beerValid &&
    shotValid &&
    beerValue + shotValue > 0
  ) {
    formIsValid = true;
  }

  const invalidHelper = `${classes["form-control"]} ${classes["invalid"]}`;

  const titleInputClasses = !titleHasError
    ? classes["form-control"]
    : invalidHelper;
  const lineInputClasses = !lineHasError
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

    const betRef = "Create firebase doc";

    let sideSelect;

    if (side === "side1") {
      sideSelect = {
        side1Users: {
          [authCtx.uid]: authCtx.userName,
        },
        side2Users: {},
      };
    }

    if (side === "side2") {
      sideSelect = {
        side1Users: {},
        side2Users: {
          [authCtx.uid]: authCtx.userName,
        },
      };
    }

    if (!side) {
      return;
    }

    const betObj = {
      acceptedUsers: [authCtx.uid],
      allUsers: [authCtx.uid],
      betID: betRef,
      dateOpened: Date.now() / 1000,
      dueDate: Date.parse(dateValue) / 1000,
      invitedUsers: {},
      isFinished: false,
      line: +lineValue,
      stake: {
        beers: +beerValue,
        shots: +shotValue,
      },
      title: titleValue,
      type: "spread",
    };

    // make async request

    setStatus("Sending...");
    console.log({ ...sideSelect, ...betObj });
    // async call is done
    // addBet({...sideSelect, ...betObj});
    setStatus("Posted");

    titleReset();
    lineReset();
    dateReset();
    beerReset();
    shotReset();
  };

  return (
    <>
      {status === "Posted" ? (
        <h1 className={classes.header}>Your bet has been made.</h1>
      ) : (
        <>
          <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes["control-group"]}>
              <div className={titleInputClasses}>
                <label htmlFor="title">Title</label>
                <input
                  required
                  onBlur={titleBlurHandler}
                  onChange={titleChangedHandler}
                  value={titleValue}
                  autoComplete="off"
                  type="text"
                  id="title"
                />
                {titleHasError && (
                  <p className={classes["invalid-notif"]}>
                    Please enter a title.
                  </p>
                )}
              </div>
              <div className={lineInputClasses}>
                <label htmlFor="line">Line</label>
                <input
                  required
                  onBlur={lineBlurHandler}
                  onChange={lineChangedHandler}
                  value={lineValue}
                  autoComplete="off"
                  type="number"
                  id="line"
                />
                {lineHasError && (
                  <p className={classes["invalid-notif"]}>
                    Please enter a valid number.
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
                <label htmlFor="side1">Over</label>
                <input
                  type="radio"
                  name="select"
                  id="side2"
                  value="side2"
                  onChange={handleRadioChange}
                />
                <label htmlFor="side2">Under</label>
              </div>
            </div>
            <div className={classes["form-actions"]}>
              <PrettyButton disabled={!formIsValid}>{status}</PrettyButton>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Spread;
