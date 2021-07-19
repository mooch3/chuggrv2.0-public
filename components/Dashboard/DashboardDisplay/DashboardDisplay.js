import classes from "./DashboardDisplay.module.css";
import { dateFormat } from "../../../helpers/dateFormat";
import { findStatus } from "../../../helpers/findStatus";
import { displayTeams } from "../../../helpers/displayTeams";
import { useRouter } from "next/router";
import RadioSelect from "../../RadioSelect/RadioSelect";
import { rejectBet } from "../../../utils/rejectBet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteBet } from "../../../utils/deleteBet";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const DashboardDisplay = ({
  bet,
  main,
  pending,
  uid,
  userName,
  onDeleteBet,
  findBets
}) => {
  const router = useRouter();

  const handleRoute = () => {
    router.push(`/bets/${bet.betID}`);
  };

  const betID = bet?.betID;

  const handleReject = () => {
    // do something
    rejectBet(uid, betID);
  };

  const handleDelete = () => {
    const { allUsers, betID } = bet;
    deleteBet(betID, allUsers);
    onDeleteBet();
  };

  return (
    <>
      {!bet ? (
        <div>
          <h1>No bets to display</h1>
        </div>
      ) : (
        <>
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
            <div>
              {pending && (
                <>
                  <h4>Due:</h4>
                  <p>{dateFormat(bet.dueDate * 1000)}</p>
                </>
              )}
            </div>
            <div>
              {main && (
                <>
                  <h4>Due:</h4>
                  <p>{dateFormat(bet.dueDate * 1000)}</p>
                </>
              )}

              {pending && !main && bet.allUsers.includes(uid) && (
                <RadioSelect
                  bet={bet}
                  pending={pending}
                  betID={betID}
                  uid={uid}
                  userName={userName}
                />
              )}
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
              {main && (
                <button onClick={handleRoute} className={classes.link}>
                  Bet Details <FontAwesomeIcon icon={faInfoCircle} />
                </button>
              )}
              {bet.acceptedUsers.includes(uid) && !main && (
                <div className={classes.delete}>
                  <button onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} /> Delete Bet
                  </button>
                </div>
              )}
              {pending && !findBets && !main && bet.allUsers.includes(uid) && (
                <div className={classes.reject}>
                  <button onClick={handleReject} className={classes.button}>
                    Reject Bet
                  </button>
                </div>
              )}
              {findBets && (
                <RadioSelect
                  bet={bet}
                  pending={pending}
                  betID={betID}
                  uid={uid}
                  userName={userName}
                  uninvited={true}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardDisplay;
