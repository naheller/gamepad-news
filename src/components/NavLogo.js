import React from 'react'
import { Link } from 'gatsby'
import { slide as Menu } from 'react-burger-menu'
import '../styles.css'
import './NavLogo.css'

import gamepad from '../../static/svg/gamepad.svg'
import gamepadMenu from '../../static/svg/gamepad-sidemenu.svg'

const NavLogo = () => (
    <div className="nav-logo-wrapper">
        <Link 
            to="/"
            key="home"
        >
            <div className="nav-logo-text">
                <span className="before-dot-news">ga</span>
                <img 
                    src={gamepad}
                    className="nav-logo-svg"
                    alt="Gamepad News"
                />
                <span>epad</span>
            </div>
        </Link>
        <Menu right width="250px">
            <Link to="/" key="Gamepad" style={{ margin: '0 0 0.5rem 0' }}>
                <img 
                    src={gamepadMenu} 
                    className="burger-menu-gamepad-svg"
                    alt="Gamepad"
                />
            </Link>
            <hr style={{ borderBottom: '1px solid white' }} />
            <Link to="/playstation" key="Playstation">Playstation</Link>
            <Link to="/xbox" key="Xbox">Xbox</Link>
            <Link to="/switch" key="Switch">Switch</Link>
            <Link to="/pc" key="PC">PC</Link>
            <Link to="/mobile" key="Mobile">Mobile</Link>
            <Link to="/retro" key="Retro">Retro</Link>
            <hr style={{ borderBottom: '1px solid white' }} />
            <Link to="/contact" key="contact" className="bm-item-white">contact</Link>
        </Menu>
        
    </div>
)

export default NavLogo;