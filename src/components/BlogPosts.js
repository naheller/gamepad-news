import React, { Component } from 'react'
import { map, take, kebabCase, includes } from 'lodash'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import arrow from '../../static/svg/arrow.svg'
import ps from '../../static/svg/playstation-tomato.svg'
import xbox from '../../static/svg/xbox-tomato.svg'
import nSwitch from '../../static/svg/switch-tomato.svg'
import pc from '../../static/svg/pc-tomato.svg'
import mobile from '../../static/svg/phone-tomato.svg'
import retro from '../../static/svg/invaders-tomato.svg'

import '../styles.css'

class BlogPosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numPosts: 1
        }
    }

    loadMorePosts() {
        this.setState({
            numPosts: this.state.numPosts + 1
        })
    }

    showMorePostsButton() {
        if (this.state.numPosts < this.props.posts.length) {
            return (
                <div 
                    onClick={() => this.loadMorePosts()}
                    className="index-more-posts-button"
                >
                    <div style={{ marginBottom: '2px' }}>more stories</div>
                    <img 
                        src={arrow} 
                        className="index-more-posts-button-svg"
                        alt="more stories"
                    />
                </div>
            )
        } 
    }

    showTagsReadMore(tags, slug) {
        return (
            <div className="index-tags-read-more-wrapper">
                <div className="index-tags-list">
                    {map(tags, tag => (
                            <Link 
                                to={`/${kebabCase(tag)}`}
                                key={kebabCase(tag)}
                            >
                                <div className="tag-item" style={{ fontSize: '13px' }}>
                                    {tag}
                                </div>
                            </Link>
                        )
                    )}
                </div>
                <Link to={slug}>
                    <div className="index-read-more-button">
                        read more{`\xa0\xa0`}
                    </div>
                </Link>     
            </div>
        )
    }

    showTagIcons(tags) {
        const tagIcons = {
            playstation: 'playstation',
            xbox: 'xbox',
            // 'switch',
            pc: 'pc',
            mobile: 'mobile',
            retro: 'retro'
        }

        return (
            <div className="blog-post-tag-icons">
                {   
                    map(tags, tag => {
                        switch(tag) {
                            case 'playstation': {
                                return (
                                    <Link
                                        to={`/playstation`}
                                        key={'ps'}
                                    >
                                        <img 
                                            src ={ps} 
                                            className="blog-post-tag-icon" 
                                        />
                                    </Link>
                                )
                            }
                            case 'xbox': {
                                return (
                                    <Link
                                        to={`/xbox`}
                                        key={'xbox'}
                                    >
                                        <img 
                                            src ={xbox} 
                                            className="blog-post-tag-icon" 
                                        />
                                    </Link>
                                )
                            }
                            case 'switch': {
                                return (
                                    <Link
                                        to={`/switch`}
                                        key={'switch'}
                                    >
                                        <img 
                                            src ={nSwitch} 
                                            className="blog-post-tag-icon" 
                                        />
                                    </Link>
                                )
                            }
                            case 'pc': {
                                return (
                                    <Link
                                        to={`/pc`}
                                        key={'pc'}
                                    >
                                        <img 
                                            src ={pc} 
                                            className="blog-post-tag-icon" 
                                        />
                                    </Link>
                                )
                            }
                            case 'mobile': {
                                return (
                                    <Link
                                        to={`/mobile`}
                                        key={'mobile'}
                                    >
                                        <img 
                                            src ={mobile} 
                                            className="blog-post-tag-icon" 
                                        />
                                    </Link>
                                )
                            }
                            case 'retro': {
                                return (
                                    <Link
                                        to={`/retro`}
                                        key={'retro'}
                                    >
                                        <img 
                                            src ={retro} 
                                            className="blog-post-tag-icon" 
                                        />
                                    </Link>
                                )
                            }
                        }
                    })
                }
            </div>
        )
    }

    render() {
        return (
            <div>
                {map(take(this.props.posts, this.state.numPosts), ({ node }, index) => {
                    const { slug } = node.fields
                    const { title, date, tags, image } = node.frontmatter
                    return (
                        <div key={`blog-post-${index}`}>
                            <div className="blog-post content-wrapper" key={slug}>
                                <h2 className="h2-post-title-wrapper">
                                    <Link to={slug} className="h2-post-title">{title}</Link>
                                </h2>
                                <div className="blog-post-date-icon-wrapper">
                                    <div className="index-post-date">
                                        <p style={{ margin: 0 }}>{date}</p>
                                    </div>
                                    {this.showTagIcons(tags)}
                                </div>
                                <Link to={slug}>
                                    <Img 
                                        className="featured-image"
                                        sizes={image.childImageSharp.sizes} 
                                    />
                                </Link>
                                <p 
                                    className="index-post-excerpt"
                                    dangerouslySetInnerHTML={{ __html: node.excerpt }} 
                                />
                                {this.showTagsReadMore(tags, slug)}
                            </div>
                            {index !== this.state.numPosts - 1 && <hr className="blog-post-divider" />}
                        </div>
                    )
                })}
                {this.showMorePostsButton()}
            </div>
        )
    }
}

export default BlogPosts