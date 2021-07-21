import classes from './Card.module.css';

const Card = ({ children, onClick }) => {
    return (
        <div onClick={onClick} className={classes.card}>{children}</div>
    )
}

export default Card;