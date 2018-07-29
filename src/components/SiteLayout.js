import React, { Component } from 'react'
import { Link } from 'gatsby'
import { rhythm, scale } from '../utils/typography'
import '../styles.css'

import NavLogo from './navLogo'
import NavMenu from './NavMenu'
import Sidebar from './sidebar'
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
