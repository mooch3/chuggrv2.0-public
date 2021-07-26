import Logo from "./Logo"
import classes from './Footer.module.css';

const Footer = () => {
    return (
        <div className={classes.container}>
            <div className={classes.footer}>
                <p>Copyright © CHUGGR 2021</p>
                <Logo />
            </div>
        </div>
    )
}

export default Footer;