import classes from "./DashboardDisplay.module.css";
import { dateFormat } from "../../../helpers/dateFormat";
import { findStatus } from "../../../helpers/findStatus";
import { displayTeams } from "../../../helpers/displayTeams";
import { useRouter } from "next/router";
import RadioSelect from "../../RadioSelect/RadioSelect";

const DashboardDisplay = ({ bet, main, pending, uid }) => {
  const router = useRouter();


  const handleRoute = () => {
    router.push(`/bets/${bet.betID}`);
  };

  return (
    <>
      {!bet ? (
        <div>
          <h1>No bets to display</h1>
        </div>
      ) : (
        <div className={classes.grid}>
          <div>
            <h4>{bet.title}</h4>
          </div>
          <div>
            {bet.type === "spread" ? (
              <>
                <h4>{bet.type}:</h4>
                <span>{bet.line}</span>
              </>
            ) : (
              <>
                <h4>{bet.type}</h4>
              </>
            )}
          </div>
          <div>
            <h4>Stake:</h4>
            <p>
              🍺 {bet.stake.beers} 🥃 {bet.stake.shots}
            </p>
          </div>
          <div>
            {bet.type === "event" && <h4>For:</h4>}
            {bet.type === "spread" && <h4>Over:</h4>}
            {bet.type === "moneyline" && <h4>{bet.team1}:</h4>}
            <p>{displayTeams(bet.side1Users)}</p>
          </div>
          <div></div>
          <div>
            <h4>Due:</h4>
            <p>{dateFormat(bet.dueDate * 1000)}</p>
          </div>
          <div>
            {bet.type === "event" && <h4>Against:</h4>}
            {bet.type === "spread" && <h4>Under:</h4>}
            {bet.type === "moneyline" && <h4>{bet.team2}:</h4>}
            <p>{displayTeams(bet.side2Users)}</p>
          </div>
          <div>
            <h4>Status:</h4>
            <p>{findStatus(bet, uid)}</p>
          </div>
          <div>
            {main && <p onClick={handleRoute} className={classes.link}>Bet Details</p>}
            {bet.side1Users.hasOwnProperty(uid) ||
              (bet.side2Users.hasOwnProperty(uid) && !main && (
                <p>Delete Bet</p>
              ))}
            {!main && pending && bet.allUsers.includes(uid) && (
              <RadioSelect bet={bet} pending={pending} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardDisplay;
