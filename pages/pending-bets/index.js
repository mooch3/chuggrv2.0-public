import Dashboard from "../../components/Dashboard/Dashboard";

const DUMMY_PENDING_BETS = [
  {
    title: "Football",
    type: "event",
    stake: {
      shots: 1,
      beers: 1,
    },
    side1Users: {
      "0smr2kLqYPcWphcyEuTksgsG3qA2": "bolderkat",
    },
    side2Users: {
    },
    dueDate: 1614395280,
    betID: "00RvD7Mqg23253dUFeY1a2nH",
    acceptedUsers: [
      "jaqBgCF9rxN5aZiklI5DAPniKnx2",
      "XjPmsoFbmibsoga1WRsUT5PBgGY2",
    ],
    allUsers: ["jaqBgCF9rxN5aZiklI5DAPniKnx2", "XjPmsoFbmibsoga1WRsUT5PBgGY2"],
    isFinished: false,
  },
];
const PendingBets = () => {
  return (
    <>
      <Dashboard bets={DUMMY_PENDING_BETS} main={false} pending={true} />
    </>
  );
};

export default PendingBets;
