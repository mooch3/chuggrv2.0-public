import classes from './PrettyButton.module.css'

const PrettyButton = ({ type, children, onClick, disabled }) => {
  return (
    <button
      type={type}
      className={classes["pretty-button"]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrettyButton;
