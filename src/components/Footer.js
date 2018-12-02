import React from 'react'
import Link from 'gatsby-link'
import gamepad from '../../static/svg/gamepad.svg'
import Button from './Button'

import '../../static/fontello/css/fontello.css'
import './Footer.scss'

const Footer = () => {
    return (
        <div className="footer">
            <Link 
                to='/' 
                className="icon-link" 
                title="Gamepad News"
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
            <div className="social">
                <Button
                    link
                    twitter
                    url="https://twitter.com/gamepad_news" 
                    target="_blank" 
                    title="Gamepad News Twitter page" 
                    rel="noopener noreferrer"
                >
                    <i className="icon icon-twitter" />
                    <p className="text">@gamepad_news</p>
                </Button>
                <Button 
                    link
                    fb
                    url="https://www.facebook.com/gamepadnews" 
                    target="_blank" 
                    title="Gamepad News Facebook page" 
                    rel="noopener noreferrer"
                >
                    <i className="icon icon-facebook" />
                    <p className="text">gamepadnews</p>
                </Button>
            </div>
        </div>
    )
}

export default Footer