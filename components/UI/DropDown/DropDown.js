import { useState } from "react";
import classes from "./DropDown.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const DropDown = ({ items, resetThenSet }) => {
  const [headerTitle, setHeaderTitle] = useState("Select a bet type...");
  const [listOpen, setListOpen] = useState(false);

  const toggleList = () => {
    setListOpen(prevValue => !prevValue);
  };

  const handleSelectItem = (item) => {
        const { id, title } = item;

        setListOpen(false);
        setHeaderTitle(title);

        resetThenSet(id);
  }

  return (
    <div className={classes.wrapper}>
      <button className={classes.header} type="button" onClick={toggleList}>
        <div className={classes["header-title"]}>{headerTitle}</div>
        {listOpen ? (
          <FontAwesomeIcon icon={faAngleUp} size="2x" />
        ) : (
          <FontAwesomeIcon icon={faAngleDown} size="2x" />
        )}
      </button>
      {listOpen && (
      <div className={classes.list}>
        {items.map((item) => (
          <button
            className={classes["list-item"]}
            type="button"
            key={item.id}
            onClick={() => handleSelectItem(item)}
          >
            {item.title}
          </button>
        ))}
      </div>
      )}
    </div>
  );
};

export default DropDown;
