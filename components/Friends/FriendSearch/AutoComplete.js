import classes from "./AutoComplete.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import PrettyButton from "../../UI/Buttons/PrettyButton";
import { useAuth } from "../../../auth";
import addFriend from "../../../utils/addFriend";

const AutoComplete = ({ options, friendsList }) => {
  const [activeOption, setActiveOption] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isTouched, setIsTouched] = useState(true);
  const [addError, setAddError] = useState(null);
  const { user } = useAuth();

  const handleChange = (event) => {
    const userInput = event.target.value;
    const filteredOptions = options.filter((option) => {
      const searchName = `${option.firstName} ${option.lastName} (${option.userName})`;
      return (
        searchName.toLowerCase().indexOf(userInput.toLowerCase()) > -1 &&
        option.uid !== user.uid
      );
    });

    setFilteredOptions(filteredOptions);
    setActiveOption(0);
    setShowOptions(true);
    setUserInput(userInput);
    setSelectedFriend(null);
  };

  const handleClick = (event) => {
    setActiveOption(0);
    setShowOptions(false);
    setUserInput(
      `${filteredOptions[activeOption].firstName} ${filteredOptions[activeOption].lastName} (${filteredOptions[activeOption].userName})`
    );
    setSelectedFriend(filteredOptions[activeOption]);

    
  };

  const handleTouch = () => {
    setIsTouched(true);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      setActiveOption(0);
      setShowOptions(false);
      setUserInput(
        `${filteredOptions[activeOption].firstName} ${filteredOptions[activeOption].lastName} (${filteredOptions[activeOption].userName})`
      );
      setSelectedFriend(filteredOptions[activeOption]);
    } else if (event.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      setActiveOption((prevValue) => prevValue - 1);
    } else if (event.keyCode === 40) {
      if (activeOption + 1 === filteredOptions.length) {
        return;
      }

      setActiveOption((prevValue) => prevValue + 1);
    }
  };

  const handleAddFriend = () => {

    if (!selectedFriend) {
      return;
    }

    const friendObj = {
      userName: selectedFriend.userName,
      firstName: selectedFriend.firstName,
      lastName: selectedFriend.lastName,
      uid: selectedFriend.uid
    }
    let uidList = [];

    friendsList.forEach(friend => {
      uidList.push(friend.uid)
    });

    if (uidList.includes(friendObj.uid)) {
      setAddError('You are already friends with this person.');
      return;
    }

    addFriend(friendObj, user.uid);
    setUserInput("")
  
  };

  let optionsList;

  if (showOptions && userInput) {
    if (filteredOptions.length > 0) {
      optionsList = (
        <ul className={classes.options}>
          {filteredOptions.map((option, index) => {
            let className;
            if (index === activeOption) {
              className = classes["option-active"];
            }
            return (
              <li className={className} key={option.uid} onClick={handleClick}>
                {`${option.firstName} ${option.lastName} (${option.userName})`}
              </li>
            );
          })}
        </ul>
      );
    } else {
      optionsList = <div className={classes["no-options"]}>No matches</div>;
    }
  }
  return (
    <>
      <div className={classes.search}>
        <input
          placeholder="Search for friends..."
          onClick={handleTouch}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={userInput}
          type="text"
          className={classes["search-box"]}
        />
        <PrettyButton onClick={handleAddFriend}>Add Friend</PrettyButton>
      </div>
      {isTouched && optionsList}
      {addError && <p>{addError}</p>}
    </>
  );
};

AutoComplete.propTypes = {
  options: PropTypes.instanceOf(Array).isRequired,
};

export default AutoComplete;
