import React, { Component } from 'react'
import moment from 'moment'
import _ from 'lodash'
// import Link from 'gatsby-link'
import Img from 'gatsby-image'

class BlogPosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numPosts: 3
        }
    }

    render() {
        console.log('this.props', this.props)
        const posts = _.get(this.props, 'posts', [])

        return _.map(posts, post => {
            // const title = _.get(post, 'node.frontmatter.title', '')
            const { title, date, /*image,*/ /*s3image,*/ tags, description, author } = post.node.frontmatter
            const sizes = _.get(this.props, 's3imageSize', {})
            let formattedDate = moment(date).format('MMM D, YYYY – h:mm a')

            return (
                <div className="blog-post">
                    <h1 className="title is-size-3 has-letter-spacing-05">
                        {title}
                    </h1>
                    {/* <hr className="header-hr" /> */}
                    <div className="level">
                        <div className="blog-post-date-author">
                            <div 
                                className="subtitle level-left is-uppercase has-letter-spacing-1"
                                style={{ fontSize: '0.95rem' }}
                            >
                                {formattedDate}
                            </div>
                            <div className="by-author level-left has-letter-spacing-1 is-italic">
                                <div className="subtitle is-size-7 has-text-grey-light">
                                    {`by ${author}`}
                                </div>
                            </div>
                        </div>
                        {/* <div className="level-right"> */}
                            {/* <ShareButtons slug={slug} title={title} showAll={false} /> */}
                        {/* </div> */}
                    </div>
                    <Img className="featured-image no-print" sizes={this.props.s3imageSize} />
                    <div 
                        className="content has-letter-spacing-05"
                        style={{ fontSize: '1.1rem' }}
                    >
                        {post.node.excerpt}
                    </div>
                    <div className="level">
                        <div className="level-left">
                            {/* <div className="level-item">
                                <button className="button control is-danger is-outlined">
                                    Read more
                                </button>
                            </div> */}
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <button className="button control is-danger is-outlined">
                                    <span>Read more</span>
                                    <span className="icon">
                                        <i className="fas fa-chevron-right" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr className="header-hr" />
                </div>
            )
        })
    }
}

export default BlogPosts