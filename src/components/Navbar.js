import React from 'react'
import Link from 'gatsby-link'
// import MobileMenu from './MobileMenu'
import gamepad from '../../static/svg/gamepad.svg'
import './Navbar.scss'

const Navbar = () => {
    return (
        <div className="navbar">
            <Link 
                to='/' 
                key="gamepad-icon" 
                title="Gamepad News"
                className="icon-link"
            >
                <img 
                    src={gamepad}
                    alt="Gamepad News"
                    style={{ 
                        width: '1.75rem', 
                        height: '1.75rem',
                    }}
                />
            </Link>
        </div>
    )
}

export default Navbar