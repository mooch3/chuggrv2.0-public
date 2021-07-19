import { useState } from "react";
import Card from "../UI/Card";
import Spread from "./Spread";
import Moneyline from "./Moneyline";
import Event from "./Event";
import DropDown from "../UI/DropDown/DropDown";
import createBet from "../../utils/createBet";
import { firebaseClient } from "../../firebaseClient";

const betOptions = [
  {
    id: "spread",
    title: "Spread",
  },
  {
    id: "moneyline",
    title: "Moneyline",
  },
  {
    id: "event",
    title: "Event",
  },
];

const BetForms = ({ userName, uid, allFriends }) => {
  firebaseClient();

  const [bets, setBets] = useState(betOptions);
  const [selectForm, setSelectForm] = useState("");

  const onSelectItem = (id) => {
    const selectedForm = bets.find((item) => item.id === id);

    setSelectForm(selectedForm.id);
  };

  const onAddBet = (betObj) => {
    createBet(betObj, uid);
  };
  // TODO: allow users to invite friends to bet

  return (
    <Card>
      <DropDown
        items={bets}
        resetThenSet={onSelectItem}
        title="Select a bet type..."
      />
      {selectForm === "spread" && (
        <Spread addBet={onAddBet} userName={userName} allFriends={allFriends} />
      )}
      {selectForm === "moneyline" && (
        <Moneyline
          addBet={onAddBet}
          userName={userName}
          allFriends={allFriends}
        />
      )}
      {selectForm === "event" && (
        <Event addBet={onAddBet} userName={userName} allFriends={allFriends} />
      )}
    </Card>
  );
};

export default BetForms;
