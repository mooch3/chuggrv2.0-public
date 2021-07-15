import { useState } from "react";
import DashboardTable from "./DashboardTable/DashboardTable";
import DashboardDisplay from "./DashboardDisplay/DashboardDisplay";
import classes from "./Dashboard.module.css";
import Card from "../UI/Card";
import Link from "next/link";

const Dashboard = ({ bets, main, pending, newBets, uid }) => {
  const [selectedBet, setSelectedBet] =
    bets.length > 0 ? useState(bets[0]) : useState(null);

  const handleDisplayBet = (bet) => {
    setSelectedBet(bet);
  };

  return (
    <>
      <div className={classes.dashboard}>
        {newBets && newBets.length !== 0 && (
          <div className={classes.pending}>
            <Link href="/pending-bets">
              <a>
                You have {newBets.length}{" "}
                {newBets.length === 1 ? "pending bet." : "pending bets."}
              </a>
            </Link>
          </div>
        )}
        <Card>
          <DashboardDisplay
            bet={selectedBet}
            main={main}
            pending={pending}
            uid={uid}
          />
        </Card>
        <Card>
          <DashboardTable
            bets={bets}
            onSelectBet={handleDisplayBet}
            uid={uid}
          />
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
