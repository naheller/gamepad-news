import React from 'react'
import { map } from 'lodash'
import Link from 'gatsby-link'

import ps from '../../static/svg/playstation-tomato.svg'
import xbox from '../../static/svg/xbox-tomato.svg'
import nSwitch from '../../static/svg/switch-tomato.svg'
import pc from '../../static/svg/pc-tomato.svg'
import mobile from '../../static/svg/phone-tomato.svg'
import retro from '../../static/svg/invaders-tomato.svg'

const TagIcons = props => {
    const blogPostAdjustment = props.blogPost ? 'blog-post-icons-adjust' : ''

    return (
        <div className={`blog-post-tag-icons ${blogPostAdjustment}`}>
            {map(props.tags, tag => {
                switch(tag) {
                    case 'playstation':
                        return (
                            <Link
                                to={`/playstation`}
                                key={'ps'}
                            >
                                <img 
                                    src ={ps} 
                                    className="blog-post-tag-icon" 
                                    title="Playstation"
                                    style={{ 
                                        width: '16px', 
                                        height: '16px', 
                                        marginBottom: 0 
                                    }}
                                />
                            </Link>
                        )
                    case 'xbox':
                        return (
                            <Link
                                to={`/xbox`}
                                key={'xbox'}
                            >
                                <img 
                                    src ={xbox} 
                                    className="blog-post-tag-icon" 
                                    title="Xbox"
                                />
                            </Link>
                        )
                    case 'switch':
                        return (
                            <Link
                                to={`/switch`}
                                key={'switch'}
                            >
                                <img 
                                    src ={nSwitch} 
                                    className="blog-post-tag-icon" 
                                    title="Switch"
                                />
                            </Link>
                        )
                    case 'pc':
                        return (
                            <Link
                                to={`/pc`}
                                key={'pc'}
                            >
                                <img 
                                    src ={pc} 
                                    className="blog-post-tag-icon" 
                                    title="PC"
                                />
                            </Link>
                        )
                    case 'mobile':
                        return (
                            <Link
                                to={`/mobile`}
                                key={'mobile'}
                            >
                                <img 
                                    src ={mobile} 
                                    className="blog-post-tag-icon" 
                                    title="Mobile"
                                />
                            </Link>
                        )
                    case 'retro': 
                        return (
                            <Link
                                to={`/retro`}
                                key={'retro'}
                            >
                                <img 
                                    src ={retro} 
                                    className="blog-post-tag-icon" 
                                    title="Retro"
                                    style={{ 
                                        width: '16px', 
                                        height: '16px', 
                                        marginBottom: 0 
                                    }}
                                />
                            </Link>
                        )
                    default:
                        return
                }
            })}
        </div>
    )
}

export default TagIcons