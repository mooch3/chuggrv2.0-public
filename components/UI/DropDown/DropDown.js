import { useEffect, useState } from "react";
import classes from "./DropDown.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const DropDown = ({ items, resetThenSet, title, friendDD, onCloseList }) => {
  const [headerTitle, setHeaderTitle] = title ? useState(title) : useState("");
  const [listOpen, setListOpen] = useState(false);

  useEffect(() => {
    items.forEach(item => {
      item.selected = false;
    });

    return; 
  }, [items])

  const toggleList = () => {
    setListOpen(prevValue => !prevValue);
  };

  const handleSelectItem = (item) => {
        const { id, title } = item;

        setListOpen(false);
        setHeaderTitle(title);
        resetThenSet(id);
  }

  const handleToggleItem = (item) => {
      resetThenSet(item)
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
            onClick={!friendDD ? () => handleSelectItem(item) : () => handleToggleItem(item)}
          >
            {item.title} {item.selected && <FontAwesomeIcon icon={faCheck} />}
          </button>
        ))}
      </div>
      )}
    </div>
  );
};

export default DropDown;
