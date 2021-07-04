import classes from "./Row.module.css";
import Chat from "../../Chat/Chat";
import RadioSelect from "../../RadioSelect/RadioSelect";
import DashboardDisplay from "../../Dashboard/DashboardDisplay/DashboardDisplay";
import Card from "../../UI/Card";

const Row = ({children}) => {
  return (
    <div className={classes.row}>
      {children}
    </div>
  );
};

export default Row;
