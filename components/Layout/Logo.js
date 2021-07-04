import classes from './Logo.module.css';

const Logo = () => {
    return (
        <div className={classes.logo}>
            <img src='/CHUGGRLogo.png' alt="A smiling beer can" />
        </div>
    )
}

export default Logo;