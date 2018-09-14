import React from 'react'
import gamepad from '../../static/svg/gamepad.svg'
import Link from 'gatsby-link'

const Navbar = props => {
    return (
        <nav 
            className="navbar" 
            role="navigation" 
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <Link to='/' className="navbar-item">
                    <img 
                        src={gamepad}
                        alt="Gamepad News"
                    />
                </Link>

                <a 
                    role="button" 
                    className="navbar-burger" 
                    aria-label="menu" 
                    aria-expanded="false"
                >
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </a>
            </div>
            <div class="navbar-menu">
                <div class="navbar-start is-uppercase is-size-7 has-text-weight-bold has-letter-spacing-1">
                    <Link to='/playstation' class="navbar-item">Playstation</Link>
                    <Link to='/xbox' class="navbar-item">Xbox</Link>
                    <Link to='/switch' class="navbar-item">Switch</Link>
                    <Link to='/pc' class="navbar-item">PC</Link>
                    <Link to='/mobile' class="navbar-item">Mobile</Link>
                    <Link to='/retro' class="navbar-item">Retro</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar