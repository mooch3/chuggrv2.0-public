import classes from "./Chat.module.css";
import Message from "./Message";

const Chat = ({ messages, user, title }) => {
  return (
    <div className={classes["bet-chat"]}>
      <div className={`${classes["chatbox"]} ${classes["group-chat"]}`}>
        <div className={classes["chatbox-top"]}>
          <div className={classes["chatbox-avatar"]}>
            <img src="/CHUGGRLogoSM.png" alt="" />
          </div>
          <div className={classes["chat-group-name"]}>
            <h4>{title}</h4>
          </div>
        </div>
        <div className={classes["chat-messages"]}>
          {/* Map messages here */}
          {/* Check if sender is logged in user */}
          {messages.map((message) => (
            <Message
              message={message.body}
              sender={message.uid === user.uid}
              key={message.id}
              userName={message.userName}
            />
          ))}
        </div>
      </div>
      <div className={classes["chat-input-holder"]}>
        <input type="text" className={classes["chat-input"]} autoComplete="off"></input>
        <input type="submit" value="Send" className={classes["message-send"]} />
      </div>
      </div>

  );
};

export default Chat;
