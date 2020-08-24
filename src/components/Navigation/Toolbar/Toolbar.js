import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavitionItems from '../Navitionitems/Navitionitems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <Logo height='80%'/>
        <nav className={classes.DesktopOnly}>
            <NavitionItems isAuthenicated={props.isAuthenicated}/>
        </nav>
    </header>

)

export default toolbar