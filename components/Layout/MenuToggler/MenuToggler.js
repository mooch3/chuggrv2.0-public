import classes from "./MenuToggler.module.css"

const MenuToggler = ({ openNav, open }) => {

    

    let toggleClasses = open ? classes['show-nav-open'] : classes['show-nav'];


    return (
        <div className={toggleClasses} onClick={openNav}>
            <div></div>
            <div></div>
        </div>

    )
}

export default MenuToggler;