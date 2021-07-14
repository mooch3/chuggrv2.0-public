import classes from "./CallToAction.module.css";
import Row from "../Layout/Row/Row";
import PrettyButton from "../UI/Buttons/PrettyButton";
import Break from "../UI/Break/Break";
import Card from "../UI/Card";
import Logo from "../Layout/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDice,
  faUserFriends,
  faBeer,
} from "@fortawesome/free-solid-svg-icons";

const CallToAction = () => {
  return (
    <>
      <Row>
        <div className={classes["cta-logo"]}>
          <h1 className={classes.big}>CHUGGR</h1>
          <img src="/CHUGGRLogo.png" alt="A smiling beer can" />
        </div>
        <div className={classes.cta}>
          <h1>
            Put Your <em>Drink</em> Where Your Mouth Is
          </h1>
          <h3>
            CHUGGR is a social media and beer betting app that lets your connect
            with friends, keep track of bets, and make your friends drink their
            words! With three available bet types, you can bet a beer on almost
            anything you can think of. Keep track of your wins, losses, drinks
            given, drinks recieved, and friends!
          </h3>
          <em> Please drink responsibly.</em>
          <PrettyButton>CREATE ACCOUNT</PrettyButton>
        </div>
        <Break />
        <div className={classes.items}>
          <div className={classes["cta-item"]}>
            <FontAwesomeIcon icon={faDice} size="3x" />
            <p>Bet On Anything</p>
          </div>
          <div className={classes["cta-item"]}>
            <FontAwesomeIcon icon={faUserFriends} size="3x" />
            <p>Connect with Friends</p>
          </div>
          <div className={classes["cta-item"]}>
            <FontAwesomeIcon icon={faBeer} size="3x" />
            <p>Drink Beer</p>
          </div>
        </div>
        <Break />
        <Card>
          <h1 className={classes.big}>CHUGGR</h1>
          <Logo />
          <h3 className={classes.sm}>
            Chuggr was born in the COVID pandemice as a way to connect our
            friends and family through hilarious bets, beers, and friendship. We
            created this application as a joke, but it became an interesting way
            to improve our fantasy sports leagues, stay in touch, and make
            memories. We hope you enjoy the application, and remember to{" "}
            <em>drink responsibly.</em>
          </h3>
          <PrettyButton>Create Account</PrettyButton>
        </Card>
      </Row>
    </>
  );
};

export default CallToAction;