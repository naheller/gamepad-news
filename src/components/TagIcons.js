import React from 'react'
import { get, map, includes, findIndex, orderBy } from 'lodash'
import Link from 'gatsby-link'

import ps from '../../static/svg/playstation-tomato.svg'
import xbox from '../../static/svg/xbox-tomato.svg'
import nSwitch from '../../static/svg/switch-tomato.svg'
import pc from '../../static/svg/pc-tomato.svg'
import mobile from '../../static/svg/phone-tomato.svg'
import retro from '../../static/svg/invaders-tomato.svg'

const tagTypes = ['playstation', 'xbox', 'switch', 'pc', 'mobile', 'retro']

const TagIcons = props => {
    const filteredTags = map(props.tags, tagToMatch => {
        if (includes(tagTypes, tagToMatch)) {
            const tagIndex = findIndex(tagTypes, tag => tag === tagToMatch)
            return { name: tagToMatch, order: tagIndex + 1 }
        }
    })

    const orderedTags = orderBy(filteredTags, 'order', 'asc')

    return (
        <div className={'blog-post-tag-icons'}>
            {map(orderedTags, tag => {
                switch(get(tag, 'name', '')) {
                    case 'playstation':
                        return (
                            <Link
                                to={`/playstation`}
                                key={'ps'}
                                className="blog-post-tag-icon-link"
                            >
                                <img 
                                    src ={ps} 
                                    className="blog-post-tag-icon" 
                                    title="Playstation"
                                    alt="Playstation"
                                    style={{ 
                                        width: '15px', 
                                        height: '15px'
                                    }}
                                />
                            </Link>
                        )
                    case 'xbox':
                        return (
                            <Link
                                to={`/xbox`}
                                key={'xbox'}
                                className="blog-post-tag-icon-link"
                            >
                                <img 
                                    src ={xbox} 
                                    className="blog-post-tag-icon" 
                                    title="Xbox"
                                    alt="Xbox"
                                />
                            </Link>
                        )
                    case 'switch':
                        return (
                            <Link
                                to={`/switch`}
                                key={'switch'}
                                className="blog-post-tag-icon-link"
                            >
                                <img 
                                    src ={nSwitch} 
                                    className="blog-post-tag-icon" 
                                    title="Switch"
                                    alt="Switch"
                                />
                            </Link>
                        )
                    case 'pc':
                        return (
                            <Link
                                to={`/pc`}
                                key={'pc'}
                                className="blog-post-tag-icon-link"
                            >
                                <img 
                                    src ={pc} 
                                    className="blog-post-tag-icon" 
                                    title="PC"
                                    alt="PC"
                                />
                            </Link>
                        )
                    case 'mobile':
                        return (
                            <Link
                                to={`/mobile`}
                                key={'mobile'}
                                className="blog-post-tag-icon-link"
                            >
                                <img 
                                    src ={mobile} 
                                    className="blog-post-tag-icon" 
                                    title="Mobile"
                                    alt="Mobile"
                                />
                            </Link>
                        )
                    case 'retro': 
                        return (
                            <Link
                                to={`/retro`}
                                key={'retro'}
                                className="blog-post-tag-icon-link"
                            >
                                <img 
                                    src ={retro} 
                                    className="blog-post-tag-icon" 
                                    title="Retro"
                                    alt="Retro"
                                    style={{ 
                                        width: '15px', 
                                        height: '15px'
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