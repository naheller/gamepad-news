import React from 'react'
import { Link } from 'gatsby'
import '../styles.css'
import gamepad from '../../static/svg/gamepad-4.svg'

const NavLogo = () => (
    <Link 
        to="/"
        key="home"
        className="nav-logo"
    >
        <div className="nav-logo-text">
            <span className="before-dot-news">ga</span>
            <img 
                src={gamepad}
                className="nav-logo-svg"
            />
            <span className="before-dot-news">epad</span>
        </div>
    </Link>
)

export default NavLogo;