import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import SiteLayout from '../components/SiteLayout'

const Success = props => {
    const data = { props }
    const siteTitle = get(data, 'site.siteMetadata.title', 'Gamepad News')

    return (
        <SiteLayout>
            <div className="content-wrapper contact-page">
                <Helmet title={`Contact | ${siteTitle}`} />
                <h1>Thanks!</h1>
                <h5 style={{ color: '#ff7f68' }}>We'll get back to you soon.</h5>
            </div>
        </SiteLayout>
    )
}

export default Success
