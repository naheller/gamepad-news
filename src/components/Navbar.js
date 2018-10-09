import React from 'react'
import Link from 'gatsby-link'
import gamepad from '../../static/svg/gamepad.svg'

const Navbar = props => {
    console.log('navbar props', props)
    return (
        <div className="navbar">
            <Link to='/'>
                <img 
                    src={gamepad}
                    alt="Gamepad News"
                    style={{ width: '1.5rem', height: '1.5rem', margin: 0 }}
                />
            </Link>
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