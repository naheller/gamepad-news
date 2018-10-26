import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import _ from 'lodash'
import moment from 'moment'

import SiteLayout from '../components/SiteLayout'
import ShareButton from '../components/ShareButton'

const PostTemplate = props => {
    const { data, location, /*pageContext*/ } = props
    // const siteTitle = _.get(data, 'site.siteMetadata.title', 'Gamepad News')

    const post = _.get(data, 'markdownRemark', {})
    const s3ImageUrl = _.get(data, 's3Image.Url', '')
    const s3ImageSizes = _.get(data, 's3Image.localFile.childImageSharp.sizes', {})

    const { title, date, tags, description, author } = post.frontmatter
    // const { previous, next } = pageContext
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
            <h1 className="headline">{title}</h1>
            <div className="date-author-share">
                <div className="date-author">
                    <h4 className="date">{formattedDate}</h4>
                    <p className="author">{`by ${author}`}</p>
                </div>
                <div className="share-button-group top">
                    <ShareButton slug={slug} title={title} facebook />
                    <ShareButton slug={slug} title={title} twitter />
                    <ShareButton slug={slug} title={title} reddit />
                </div>
            </div>
            <Img sizes={s3ImageSizes} />
            <div className="body" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
    )

    const renderTags = () => (
        <div className="tags">
            <h3 className="header">In this story...</h3>
            <div className="items">
                {_.map(tags, tag => (
                    <Link 
                        key={tag}
                        to={`/${_.kebabCase(tag)}`} 
                        className="button-link" 
                    >
                        <h6 className="text">{tag}</h6>
                    </Link>
                ))}
            </div>
        </div>
    )

    // const renderPrevNext = () => {
    //     return (
    //         <div className="prev-next">
    //             <h3 className="header">In other news</h3>
    //             <div className="posts">
    //                 {!_.isNull(previous) &&
    //                     <div className="prev">
    //                         <Link to={`/${previous.fields.slug}`} className="title">
    //                             {previous.frontmatter.title}
    //                         </Link>
    //                         <span className="date">
    //                             {formatDate(previous.frontmatter.date)}
    //                         </span>
    //                     </div>
    //                 }
    //                 {!_.isNull(previous) && !_.isNull(next) && <div className="divider" />}
    //                 {!_.isNull(next) &&
    //                     <div className="next">
    //                         <Link to={`/${next.fields.slug}`} className="title">
    //                             {next.frontmatter.title}
    //                         </Link>
    //                         <span className="date">
    //                             {formatDate(next.frontmatter.date)}
    //                         </span>
    //                     </div>
    //                 }
    //             </div>
    //         </div>
    //     )
    // }

    // const formatDate = date => {
    //     const now = moment()
    //     const minsDiff = now.diff(moment(date), 'minutes')
    //     const hoursDiff = now.diff(moment(date), 'hours')
    //     const daysDiff = now.diff(moment(date), 'days')

    //     if (minsDiff < 60) {
    //         return `${minsDiff} minute${minsDiff > 1 ? `s` : ``} ago`
    //     } else if (hoursDiff < 24) {
    //         return `${hoursDiff} hour${hoursDiff > 1 ? `s` : ``} ago`
    //     } else if (daysDiff === 1) {
    //         return `yesterday`
    //     } else if (daysDiff < 3) {
    //         return `${daysDiff} day${daysDiff > 1 ? `s` : ``} ago`
    //     } else {
    //         return moment(date).format('MMM D, YYYY')
    //     }
    // }

    const renderBottomNav = () => (
        <div className="bottom-nav">
            <div 
                className="button"
                onClick={() => window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                })}
            >
                <span className="icon">
                    <i className="fas fa-chevron-up" />
                </span>
                {`\xa0\xa0\xa0`}
                <h6 className="text">
                    Back to top
                </h6>
            </div>
            <div className="button">
                <Link to="/">
                    <span className="icon">
                        <i className="fas fa-home" />
                    </span>
                    {`\xa0\xa0\xa0`}
                    <h6 className="text">Home</h6>
                </Link> 
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
                <div className="share-button-group bottom">
                    <ShareButton slug={slug} title={title} facebook />
                    <ShareButton slug={slug} title={title} twitter />
                    <ShareButton slug={slug} title={title} reddit />
                    <ShareButton slug={slug} title={title} mail />
                    <ShareButton slug={slug} title={title} link />
                </div>
                <hr />
                {renderTags()}
                {/* <hr /> */}
                {/* {renderPrevNext()} */}
                <hr />
                {renderBottomNav()}
                {/* <hr /> */}
            </div>
        </SiteLayout>
    )
}

export default PostTemplate

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!, $s3Image: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            fields {
                slug
            }
            frontmatter {
                title
                date
                author
                description
                tags
            }
        }
        s3Image(Key: { eq: $s3Image }) {
            id
            Key
            Url
            localFile {
                childImageSharp {
                    sizes {
                        ...GatsbyImageSharpSizes_withWebp
                    }
                }
            }
        }
    }
`