import React, { Component } from 'react'
import '../styles.css'

import NavLogo from './NavLogo'
import NavMenu from './NavMenu'
import Sidebar from './Sidebar'
import FooterSocial from './FooterSocial'
import FooterMenu from './FooterMenu'


class SiteLayout extends Component {
    render() {
        const { location, children } = this.props

        return (
            <div className="wrapper">
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
}

export default SiteLayout
