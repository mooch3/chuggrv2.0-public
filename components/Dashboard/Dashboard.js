import { useState } from "react";
import DashboardTable from "./DashboardTable/DashboardTable";
import DashboardDisplay from "./DashboardDisplay/DashboardDisplay";
import classes from "./Dashboard.module.css";
import Card from '../UI/Card';

const Dashboard = ({ bets }) => {
  const [selectedBet, setSelectedBet] = useState(bets[1]);

  const handleDisplayBet = (bet) => {
    setSelectedBet(bet);
  };
  return (
    <div className={classes.dashboard}>
      <Card>
        <DashboardDisplay bet={selectedBet} main={true} />
      </Card>
      <Card>
        <DashboardTable bets={bets} onSelectBet={handleDisplayBet} />
      </Card>
    </div>
  );
};

export default Dashboard;
