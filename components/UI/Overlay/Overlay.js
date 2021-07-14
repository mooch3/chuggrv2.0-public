import classes from './Overlay.module.css';

const Overlay = ({ children }) => {
    return (
        <div className={classes.overlay}>
            {children}
        </div>
    )
}

export default Overlay;