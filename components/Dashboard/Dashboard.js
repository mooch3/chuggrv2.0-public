import { useState } from "react";
import DashboardTable from "./DashboardTable/DashboardTable";
import DashboardDisplay from "./DashboardDisplay/DashboardDisplay";
import classes from "./Dashboard.module.css";
import Card from "../UI/Card";
import Link from "next/link";
import useListener from "../../hooks/useListener";
import usePendingBetsListener from "../../hooks/usePendingBetsListener";

const Dashboard = ({
  bets,
  main,
  pending,
  uid,
  firebase,
  userName,
  findBets,
}) => {
  const [selectedBet, setSelectedBet] =
    !bets || bets.length === 0 ? useState(null) : useState(bets[0]);
  const { pendingBets } = useListener(findBets, main, firebase, uid);
  const { newBets } = usePendingBetsListener(uid, firebase, pending);
  const [selectedPendingBet, setSelectedPendingBet] = useState(null);

  const handleDisplayBet = (bet) => {
    pending ? setSelectedPendingBet(bet) : setSelectedBet(bet);
  };

  const handleBet = () => {
    setSelectedPendingBet(null);
  };

  return (
    <>
      <div className={classes.dashboard}>
        {newBets.length > 0 && (
          <div className={classes.pending}>
            <Link href="/pending-bets">
              <a>
                You have {newBets.length}{" "}
                {newBets.length === 1 ? "pending bet." : "pending bets."}
              </a>
            </Link>
          </div>
        )}
        {main && <h1 className="centered">Dashboard</h1>}
        {pending && !findBets && <h1 className="centered">Pending Bets</h1>}
        {findBets && <h1 className="centered">Find Bets to Join</h1>}
        <Card>
          <DashboardDisplay
            bet={pending ? selectedPendingBet : selectedBet}
            main={main}
            pending={pending}
            uid={uid}
            userName={userName}
            findBets={findBets}
            onRejectBet={handleBet}
            onAcceptBet={handleBet}
          />
        </Card>
        <Card>
          <DashboardTable
            bets={pending ? pendingBets : bets}
            onSelectBet={handleDisplayBet}
            uid={uid}
          />
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
