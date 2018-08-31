import React from 'react'
import Helmet from 'react-helmet'

import NavLogo from './NavLogo'
import NavMenu from './NavMenu'
import Sidebar from './Sidebar'
import FooterSocial from './FooterSocial'
import FooterMenu from './FooterMenu'

import gamepad from '../../static/img/favicon-b.png'
import '../styles.css'

const SiteLayout = props => {
    const { location, children } = props

    return (
        <div className="wrapper">
            <Helmet>
                <link rel="shortcut icon" type="image/svg" href={gamepad} />
            </Helmet>
            <div className="header">
                <NavLogo />
                <NavMenu />
            </div>

            <div className="side-menu">
                <Sidebar location={location} />
            </div>

            <div className="content">
                {children}
            </div>
            
            <div className="footer">
                <FooterSocial />
                <FooterMenu />
            </div>
        </div>
    )
}

export default SiteLayout
