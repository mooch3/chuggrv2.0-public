import Row from "../../components/Layout/Row/Row";
import Card from "../../components/UI/Card";
import ProfileDisplay from "../../components/ProfileDisplay/ProfileDisplay";
import TileGrid from "../../components/Friends/TileGrid";
import Tile  from '../../components/Friends/Tile';

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
  
  const DUMMY_PROFILE = {
    betsLost: 12,
    betsWon: 13,
    bio: "I am micekey",
    drinksGiven: {
      beers: 14,
      shots: 3,
    },
    drinksOutstanding: {
      beers: 0,
      shots: 0,
    },
    drinksReceived: {
      beers: 9,
      shots: 7,
    },
    firstName: "David",
    lastName: "Micekey",
    numBets: 75,
    numFriends: 22,
    userName: "Papa Bear"
  };

const Uid = () => {
    return (
      <>
        <Row>
          <Card>
            <ProfileDisplay profile={DUMMY_PROFILE} />
          </Card>
          <h1 className="centered">Past Bets</h1>
          <TileGrid>
            {DUMMY_DATA.map((bet) => (
              <Tile key={bet.betID} bet={bet} />
            ))}
          </TileGrid>
        </Row>
      </>
    );
  };
  
  export default Uid;