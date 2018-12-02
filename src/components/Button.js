import React from 'react'
import { Link } from 'gatsby'
import './Button.scss'

const Button = ({ 
        children, 
        onClick,
        color,
        internalLink, 
        slug,  
        link, 
        url,
        target,
        title,
        rel
    }) => {

    let linkBehavior, clickBehavior
    const colorStyle = color ? { color, borderColor: color } : {}

    if (link) {
        linkBehavior = (
            <a 
                href={url} 
                className="button" 
                style={colorStyle}
                target={target} 
                title={title} 
                rel={rel}
            >
                {children}
            </a>
        )
    } else if (internalLink) {
        linkBehavior = <Link to={slug} className="button" style={colorStyle}>{children}</Link>
    } else {
        clickBehavior = <div className="button" onClick={onClick} style={colorStyle}>{children}</div>
    }

    return link || internalLink ? linkBehavior : clickBehavior
}

export default Button
