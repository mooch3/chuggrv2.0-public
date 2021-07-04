import classes from "./DashboardDisplay.module.css";
import { dateFormat } from "../../../helpers/dateFormat";
import { findStatus } from "../../../helpers/findStatus";
import { displayTeams } from "../../../helpers/displayTeams";
import { useRouter } from "next/router";

const DUMMY_USER = "XjPmsoFbmibsoga1WRsUT5PBgGY2";

const DashboardDisplay = ({ bet, main }) => {

  const router = useRouter();

  const handleRoute = () => {
    router.push(`/bets/${bet.betID}`)
  }
  return (
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
        <p>{findStatus(bet, DUMMY_USER)}</p>
      </div>
      <div>
      {main && <p onClick={handleRoute}>Bet Details</p>}
      {bet.allUsers.includes(DUMMY_USER) && !main && <p>Delete Bet</p>}
        
      </div>
    </div>
  );
};

export default DashboardDisplay;
