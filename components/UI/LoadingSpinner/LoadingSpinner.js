import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <>
      <div className={classes.container}>
        <img className={classes.rotating} src="./CHUGGRLogo.png" />
      </div>
    </>
  );
};

export default LoadingSpinner;
