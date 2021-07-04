import { useState } from "react";
import Card from "../UI/Card";
import Spread from "./Spread";
import Moneyline from "./Moneyline";
import Event from "./Event";
import DropDown from "../UI/DropDown/DropDown";

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

const BetForms = () => {
  const [bets, setBets] = useState(betOptions);
  const [selectForm, setSelectForm] = useState("");

  const onSelectItem = (id) => {
    const selectedForm = bets.find((item) => item.id === id);

    setSelectForm(selectedForm.id);
  };
  return (
    <Card>
      <DropDown items={bets} resetThenSet={onSelectItem} />
      {selectForm === "spread" && <Spread />}
      {selectForm === "moneyline" && <Moneyline />}
      {selectForm === "event" && <Event />}
    </Card>
  );
};

export default BetForms;
