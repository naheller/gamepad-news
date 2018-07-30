import React from 'react'
import { Link } from 'gatsby'
import '../styles.css'

const NavLogo = props => {
    return (
        <Link 
            to="/"
            key="home"
            className="nav-logo"
        >
            <div className="nav-logo-text">
                <span className="before-dot-news">gamepad</span>
                <span className="dot-news">.NEWS</span>
            </div>
        </Link>
    )
}

export default NavLogo;