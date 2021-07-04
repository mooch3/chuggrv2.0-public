import classes from './Message.module.css'

const Message = ({ sender, message, userName }) => {
  return (
    <>
      {!sender ? (
        <div className={classes["message-box-holder"]}>
          <div className={classes["message-sender"]}>{userName}</div>
          <div className={`${classes["message-box"]} ${classes["message-partner"]}`}>
            {message}
          </div>
        </div>
      ) : (
        <div className={classes["message-box-holder"]}>
          <div className={classes["message-box"]}>{message}</div>
        </div>
      )}
    </>
  );
};

export default Message;
