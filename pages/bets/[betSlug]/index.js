import { useRouter } from "next/router";
import Row from "../../../components/Layout/Row/Row";
import DashboardDisplay from "../../../components/Dashboard/DashboardDisplay/DashboardDisplay";
import Card from "../../../components/UI/Card";
import RadioSelect from "../../../components/RadioSelect/RadioSelect";
import Chat from "../../../components/Chat/Chat";

const DUMMY_MESSAGES = [
  {
    body: "I think it’s 50-50 enough where this is a solid bet",
    uid: "0smr2kLqYPcWphcyEuTksgsG3qA2",
    userName: "bolderkat",
    id: "asfasfajnk32562gsd",
  },
  {
    body: "Word, I totally agree",
    uid: "XjPmsoFbmibsoga1WRsUT5PBgGY2",
    userName: "daddy",
    id: "nlnofahfosai2352",
  },
];

const DUMMY_USER = {
  uid: "XjPmsoFbmibsoga1WRsUT5PBgGY2",
};

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
    title: "Alex Caruso Points",
    type: "spread",
    stake: {
      shots: 1,
      beers: 1,
    },
    line: 8.5,
    side1Users: {
      jaqBgCF9rxN5aZiklI5DAPniKnx2: "chipmungie",
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

const betSlug = () => {
  const router = useRouter();

  const slug = router.query.betSlug;

  const findBet = DUMMY_DATA.find((bet) => bet.betID === slug);

  return (
    <>
      <Row>
        <Card>
          <DashboardDisplay bet={DUMMY_DATA[0]} />
        </Card>
        <Chat messages={DUMMY_MESSAGES} user={DUMMY_USER} />
        <RadioSelect bet={DUMMY_DATA[0]} />
      </Row>
    </>
  );
};

export default betSlug;
