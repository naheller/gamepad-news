import React from 'react'
import Link from 'gatsby-link'
// import gamepad from '../../static/svg/gamepad-tomato.svg'
import gamepad from '../../static/svg/gamepad.svg'

const Footer = () => [
    <div style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
        <Link to='/'>
            <img 
                src={gamepad}
                alt="Gamepad News"
                style={{ width: '30px', margin: '0 1rem 0 0' }}
            />
        </Link>
        <span>© 2018 Gamepad News</span>
    </div>
]

export default Footer