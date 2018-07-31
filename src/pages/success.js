import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import SiteLayout from '../components/SiteLayout'

const Success = props => {
    const data = { props }
    const siteTitle = get(data, 'site.siteMetadata.title', 'Gamepad News')

    return (
        <SiteLayout>
            <Helmet>
                <title>{`Contact | ${siteTitle}`}</title>
                <meta name="description" content="Success Page" />
            </Helmet>

            <div id="main" className="alt">
                <section id="one">
                    <div className="inner">
                        <header className="major"><h1>Thanks!</h1></header>
                        <h5 style={{ color: '#ff7f68' }}>We'll get back to you soon.</h5>
                    </div>
                </section>
            </div>
        </SiteLayout>
    )
}

export default Success
