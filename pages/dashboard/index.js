import Dashboard from "../../components/Dashboard/Dashboard";

const DUMMY_DATA = [
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
      XjPmsoFbmibsoga1WRsUT5PBgGY2: "daddy",
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
  {
    title:
      "Alex Caruso Points",
    type: "spread",
    stake: {
      shots: 1,
      beers: 1,
    },
    line: 8.5,
    side1Users: {
      "jaqBgCF9rxN5aZiklI5DAPniKnx2": "chipmungie",
      "0smr2kLqYPcWphcyEuTksgsG3qA2": "bolderkat",
    },
    side2Users: {
      XjPmsoFbmibsoga1WRsUT5PBgGY2: "daddy",
    },
    dueDate: 1684395280,
    betID: "00RvD7Mqg8s23gFeY1a2nH",
    acceptedUsers: [
      "jaqBgCF9rxN5aZiklI5DAPniKnx2",
      "XjPmsoFbmibsoga1WRsUT5PBgGY2",
    ],
    allUsers: ["jaqBgCF9rxN5aZiklI5DAPniKnx2", "XjPmsoFbmibsoga1WRsUT5PBgGY2"],
    isFinished: false,
  },
  {
    title: "Browns vs. Chiefs",
    type: "moneyline",
    team1: "Browns",
    team2: "Chiefs",
    stake: {
      shots: 1,
      beers: 1,
    },
    side1Users: {
      jaqBgCF9rxN5aZiklI5DAPniKnx2: "chipmungie",
      "0smr2kLqYPcWphcyEuTksgsG3qA2": "bolderkat",
    },
    side2Users: {
      XjPmsoFbmibsoga1WRsUT5PBgGY2: "daddy",
    },
    dueDate: 1614495280,
    betID: "32rvD7Mqg8d325UFeY1a2nH",
    acceptedUsers: [
      "jaqBgCF9rxN5aZiklI5DAPniKnx2",
      "XjPmsoFbmibsoga1WRsUT5PBgGY2",
    ],
    allUsers: ["jaqBgCF9rxN5aZiklI5DAPniKnx2", "XjPmsoFbmibsoga1WRsUT5PBgGY2"],
    outstandingUsers: [],
    isFinished: true,
  },
];

const FullDashboard = () => {
  return <Dashboard bets={DUMMY_DATA} />;
};

export default FullDashboard;
