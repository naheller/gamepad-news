import React from 'react'
import Link from 'gatsby-link'
import gamepad from '../../static/svg/gamepad.svg'

const Navbar = props => {
    return (
        <div 
            role="navigation" 
            aria-label="main navigation"
        >
            {/* <Link to='/'>
                <img 
                    src={gamepad}
                    alt="Gamepad News"
                />
            </Link> */}
            <Link to='/playstation'>Playstation</Link>
            <Link to='/xbox'>Xbox</Link>
            <Link to='/switch'>Switch</Link>
            <Link to='/pc'>PC</Link>
            <Link to='/mobile'>Mobile</Link>
            <Link to='/retro'>Retro</Link>
        </div>
    )
}

export default Navbar