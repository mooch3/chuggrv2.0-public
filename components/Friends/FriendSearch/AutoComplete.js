import classes from "./AutoComplete.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import PrettyButton from "../../UI/Buttons/PrettyButton";
const AutoComplete = ({ options }) => {
  const [activeOption, setActiveOption] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (event) => {
    const userInput = event.target.value;
    const filteredOptions = options.filter(
      (option) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setFilteredOptions(filteredOptions);
    setActiveOption(0);
    setShowOptions(true);
    setUserInput(userInput);
  };

  const handleClick = (event) => {
    setActiveOption(0);
    setFilteredOptions([]);
    setShowOptions(false);
    setUserInput(event.target.innerText);
  };

  const handleTouch = () => {
    setIsTouched(true);
  };

  const handleBlur = () => {
    setIsTouched(false);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      setActiveOption(0);
      setShowOptions(false);
      setUserInput(filteredOptions[activeOption]);
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

  let optionsList;

  if (showOptions && userInput) {
    if (filteredOptions.length > 0) {
      optionsList = (
        <ul className={classes.options}>
          {filteredOptions.map((optionName, index) => {
            let className;
            if (index === activeOption) {
              className = classes["option-active"];
            }
            return (
              <li className={className} key={optionName} onClick={handleClick}>
                {optionName}
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
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={userInput}
          type="text"
          className={classes["search-box"]}
        />
        <PrettyButton>Add Friend</PrettyButton>
      </div>
      {isTouched && optionsList}
    </>
  );
};

AutoComplete.propTypes = {
  options: PropTypes.instanceOf(Array).isRequired,
};

export default AutoComplete;
