import React from 'react'
import Link from 'gatsby-link'
import gamepad from '../../static/svg/gamepad.svg'

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const Navbar = props => {
    return (
        <AppBar>
            <Toolbar variant="dense">
                <Link to='/' style={{ height: '30px' }}>
                    <img 
                        src={gamepad}
                        alt="Gamepad News"
                        style={{ width: '30px', height: '30px', margin: '0 1rem 0 0' }}
                    />
                </Link>
                {/* <Typography variant="title" color="inherit">
                    Gamepad News
                </Typography> */}
                <Button key="1"><Link to='/playstation'>Playstation</Link></Button>
                <Button key="2"><Link to='/xbox'>Xbox</Link></Button>
                <Button key="3"><Link to='/switch'>Switch</Link></Button>
                <Button key="4"><Link to='/pc'>PC</Link></Button>
                <Button key="5"><Link to='/mobile'>Mobile</Link></Button>
                <Button key="6"><Link to='/retro'>Retro</Link></Button>
                <IconButton color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar