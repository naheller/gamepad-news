import React, { PureComponent } from 'react'
import moment from 'moment'
import _ from 'lodash'
import Link from 'gatsby-link'
// import Img from 'gatsby-image'
// import gamepad from '../../static/svg/joystick.svg'
import '../../static/fontello/css/fontello.css'
import './BlogPosts.scss'

class BlogPosts extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            numPosts: 10
        }
    }

    render() {
        const posts = _.get(this.props, 'posts', [])

        return (
            <section className="post-list">
                {this.props.tagName && (
                    <div className="tag-header">
                        <h3 className="label">stories about&nbsp;</h3>
                        <h3 className="name">{this.props.tagName}</h3>
                    </div>
                )}
                <>
                    {_.map(posts, post => {
                        // const title = _.get(post, 'node.frontmatter.title', '')
                        const { title, subtitle, date, image, metaTitle, /*tags, description,*/ author } = post.node.frontmatter
                        const resizedImage = `${image}-/scale_crop/375x200/center/-/format/auto/-/quality/lightest/`

                        let formattedDate = moment(date).format('MMM D, YYYY – h:mm a')
                        const hourMin = moment(date).format('h:mm a')
                        const now = moment()

                        const hoursDiff = now.diff(moment(date), 'hours')
                        const daysDiff = now.diff(moment(date), 'days')



                        if (hoursDiff < 24) {
                            formattedDate = `Today at ${hourMin}`
                        } else if (daysDiff === 1) {
                            formattedDate = `Yesterday at ${hourMin}`
                        }

                        return (
                            <Link 
                                to={post.node.fields.slug} 
                                title={metaTitle} 
                                key={post.node.fields.slug}
                                className="post"
                            >
                                <div className="words">
                                    <div className="title-subtitle">
                                        <h1 className="title">{title}</h1>
                                        {subtitle && <p className="subtitle">{subtitle}</p>}
                                    </div>
                                    <div className="date-author">
                                        <p className="author">by <span className="name">{author}</span></p>
                                        <time>{formattedDate}</time>
                                    </div>
                                </div>
                                <img 
                                    src={resizedImage} 
                                    alt={`${metaTitle} - Gamepad News`} 
                                    title={`${metaTitle} - Gamepad News`}
                                    className="image"
                                />
                            </Link>
                        )
                    })}
                </>
            </section>
        )
    }
}

export default BlogPosts