import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import SiteLayout from '../components/SiteLayout'

const Contact = props => {
    const data = { props }
    const siteTitle = get(data, 'site.siteMetadata.title', 'Gamepad News')

    return (
        <SiteLayout>
            <Helmet title={`Contact | ${siteTitle}`} />
            <div className="content-wrapper">Contact</div>
        </SiteLayout>
    )
}

export default Contact