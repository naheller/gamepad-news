import React from 'react'
import '../styles.css'

import facebook from '../../static/facebook-blue.svg'
import twitter from '../../static/twitter-blue.svg'
import google from '../../static/google-plus-red.svg'

const FooterSocial = props => {
    return (
        <div className="footer-social">
            <div className="footer-social-button">
                <img 
                    src={twitter} 
                    className="footer-social-icon"
                    alt="Twitter"
                />
            </div>
            <div className="footer-social-button">
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