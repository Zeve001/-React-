import React from 'react'
import classes from './Navitionitem.css'

import {NavLink} from 'react-router-dom'


const navitionItem = (props) => (
    <li className={classes.Navitionitem}><NavLink 
       to={props.link}
       exact={props.exact}
       activeClassName={classes.active}>{props.children}</NavLink></li>
)

export default navitionItem;