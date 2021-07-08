import classes from "../BetForms/Form.module.css";
import useForm from "../../hooks/useForm";
import PrettyButton from "../UI/Buttons/PrettyButton";
import { useState } from "react";

const isNotEmpty = (value) => value.trim().length > 0;
const isValidPass = (value) => value.length > 6;
const isValidEmail = (value) => value.includes("@");

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const {
    isValid: fNameValid,
    hasError: fNameHasError,
    valueChangedHandler: fNameChangedHandler,
    onBlurHandler: fNameBlurHandler,
    reset: fNameReset,
    value: fNameValue,
  } = useForm(isNotEmpty);

  const {
    isValid: lNameValid,
    hasError: lNameHasError,
    valueChangedHandler: lNameChangedHandler,
    onBlurHandler: lNameBlurHandler,
    reset: lNameReset,
    value: lNameValue,
  } = useForm(isNotEmpty);

  const {
    isValid: usernameValid,
    hasError: usernameHasError,
    valueChangedHandler: usernameChangedHandler,
    onBlurHandler: usernameBlurHandler,
    reset: usernameReset,
    value: usernameValue,
  } = useForm(isNotEmpty);

  const {
    isValid: emailValid,
    hasError: emailHasError,
    valueChangedHandler: emailChangedHandler,
    onBlurHandler: emailBlurHandler,
    reset: emailReset,
    value: emailValue,
  } = useForm(isValidEmail);

  const {
    isValid: passwordValid,
    hasError: passwordHasError,
    valueChangedHandler: passwordChangedHandler,
    onBlurHandler: passwordBlurHandler,
    reset: passwordReset,
    value: passwordValue,
  } = useForm(isValidPass);

  const {
    isValid: bioValid,
    hasError: bioHasError,
    valueChangedHandler: bioChangedHandler,
    onBlurHandler: bioBlurHandler,
    reset: bioReset,
    value: bioValue,
  } = useForm(isNotEmpty);

  let formIsValid = false;

  let validCheck;

  isLogin
    ? (validCheck = emailValid && passwordValid)
    : (validCheck =
        fNameValid &&
        lNameValid &&
        usernameValid &&
        emailValid &&
        passwordValid &&
        bioValid);

  if (validCheck) {
    formIsValid = true;
  }

  const invalidHelper = `${classes["form-control"]} ${classes["invalid"]}`;

  const fNameInputClasses = !fNameHasError
    ? classes["form-control"]
    : invalidHelper;
  const lNameInputClasses = !lNameHasError
    ? classes["form-control"]
    : invalidHelper;
  const usernameInputClasses = !usernameHasError
    ? classes["form-control"]
    : invalidHelper;
  const emailInputClasses = !emailHasError
    ? classes["form-control"]
    : invalidHelper;
  const passwordInputClasses = !passwordHasError
    ? classes["form-control"]
    : invalidHelper;
  const bioInputClasses = !bioHasError
    ? classes["form-control"]
    : invalidHelper;

  const switchAuthModeHandler = () => {
    setIsLogin((prevValue) => !prevValue);
  };

  const handleSubmit = (event) => {
    // create firebase account
    event.preventDefault();

    let user;

    !isLogin &&
      (user = {
        bio: bioValue,
        email: emailValue,
        firstName: fNameValue,
        lastName: lNameValue,
        userName: usernameValue,
        // uid: firebase.auth().currentUser.uid
      });

    console.log(user);

    bioReset();
    emailReset();
    fNameReset();
    lNameReset();
    usernameReset();
  };

  return (
    <section>
      <form className={classes.form} onSubmit={handleSubmit}>
        {isLogin && (
          <>
            <div className={emailInputClasses}>
              <label>Email</label>
              <input
                onBlur={emailBlurHandler}
                onChange={emailChangedHandler}
                value={emailValue}
                required
                type="email"
              />
            </div>
            <div className={passwordInputClasses}>
              <label>Password</label>
              <input
                onBlur={passwordBlurHandler}
                onChange={passwordChangedHandler}
                value={passwordValue}
                type="password"
              />
            </div>
          </>
        )}
        {!isLogin && (
          <>
            <div className={classes["control-group"]}>
              <div className={emailInputClasses}>
                <label>Email</label>
                <input
                  onBlur={emailBlurHandler}
                  onChange={emailChangedHandler}
                  value={emailValue}
                  required
                  type="email"
                />
                {emailHasError && (
                  <p className={classes["invalid-notif"]}>
                    Please input a valid email.
                  </p>
                )}
              </div>
              <div className={passwordInputClasses}>
                <label>Password</label>
                <input
                  onBlur={passwordBlurHandler}
                  onChange={passwordChangedHandler}
                  value={passwordValue}
                  type="password"
                />
                {passwordHasError && (
                  <p className={classes["invalid-notif"]}>
                    Your password must be greater than 6 characters.
                  </p>
                )}
              </div>
            </div>
            <div className={classes["control-group"]}>
              <div className={fNameInputClasses}>
                <label>First Name</label>
                <input
                  onBlur={fNameBlurHandler}
                  onChange={fNameChangedHandler}
                  value={fNameValue}
                  required
                  type="text"
                />
                {fNameHasError && (
                  <p className={classes["invalid-notif"]}>
                    The first name field cannot be empty.
                  </p>
                )}
              </div>
              <div className={lNameInputClasses}>
                <label>Last Name</label>
                <input
                  onBlur={lNameBlurHandler}
                  onChange={lNameChangedHandler}
                  value={lNameValue}
                  required
                  type="text"
                />
                {lNameHasError && (
                  <p className={classes["invalid-notif"]}>
                    The last name field cannot be empty.
                  </p>
                )}
              </div>
            </div>
            <div className={usernameInputClasses}>
              <label>Username</label>
              <input
                onBlur={usernameBlurHandler}
                onChange={usernameChangedHandler}
                value={usernameValue}
                required
                type="text"
              />
              {usernameHasError && (
                <p className={classes["invalid-notif"]}>
                  Please input a username.
                </p>
              )}
            </div>
            <div className={bioInputClasses}>
              <label>Bio</label>
              <textarea
                onBlur={bioBlurHandler}
                onChange={bioChangedHandler}
                value={bioValue}
                type="text"
                rows="4"
              />
              {bioHasError && (
                <p className={classes["invalid-notif"]}>
                  Please add some details to your bio.
                </p>
              )}
            </div>
          </>
        )}
        <div className={classes["form-actions"]}>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {!isLogin ? "Login with existing account" : "Create new account"}
          </button>
          <PrettyButton disabled={!formIsValid}>
            {!isLogin ? "Create Account" : "Login"}
          </PrettyButton>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
