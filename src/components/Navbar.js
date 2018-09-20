import React from 'react'
import Link from 'gatsby-link'
import gamepad from '../../static/svg/gamepad.svg'

const Navbar = props => {
    return (
        <nav 
            className="navbar has-shadow" 
            role="navigation" 
            aria-label="main navigation"
        >
            <div className="container">
                <div className="navbar-brand">
                    <Link to='/' className="navbar-item">
                        <img 
                            src={gamepad}
                            alt="Gamepad News"
                        />
                    </Link>

                    <div 
                        role="button" 
                        className="navbar-burger" 
                        aria-label="mobile menu button" 
                        aria-expanded="false"
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </div>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-start is-uppercase is-size-7 has-text-weight-bold has-letter-spacing-1">
                        <Link to='/playstation' className="navbar-item">Playstation</Link>
                        <Link to='/xbox' className="navbar-item">Xbox</Link>
                        <Link to='/switch' className="navbar-item">Switch</Link>
                        <Link to='/pc' className="navbar-item">PC</Link>
                        <Link to='/mobile' className="navbar-item">Mobile</Link>
                        <Link to='/retro' className="navbar-item">Retro</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar