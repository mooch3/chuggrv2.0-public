import classes from "./TileGrid.module.css";

const TileGrid = ({ children }) => {
  return <div className={classes.grid}>{children}</div>;
};

export default TileGrid;
