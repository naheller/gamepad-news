import React from 'react'
import { Link } from 'gatsby'
import '../styles.css'

const FooterSocial = () => (
    <div className="footer-menu">
        <div className="footer-menu-copyright">© 2018</div>
        <Link 
            to="/contact"
            key="contact"
        >
            <div className="footer-menu-item">Contact</div>
        </Link>
    </div>
)

export default FooterSocial