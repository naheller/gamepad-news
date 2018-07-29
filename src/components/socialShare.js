import React, { Component } from 'react'
// import '../styles.css'

import facebook from '../../static/facebook.svg'
import twitter from '../../static/twitter.svg'
import google from '../../static/google-plus.svg'

const SocialShare = props => {
    console.log('social props', props)
    const { slug } = props

    return (
        <div>
            <img 
                src={twitter} 
                className="share-icon" 
                style={{ marginBottom: '1px' }}
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=https://gamepad.news${slug}`, '_blank', 'top=250,left=250,width=500,height=300')} 
            />
            <img 
                src={facebook} 
                className="share-icon"
                style={{ marginBottom: '1px' }}
                onClick={() => window.open(`https://www.facebook.com/sharer.php?u=https://gamepad.news${slug}`, '_blank', 'top=250,left=250,width=555,height=326')} 
            />
            <img 
                src={google} 
                className="share-icon" 
                onClick={() => window.open(`https://plus.google.com/share?url=https://gamepad.news${slug}`, '_blank', 'top=250,left=250,width=555,height=326')} 
            />
        </div>
    )
}

export default SocialShare