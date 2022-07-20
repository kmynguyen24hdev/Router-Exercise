import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
    return ( <header className={classes.header}>
        <div className={classes.logo}>Great quotes</div>
        <nav className={classes.nav}>
            <ul>
                <li>
                    <NavLink to="/quotes" className={(navData) =>  navData.isActive ? classes.active : ''}>
                        All Quotes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/new-quote" className={(navData) =>  navData.isActive ? classes.active : ''}>
                        New Quotes
                    </NavLink>
                </li>
            </ul>
        </nav>
    </header> );
}

export default MainNavigation;