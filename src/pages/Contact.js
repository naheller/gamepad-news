import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import SiteLayout from '../components/SiteLayout'
import '../styles.css'

const Contact = props => {
    const data = { props }
    const siteTitle = get(data, 'site.siteMetadata.title', 'Gamepad News')

    return (
        <SiteLayout>
            <div className="content-wrapper contact-page">
                <Helmet title={`Contact | ${siteTitle}`} />
                <h1 className="contact-page-header">Hello!</h1>
                <form name="contact" method="post" action="/success" data-netlify="true" data-netlify-honeypot="bot-field">
                    <input type="hidden" name="bot-field" className="contact-page-field" />
                    <div><input type="text" name="name" id="name" placeholder="Name" className="contact-page-field" /></div>
                    <div><input type="text" name="email" id="email" placeholder="Email" className="contact-page-field" /></div>
                    <div><textarea name="message" id="message" rows="6" placeholder="Message" className="contact-page-field"></textarea></div>
                    <div><input type="submit" value="Send Message" className="contact-page-field contact-button" /></div>
                </form>
            </div>
        </SiteLayout>
    )
}

export default Contact