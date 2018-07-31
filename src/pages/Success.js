import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import SiteLayout from '../components/SiteLayout'

const Success = props => {
    const data = { props }
    const siteTitle = get(data, 'site.siteMetadata.title', 'Gamepad News')

    return (
        <SiteLayout>
            <Helmet title={`Contact | ${siteTitle}`} />
                <h1 className="contact-success-header">Thanks!</h1>
                <h5 className="contact-page-msg">We'll get back to you soon.</h5>
        </SiteLayout>
    )
}

export default Success