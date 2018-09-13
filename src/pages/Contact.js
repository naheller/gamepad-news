import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import SiteLayout from '../components/SiteLayout'

const Contact = props => {
    const data = { props }
    const siteTitle = get(data, 'site.siteMetadata.title', 'Gamepad News')

    return (
        <SiteLayout>
            <div>
                <Helmet>
                    <title>{`Contact ${siteTitle}`}</title>
                    <meta name="description" content={`${siteTitle} contact page`} /> 
                    <meta name="keywords" content="contact,email,support,help,questions,comments,feedback,tips" />
                    <meta name="robots" content="index,follow" />
                    <meta property="og:url" content={`https://gamepad.news/contact`} />
                    <meta property="og:title" content={`Contact ${siteTitle}`} />
                    <meta property="og:description" content={`${siteTitle} Contact page`} />
                    {/* <meta property="og:image" content={image} /> */}
                </Helmet>
                <h1>What's up?</h1>
                <form
                    name="contact"
                    method="post"
                    action="/success"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                >
                    <input hidden className="hidden" name="bot-field" />
                    <div>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            name="name"  
                        />
                    </div>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Email" 
                            name="email"  
                        />
                    </div>
                    <div>
                        <textarea 
                            type="text" 
                            placeholder="Message" 
                            name="message"  
                            rows="8" 
                        />
                    </div>
                    <button 
                        type="submit" 
                    >
                        Send
                    </button>
                </form>
            </div>
        </SiteLayout>
    )
}

export default Contact