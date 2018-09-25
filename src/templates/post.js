import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import _ from 'lodash'
import moment from 'moment'

import SiteLayout from '../components/SiteLayout'
import ShareButtons from '../components/ShareButtons'

const PostTemplate = props => {
    const { data, location, pageContext } = props
    // const siteTitle = _.get(data, 'site.siteMetadata.title', 'Gamepad News')

    const post = _.get(data, 'markdownRemark', {})
    const s3ImageUrl = _.get(data, 's3Image.Url', '')
    const s3ImageSizes = _.get(data, 's3Image.localFile.childImageSharp.sizes', {})

    const { title, date, /*image,*/ /*s3image,*/ tags, description, author } = post.frontmatter
    const { previous, next, /*slug*/ } = pageContext
    const { slug } = post.fields

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

    const renderArticle = () => (
        <div>
            <h1 className="title is-size-3 has-letter-spacing-05">
                {title}
            </h1>
            <hr className="header-hr" />
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
                <div className="level-right">
                    <ShareButtons slug={slug} title={title} showAll={false} />
                </div>
            </div>
            <Img className="featured-image no-print" sizes={s3ImageSizes} />
            <div 
                className="content has-letter-spacing-05"
                style={{ fontSize: '1.1rem' }}
                dangerouslySetInnerHTML={{ __html: post.html }} 
            />
        </div>
    )

    const renderTags = () => (
        <div className="tags no-print">
            {_.map(tags, tag => (
                    <span 
                        key={tag}
                        className="tag is-uppercase has-letter-spacing-1 is-size-7"
                    >
                        <Link 
                            to={`/${_.kebabCase(tag)}`} 
                            className="has-text-dark"
                        >
                            {tag}
                        </Link>
                    </span>
                )
            )}
        </div>
    )

    const renderPrevNext = () => (
        <div className="level is-mobile no-print">
            <div className="level-left">
                <button 
                    className="level-item button is-rounded" 
                    onClick={() => window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    })}
                >
                    <span className="icon">
                        <i className="fas fa-chevron-up" />
                    </span>
                    <span>Back to top</span>
                </button>
                <Link to="/" className="level-item">
                    <button className="button is-rounded home-button">
                        <span className="icon">
                            <i className="fas fa-home" />
                        </span>
                        <span className="prev-next-label">Home</span>
                    </button>
                </Link> 
            </div>
            <div className="level-right">
                {   
                    !_.isNull(previous) &&
                    <Link to={`/${previous.fields.slug}`} className="level-item">
                        <button className="button is-rounded">
                            <span className="icon">
                                <i className="fas fa-chevron-left" />
                            </span>
                            <span className="prev-next-label">Older</span>
                        </button>
                    </Link> 
                }
                {   
                    !_.isNull(next) &&
                    <Link to={`/${next.fields.slug}`} className="level-item">
                        <button className="button is-rounded">
                            <span className="prev-next-label">Newer</span>
                            <span className="icon">
                                <i className="fas fa-chevron-right" />
                            </span>
                        </button>
                    </Link> 
                }
            </div>
        </div>
    )

    const addHelmet = () => (
        <Helmet>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} /> 
            <meta name="keywords" content={_.join(tags, ',')} />
            <meta name="robots" content="index,follow" />

            <meta property="og:url" content={`https://gamepad.news/${slug}`} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta 
                property="og:image" 
                content={s3ImageUrl} 
            />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="gamepad_news" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta 
                name="twitter:image" 
                content={s3ImageUrl}
            />
        </Helmet>
    )

    return (
        <SiteLayout location={location}>
            {addHelmet()}
            <div className="blog-post">
                {renderArticle()}
                <ShareButtons slug={slug} title={title} showAll />
                {renderTags()}
                <hr />
                {renderPrevNext()}
                {/* <hr /> */}
            </div>
        </SiteLayout>
    )
}

export default PostTemplate

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            fields {
                slug
                s3ImageKey
            }
            frontmatter {
                title
                date
                author
                description
                tags
                s3image
            }
        }
        s3Image(Key: { eq: "dead-cells.jpg" }) {
            id
            Key
            Url
            localFile {
                childImageSharp {
                    sizes {
                        ...GatsbyImageSharpSizes
                    }
                }
            }
        }
    }
`