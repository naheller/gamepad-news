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
                <title>{`Successfully contacted ${siteTitle}`}</title>
                <meta name="description" content={`${siteTitle} contact success`} /> 
                <meta name="keywords" content="contact,email,support,help,questions,comments,feedback,tips" />
                <meta name="robots" content="noindex,follow" />
                <meta property="og:url" content={`https://gamepad.news/success`} />
                <meta property="og:title" content={`Successfully contacted ${siteTitle}`} />
                <meta property="og:description" content={`${siteTitle} contact success`} />
                {/* <meta property="og:image" content={image} /> */}
                </Helmet>
            <h1>Thanks!</h1>
            <h5>We'll get back to you soon.</h5>
        </SiteLayout>
    )
}

export default Success