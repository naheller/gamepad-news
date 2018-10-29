import React from 'react'
import Helmet from 'react-helmet'

import Navbar from './Navbar'
// import Sidebar from './Sidebar'
import Footer from './Footer'

// import gamepad from '../../static/img/favicon-b.png'
import '../../static/styles/all.scss'

const SiteLayout = props => {
    const { /*location,*/ children } = props

    const addHelmet = () => (
        <Helmet>
            <html lang="en" />
            <meta charset="UTF-8"></meta>
            <meta http-equiv="Content-Language" content="en" />
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
            {/* <link rel="shortcut icon" type="image/svg" href={gamepad} /> */}
        </Helmet>
    )

    return (
        <div className="site-wrapper">
            <div className="site-content">
                {addHelmet()}
                <Navbar />
                <div className="sidebar-main">
                    <div className="main">{children}</div>
                    {/* <div className="divider" /> */}
                    {/* <Sidebar location={location} /> */}
                </div>
                
                <Footer />
            </div>
        </div>
    )
}

export default SiteLayout
