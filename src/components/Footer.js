import React from 'react'
import Link from 'gatsby-link'
import gamepad from '../../static/svg/gamepad.svg'

import '../../static/styles/fontello/css/fontello.css'

const Footer = props => {
    return (
        <div className="footer">
            <a 
                href="https://twitter.com/gamepad_news" 
                className="social-icon twitter"
                target="_blank" 
                title="Gamepad News Twitter page" 
                rel="noopener noreferrer"
            >
                <i className="icon-twitter-squared" />
            </a>
            <Link to='/' className="gamepad-icon-link" title="Gamepad News">
                <img 
                    src={gamepad}
                    alt="Gamepad News"
                    style={{ width: '1.5rem', height: '1.5rem', margin: 0 }}
                />
            </Link>
            <a 
                href="https://www.facebook.com/gamepadnews" 
                className="social-icon facebook"
                target="_blank" 
                title="Gamepad News Facebook page" 
                rel="noopener noreferrer"
            >
                <i className="icon-facebook-squared" />
            </a>
        </div>
    )
}

export default Footer