import { useState } from "react";
import classes from "../BetForms/Form.module.css";
import useForm from "../../hooks/useForm";
import { useAuth } from "../../auth";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { updateProfile } from "../../utils/updateProfile";
import { updateProfilePicture } from "../../utils/updateProfilePicture";
import PrettyButton from "../UI/Buttons/PrettyButton";

const isNotEmpty = (value) => value.trim().length > 0;

const ProfileForm = ({ firstName, lastName, userName, bio, }) => {
  const [progress, setProgress] = useState(0);

  const { user } = useAuth();

  const {
    isValid: fNameValid,
    hasError: fNameHasError,
    valueChangedHandler: fNameChangedHandler,
    onBlurHandler: fNameBlurHandler,
    reset: fNameReset,
    value: fNameValue,
  } = useForm(isNotEmpty, firstName);

  const {
    isValid: lNameValid,
    hasError: lNameHasError,
    valueChangedHandler: lNameChangedHandler,
    onBlurHandler: lNameBlurHandler,
    reset: lNameReset,
    value: lNameValue,
  } = useForm(isNotEmpty, lastName);

  const {
    isValid: usernameValid,
    hasError: usernameHasError,
    valueChangedHandler: usernameChangedHandler,
    onBlurHandler: usernameBlurHandler,
    reset: usernameReset,
    value: usernameValue,
  } = useForm(isNotEmpty, userName);

  const {
    isValid: bioValid,
    hasError: bioHasError,
    valueChangedHandler: bioChangedHandler,
    onBlurHandler: bioBlurHandler,
    reset: bioReset,
    value: bioValue,
  } = useForm(isNotEmpty, bio);

  let formIsValid = false;

  if (fNameValid && lNameValid && usernameValid && bioValid) {
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

  const bioInputClasses = !bioHasError
    ? classes["form-control"]
    : invalidHelper;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    const profileUpdate = {
      firstName: fNameValue,
      lastName: lNameValue,
      userName: usernameValue,
      bio: bioValue,
    };

    updateProfile(profileUpdate, user.uid);
    fNameReset();
    lNameReset();
    usernameReset();
    bioReset();
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`${user.uid}/${file.name}`);
    const uploadTask = storageRef.put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => {
        console.log(err);
      },
      async () => {
        const pictureURL = await storageRef.getDownloadURL();
        // update profile with image
        updateProfilePicture(user.uid, pictureURL);
      }
    );
  };

  return (
    <>
      <h1 className="centered">Edit Profile Details</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={fNameInputClasses}>
          <label htmlFor="fName">First Name</label>
          <input
            type="text"
            autoComplete="off"
            onBlur={fNameBlurHandler}
            onChange={fNameChangedHandler}
            value={fNameValue}
            id="fName"
          />
        </div>
        <div className={lNameInputClasses}>
          <label htmlFor="lName">Last Name</label>
          <input
            type="text"
            autoComplete="off"
            onBlur={lNameBlurHandler}
            onChange={lNameChangedHandler}
            value={lNameValue}
            id="lName"
          />
        </div>
        <div className={usernameInputClasses}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            autoComplete="off"
            onBlur={usernameBlurHandler}
            onChange={usernameChangedHandler}
            value={usernameValue}
            id="username"
          />
        </div>
        <div className={bioInputClasses}>
          <label htmlFor="bio">Bio</label>
          <textarea
            type="text"
            autoComplete="off"
            onBlur={bioBlurHandler}
            onChange={bioChangedHandler}
            value={bioValue}
            id="bio"
          />
        </div>
        {progress !== 100 && (
          <div className={classes.container}>
            <progress value={progress} max="100">
              {progress}%
            </progress>
            <label htmlFor="file-upload" className={classes.uploader}>
              Upload Picture
            </label>
            <input type="file" id="file-upload" onChange={handleUpload} />{" "}
          </div>
        )}
        {progress === 100 && <p>Your profile picture has been uploaded.</p>}
        <div className={classes["form-actions"]}>
          <PrettyButton disabled={!formIsValid}>save changes</PrettyButton>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
