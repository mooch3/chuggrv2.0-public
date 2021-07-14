import { useState } from "react";
import classes from "./DashboardTable.module.css";
import { dateFormat } from "../../../helpers/dateFormat";
import { findStatus } from "../../../helpers/findStatus";
import { useAuth } from "../../../auth";

const DashboardTable = ({ bets, onSelectBet }) => {

  const { user } = useAuth();
  const { uid } = user;

  const [selectBet, setSelectBet] = bets.length === 0
    ? useState(null)
    : useState(bets[0].betID);

  const handleClick = (bet) => {
    onSelectBet(bet);
    setSelectBet(bet.betID);
  };

  return (
    <>
      {!bets ? (
        <div className="centered">
          <h1>No current bets.</h1>
        </div>
      ) : (
        <div className={classes["table-responsive"]}>
          <table>
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Bet Type</th>
                <th scope="col">Stake</th>
                <th scope="col">Due</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {bets.map((bet) => (
                <tr
                  key={bet.betID}
                  onClick={() => handleClick(bet)}
                  className={selectBet === bet.betID ? classes.active : ""}
                >
                  <th scope="row">
                    {bet.title.length > 25
                      ? `${bet.title.substring(0, 25)}...`
                      : bet.title}
                  </th>
                  <td>{bet.type}</td>
                  <td>
                    🍺 {bet.stake.beers} 🥃 {bet.stake.shots}
                  </td>
                  <td>{dateFormat(bet.dueDate * 1000)}</td>
                  <td>{findStatus(bet, uid)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DashboardTable;
