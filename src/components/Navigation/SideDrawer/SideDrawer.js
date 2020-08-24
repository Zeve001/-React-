import React, { Fragment } from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../Navitionitems/Navitionitems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
  return (
    <Fragment>
        <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <Logo height="11%" />
        <nav>
          <NavigationItems isAuthenicated={props.isAuthenicated}/>
        </nav>
      </div>
    </Fragment>
  );
};

export default sideDrawer;
