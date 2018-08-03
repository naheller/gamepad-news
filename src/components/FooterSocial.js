import React from 'react'
import '../styles.css'

import facebook from '../../static/svg/facebook-blue.svg'
import twitter from '../../static/svg/twitter-blue.svg'
import google from '../../static/svg/google-plus-red.svg'

const FooterSocial = props => {
    return (
        <div className="footer-social">
            <div 
                className="footer-social-button"
                onClick={() => window.open("https://twitter.com/gamepad_news")}
            >
                <img 
                    src={twitter} 
                    className="footer-social-icon"
                    alt="Twitter"
                />
            </div>
            <div 
                className="footer-social-button"
                onClick={() => window.open("https://www.facebook.com/gamepadnews")}
            >
                <img 
                    src={facebook} 
                    className="footer-social-icon" 
                    alt="Facebook"
                />
            </div>
            <div className="footer-social-button">
                <img 
                    src={google} 
                    className="footer-social-icon" 
                    alt="Google"
                />
            </div>
        </div>
    )
}

export default FooterSocial