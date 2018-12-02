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
        this.posts = _.get(props, 'posts', [])
        this.state = {
            numPosts: 10,
            lastUpdate: moment('1970-01-01')
        }
    }

    componentDidMount() {
        const latestPost = _.first(this.posts)
        const { date } = latestPost.node.frontmatter
        this.setState({
            lastUpdate: moment(date)
        })
    }

    render() {
        let formattedDate
        const dayDiff = moment().diff(this.state.lastUpdate, 'days')

        switch(dayDiff) {
            case 0: {
                formattedDate = `today at ${moment(this.state.lastUpdate).format('h:mm a')}`
                break
            }
            case 1: {
                formattedDate = `yesterday at ${moment(this.state.lastUpdate).format('h:mm a')}`
                break
            }
            default: {
                formattedDate = moment(this.state.lastUpdate).format('dddd, MMMM D')
                break
            }
        }

        return (
            <section className="post-list">
                {this.props.tagName ? (
                    <div className="tag-header">
                        <h3 className="label">Articles about&nbsp;</h3>
                        <h3 className="name">{this.props.tagName}</h3>
                    </div>
                ) : (
                    <div className="tag-header">
                        <h3 className="label">Last updated&nbsp;</h3>
                        <h3 className="name">{formattedDate}</h3>
                    </div>
                )}
                <>
                    {_.map(this.posts, post => {
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
                                        <div className="date">{formattedDate}</div>
                                        <div className="author">by <span className="name">{author}</span></div>
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