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
import { removeFromInvited } from "../../../utils/removeFromInvited";

const DashboardDisplay = ({
  bet,
  main,
  uid,
  userName,
  onDeleteBet,
  findBets,
  onRejectBet,
  onAcceptBet
}) => {
  const router = useRouter();

  const handleRoute = () => {
    router.push(`/bets/${bet.betID}`);
  };

  const betID = bet?.betID;

  const handleReject = () => {
    // do something
    rejectBet(uid, betID);
    removeFromInvited(betID, uid)
    onRejectBet();
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
          <h2>No bets to display</h2>
        </div>
      ) : (
        <>
          <div className={classes.grid}>
            <div>
              <h4 className={classes.wrap}>{bet.title}</h4>
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
              {bet.type === "moneyline" && <h4 className={classes.wrap}>{bet.team1}:</h4>}
              <p >{displayTeams(bet.side1Users)}</p>
            </div>
            <div>
              {!bet.acceptedUsers.includes(uid) && (
                <>
                  <h4>Due:</h4>
                  <p>{dateFormat(bet.dueDate * 1000)}</p>
                </>
              )}
            </div>
            <div>
              {bet.acceptedUsers.includes(uid) && (
                <>
                  <h4>Due:</h4>
                  <p>{dateFormat(bet.dueDate * 1000)}</p>
                </>
              )}

              {bet.allUsers.includes(uid) &&
                !bet.acceptedUsers.includes(uid) && (
                  <RadioSelect
                    bet={bet}
                    betID={betID}
                    uid={uid}
                    userName={userName}
                    onAcceptBet={onAcceptBet}
                  />
                )}
            </div>
            <div>
              {bet.type === "event" && <h4>Against:</h4>}
              {bet.type === "spread" && <h4>Under:</h4>}
              {bet.type === "moneyline" && <h4 className={classes.wrap}>{bet.team2}:</h4>}
              <p>{displayTeams(bet.side2Users)}</p>
            </div>
            <div>
              <h4>Status:</h4>
              {findStatus(bet, uid)}
            </div>
            <div>
              {main && (
                <button onClick={handleRoute} className={classes.link}>
                  Bet Details <FontAwesomeIcon icon={faInfoCircle} />
                </button>
              )}
              {bet.acceptedUsers.includes(uid) && !bet.isFinished && !main && (
                <div className={classes.delete}>
                  <button onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} /> Delete Bet
                  </button>
                </div>
              )}
              {!findBets &&
                !main &&
                bet.allUsers.includes(uid) &&
                !bet.isFinished &&
                !bet.acceptedUsers.includes(uid) && (
                  <div className={classes.reject}>
                    <button onClick={handleReject} className={classes.button}>
                      Reject Bet
                    </button>
                  </div>
                )}
              {findBets &&
                !bet.allUsers.includes(uid) &&
                !bet.invitedUsers.hasOwnProperty(uid) && (
                  <RadioSelect
                    bet={bet}
                    betID={betID}
                    uid={uid}
                    userName={userName}
                    uninvited={!bet.invitedUsers.hasOwnProperty(uid)}
                    onAcceptBet={onAcceptBet}
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
