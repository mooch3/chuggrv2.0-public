import { useEffect, useState, useRef } from "react";
import classes from "./Chat.module.css";
import Message from "./Message";
import { sendMessage } from "../../utils/sendMessage";

const Chat = ({ firebase, user, title, userName, betId }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const messagesEndRef = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("testChatRooms")
      .doc(betId)
      .collection("actualMessages")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // TODO: page refresh duplicates all messages
            setMessages((prevValue) => [...prevValue, change.doc.data()]);
            scrollToBottom();
          }
        });
      });

    return () => {
      setMessages([]);
      unsubscribe();
    };
  }, [firebase]);

  const handleChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    const message = {
      body: messageInput,
      uid: user,
      userName: userName,
      timestamp: Date.now() / 1000,
    };

    if (event.keyCode === 13) {
      sendMessage(message, betId);
      setMessageInput("");
    }
  };

  const handleSend = (event) => {
    // TODO: allow user to send messages by pressing the enter key
    const message = {
      body: messageInput,
      uid: user,
      userName: userName,
      timestamp: Date.now() / 1000,
    };
    sendMessage(message, betId);
    setMessageInput("");
  };

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
          {messages.map((message) => (
            <Message
              message={message?.body}
              sender={message?.uid === user}
              key={message?.id}
              userName={message?.userName}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className={classes["chat-input-holder"]}>
        <input
          type="text"
          className={classes["chat-input"]}
          autoComplete="off"
          value={messageInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <input
          type="submit"
          value="Send"
          className={classes["message-send"]}
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default Chat;
