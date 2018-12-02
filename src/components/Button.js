import React from 'react'
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import './Button.scss'

const Button = ({ 
        children, 
        onClick,
        tag,
        internalLink, 
        slug,  
        link, 
        url,
        target,
        title,
        rel,
        fb,
        twitter
    }) => {

    let linkBehavior, clickBehavior
    let socialStyle = ''

    if (fb) socialStyle = 'fb'
    if (twitter) socialStyle = 'twitter'
    if (link) {
        linkBehavior = (
            <a 
                href={url} 
                className={`button ${socialStyle}`}
                target={target} 
                title={title}
                rel={rel}
            >
                {children}
            </a>
        )
    } else if (internalLink) {
        linkBehavior = (
            <Link 
                to={slug} 
                className={`button ${socialStyle}`}
            >
                {children}
            </Link>
        )
    } else if (tag) {
        linkBehavior = (
            <Link 
                to={`/${kebabCase(tag)}`} 
                className={`button ${socialStyle}`}
                title={tag}
            >
                {tag}
            </Link>
        )
    } else {
        clickBehavior = (
            <div 
                className={`button ${socialStyle}`} 
                onClick={onClick}
            >
                {children}
            </div>
        )
    }

    return (link || internalLink || tag) ? linkBehavior : clickBehavior
}

export default Button
