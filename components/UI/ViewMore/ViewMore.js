import classes from './ViewMore.module.css';

const ViewMore = ({ onScroll, tooltip }) => {
  return (
    <button className={classes["view-more"]} onClick={onScroll}>
      {tooltip}
    </button>
  );
};

export default ViewMore;