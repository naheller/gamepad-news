import React from 'react'
import { Link } from 'gatsby'
import '../styles.css'

import gamepad from '../../static/svg/gamepad.svg'
import burgerMenu from '../../static/svg/burger-menu.svg'

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
        <img 
            className="burger-menu" 
            src={burgerMenu} 
            alt="Nav menu" 
        />
    </div>
)

export default NavLogo;