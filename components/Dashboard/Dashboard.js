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

  const handleBet = () => {
    setSelectedPendingBet(null);
  };

  // TODO: export to hook
  if (findBets) {
    useEffect(() => {
      let data = [];
      const unsubscribe = firebase
        .firestore()
        .collection("testBets")
        .where("isFinished", "==", false)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              if (!change.doc.data().allUsers.includes(uid)) {
                data.push(change.doc.data());
                setPendingBets([...data]);
              }
            }
            if (change.type === "modified") {
              if (change.doc.data().allUsers.includes(uid)) {
                // if all uid in allUsers then filter out bet
                data = data.filter(
                  (bet) => bet.betID !== change.doc.data().betID
                );
                setPendingBets([...data]);
              }
              // filter out old documents, then replace
              if (!change.doc.data().allUsers.includes(uid)) {
                data = data.filter(
                  (bet) => bet.betID !== change.doc.data().betID
                );
                setPendingBets([...data, change.doc.data()]);
              }
            }
            if (change.type === "removed") {
              data = data.filter(
                (bet) => bet.betID !== change.doc.data().betID
              );
              setPendingBets([...data]);
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
  // export to hook
  if (pending && !findBets) {
    useEffect(() => {
      let data = [];
      const unsubscribe = firebase
        .firestore()
        .collection("testBets")
        .where("allUsers", "array-contains", uid)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              if (change.doc.data().invitedUsers.hasOwnProperty(uid)) {
                data.push(change.doc.data());
                console.log("added", data);
                setPendingBets([...data]);
              }
            }
            if (change.type === "modified") {
              if (!change.doc.data().invitedUsers.hasOwnProperty(uid)) {
                // if all uid is NOT in invitedUsers then filter out bet
                data = data.filter(
                  (bet) => bet.betID !== change.doc.data().betID
                );
                setPendingBets([...data]);
                console.log("modified and filtered out", data);
              }
              // if uid IS in invitedUsers filter out old document with the new one
              if (change.doc.data().invitedUsers.hasOwnProperty(uid)) {
                data = data.filter(
                  (bet) => bet.betID !== change.doc.data().betID
                );
                setPendingBets([...data, change.doc.data()]);
                console.log("modified and replaced", data);
              }
            }
            if (change.type === "removed") {
              if (change.doc.data().invitedUsers.hasOwnProperty(uid)) {
                // if uid is not in invitedUsers of removed document then filter out the document and update state
                data = data.filter(
                  (bet) => bet.betID !== change.doc.data().betID
                );
                console.log("removed", data);
                setPendingBets([...data]);
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
