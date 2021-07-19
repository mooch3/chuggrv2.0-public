import { useState, useEffect } from "react";
import DashboardTable from "./DashboardTable/DashboardTable";
import DashboardDisplay from "./DashboardDisplay/DashboardDisplay";
import classes from "./Dashboard.module.css";
import Card from "../UI/Card";
import Link from "next/link";

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
    bets?.length > 0 ? useState(bets[0]) : useState(null);
  const [newBets, setNewBets] = useState([]);

  const [pendingBets, setPendingBets] = useState([]);
  const [selectedPendingBet, setSelectedPendingBet] = useState(null);

  const handleDisplayBet = (bet) => {
    pending ? setSelectedPendingBet(bet) : setSelectedBet(bet);
  };

  if (findBets) {
    useEffect(() => {
      const unsubscribe = firebase
        .firestore()
        .collection("testBets")
        .where("isFinished", "==", false)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (!change.doc.data().allUsers.includes(uid)) {
              if (change.type === "added") {
                console.log('Change was added')
                setPendingBets((prevValue) => [
                  ...prevValue,
                  change.doc.data(),
                ]);
              }
              if (change.type === "modified") {
                console.log('Change was modified')
                const modifiedBets = newBets.filter(
                  (bet) => bet.betID === change.doc.data().betID
                );
                setPendingBets(modifiedBets);
                setSelectedPendingBet(null);
              }
              if (change.type === "removed") {
                console.log('Change was removed')
                const modifiedBets = newBets.filter(
                  (bet) => bet.betID === change.doc.data().betID
                );
                console.log(modifiedBets);
                setPendingBets(modifiedBets);
                setSelectedPendingBet(null);
              }
            }
          });
        });
      return () => {
        unsubscribe();
        setPendingBets([]);
      };
    }, [firebase]);
  }

  if (pending && !findBets) {
    useEffect(() => {
      const unsubscribe = firebase
        .firestore()
        .collection("testBets")
        .where("allUsers", "array-contains", uid)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              if (change.doc.data().invitedUsers.hasOwnProperty(uid)) {
                setPendingBets((prevValue) => [
                  ...prevValue,
                  change.doc.data(),
                ]);
              }
            }
            if (change.type === "modified") {
              const modifiedBets = newBets.filter(
                (bet) => bet.betID === change.doc.data().betID
              );
              console.log(modifiedBets);
              setPendingBets(modifiedBets);
              setSelectedPendingBet(null);
            }
            if (change.type === "removed") {
              const modifiedBets = newBets.filter(
                (bet) => bet.betID === change.doc.data().betID
              );
              console.log(modifiedBets);
              setPendingBets(modifiedBets);
              setSelectedPendingBet(null);
            }
          });
        });
      return () => {
        unsubscribe();
        setPendingBets([]);
      };
    }, [firebase]);
  }
  if (main) {
    useEffect(() => {
      const unsubscribe = firebase
        .firestore()
        .collection("testBets")
        .where("allUsers", "array-contains", uid)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              if (change.doc.data().invitedUsers.hasOwnProperty(uid)) {
                setNewBets((prevValue) => [...prevValue, change.doc.data()]);
              }
            }
          });
        });

      return () => {
        unsubscribe();
        setNewBets([]);
      };
    }, [firebase]);
  }

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
        <Card>
          <DashboardDisplay
            bet={pending ? selectedPendingBet : selectedBet}
            main={main}
            pending={pending}
            uid={uid}
            userName={userName}
            findBets={findBets}
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
