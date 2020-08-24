import React from 'react'
import classes from './Navitionitems.css'
import NavitionItem from './Navitionitem/Navitionitem'

const navitionItems = (props) => (
    <ul className={classes.NavitionItems}>
        <NavitionItem link="/" exact>Burger Builder</NavitionItem>
        { props.isAuthenicated?  <NavitionItem link="/Orders">Orders</NavitionItem> : null}
        { !props.isAuthenicated?   <NavitionItem link="/auth">Authenticate</NavitionItem> : 
                                  <NavitionItem link="/logout">Logout</NavitionItem>  }
        
    </ul>

);

export default navitionItems;