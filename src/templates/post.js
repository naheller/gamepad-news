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
            <h1>{title}</h1>
            <hr />
            <div className="date-author-share">
                <div>
                    <p className="date">{formattedDate}</p>
                    <p className="author">{`by ${author}`}</p>
                </div>
                <ShareButtons slug={slug} title={title} showAll={false} />
            </div>
            <Img sizes={s3ImageSizes} />
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
    )

    const renderTags = () => (
        <div>
            <h4>In this story...</h4>
            {_.map(tags, tag => (
                <Link to={`/${_.kebabCase(tag)}`}>
                    <span key={tag}>
                        {tag}
                    </span>
                </Link>
            ))}
        </div>
    )

    const renderPrevNext = () => (
        <div>
            <div>
                <button
                    onClick={() => window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    })}
                >
                    <span className="icon">
                        <i className="fas fa-chevron-up" />
                    </span>
                    <span>{'\xa0\xa0Back to top'}</span>
                </button>
                <button>
                    <Link to="/">  
                        <span className="icon">
                            <i className="fas fa-home" />
                        </span>
                        <span>{'\xa0\xa0Home'}</span>
                    </Link> 
                </button>
            </div>
            <div>
            {   
                !_.isNull(previous) &&
                <button>
                    <Link to={`/${previous.fields.slug}`}>
                        <span className="icon">
                            <i className="fas fa-chevron-left" />
                        </span>
                        <span>{'\xa0\xa0Older'}</span>
                    </Link>
                </button> 
            }
            {   
                !_.isNull(next) &&
                <button>
                    <Link to={`/${next.fields.slug}`}>
                        <span>{'Newer\xa0\xa0'}</span>
                        <span className="icon">
                            <i className="fas fa-chevron-right" />
                        </span>
                    </Link>
                </button>
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
                <hr />
                {renderTags()}
                <hr />
                {renderPrevNext()}
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