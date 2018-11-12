import React from 'react'
import Link from 'gatsby-link'
// import MobileMenu from './MobileMenu'
import gamepad from '../../static/svg/gamepad.svg'

const Navbar = props => {
    return (
        <div className="navbar">
            <div className="text">gamepad</div>
            <Link to='/' className="gamepad-icon-link" key="gamepad-icon" title="Gamepad News">
                <img 
                    src={gamepad}
                    alt="Gamepad News"
                    style={{ width: '1.5rem', height: '1.5rem', margin: 0 }}
                />
            </Link>
            <div className="text">news</div>
            {/* <div className="links">
                <Link to='/playstation' key="nav-playstation">
                    <h6>Playstation</h6>
                </Link>
                <Link to='/xbox' key="nav-xbox">
                    <h6>Xbox</h6>
                </Link>
                <Link to='/switch' key="nav-switch">
                    <h6>Switch</h6>
                </Link>
                <Link to='/pc' key="nav-pc">
                    <h6>PC</h6>
                </Link>
                <Link to='/mobile' key="nav-mobile">
                    <h6>Mobile</h6>
                </Link>
                <Link to='/retro' key="nav-retro">
                    <h6>Retro</h6>
                </Link>
            </div> */}
            {/* <MobileMenu /> */}
        </div>
    )
}

export default Navbar