import React from 'react'
import Link from 'gatsby-link'
import gamepad from '../../static/svg/gamepad.svg'

const Footer = props => {
    return (
        <div className="footer">
            <Link to='/'>
                <img 
                    src={gamepad}
                    alt="Gamepad News"
                    style={{ width: '1.5rem', height: '1.5rem', margin: 0 }}
                />
            </Link>
            <p>Gamepad News</p>
        </div>
    )
}

export default Footer