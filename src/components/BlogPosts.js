import React, { Component } from 'react'
import { map, take, kebabCase } from 'lodash'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import TagIcons from './TagIcons'
import moment from 'moment'

import arrow from '../../static/svg/arrow.svg'
import '../styles.css'

class BlogPosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numPosts: 3
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
                    <div style={{ marginBottom: '2px' }}>more posts</div>
                    <img 
                        src={arrow} 
                        className="index-more-posts-button-svg"
                        alt="more posts"
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
                                <div className="tag-item">
                                    {tag}
                                </div>
                            </Link>
                        )
                    )}
                </div>
                <Link to={slug} style={{ width: 'max-content' }}>
                    <div className="index-read-more-button">
                        read more{`\xa0`}
                    </div>
                </Link>     
            </div>
        )
    }

    showPosts() {
        return (
            map(take(this.props.posts, this.state.numPosts), (post, index) => {
                const { node } = post
                const { slug } = node.fields
                const { title, date, tags, image, s3image } = node.frontmatter

                return (
                    <div key={`blog-post-${index}`}>
                        <div className="blog-post content-wrapper" key={slug}>
                            <h2 className="h2-post-title-wrapper">
                                <Link to={slug} className="h2-post-title">{title}</Link>
                            </h2>
                            <div className="blog-post-date-icon-wrapper">
                                <div className="index-post-date">
                                    {moment(date).format('dddd, MMM D, YYYY')}
                                </div>
                                <TagIcons tags={tags} />
                            </div>
                            <Link to={slug}>
                                {/* <Img 
                                    className="featured-image"
                                    sizes={image.childImageSharp.sizes} 
                                /> */}
                                <img 
                                    className="featured-image"
                                    src={`https://s3-us-west-2.amazonaws.com/gamepad-images/${s3image}`} 
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
            })
        )
    }

    render() {
        return (
            <div>
                {this.showPosts()}
                {this.showMorePostsButton()}
            </div>
        )
    }
}

export default BlogPosts