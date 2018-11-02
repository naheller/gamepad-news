import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
// import Img from 'gatsby-image'
import _ from 'lodash'
import moment from 'moment'

import SiteLayout from '../components/SiteLayout'
import ShareButton from '../components/ShareButton'
import '../../static/styles/fontello/css/fontello.css'

const PostTemplate = props => {
    const { data, location, /*pageContext*/ } = props
    const siteTitle = _.get(data, 'site.siteMetadata.title', 'Gamepad News')
    const post = _.get(data, 'markdownRemark', {})

    const { title, subtitle, date, author, image, tags, metaTitle, metaDescription } = post.frontmatter
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
            {subtitle !== '' && (
                <div className="subtitle">
                    <span className="icon">
                        <i className="icon-right-dir" />
                    </span>
                    <p className="text">{subtitle}</p>
                </div>
            )}
            <div className="date-author-share">
                <div className="date-author">
                    <h4 className="date">{formattedDate}</h4>
                    <p className="author">
                        <span>{`by `}</span>
                        <a href="#">{author}</a>
                    </p>
                </div>
                <div className="share-button-group top">
                    <ShareButton slug={slug} title={metaTitle} facebook />
                    <ShareButton slug={slug} title={metaTitle} twitter />
                    <ShareButton slug={slug} title={metaTitle} reddit />
                </div>
            </div>
            <img src={`${image}-/format/auto/-/progressive/yes/`} alt="Featured image" />
            
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
                    <i className="icon-up-open" />
                </span>
                {`\xa0\xa0\xa0`}
                <h6 className="text">
                    Back to top
                </h6>
            </div>
            <Link to="/" className="button">
                <span className="icon">
                    <i className="icon-home" />
                </span>
                {`\xa0\xa0\xa0`}
                <h6 className="text">Home</h6>
            </Link> 
        </div>
    )

    const addHelmet = () => (
        <Helmet>
            <title>{`${metaTitle} - ${siteTitle}`}</title>
            <meta name="title" content={`${metaTitle} - ${siteTitle}`} />
            <meta name="description" content={metaDescription} /> 
            <meta name="keywords" content={_.join(tags, ',')} />
            <meta name="robots" content="index,follow" />

            <meta property="og:url" content={`https://gamepad.news/${slug}`} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta 
                property="og:image" 
                content={`${image}-/format/auto/`} 
            />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="gamepad_news" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta 
                name="twitter:image" 
                content={`${image}-/format/auto/`}
            />
        </Helmet>
    )

    return (
        <SiteLayout location={location}>
            {addHelmet()}
            <div className="blog-post">
                {renderArticle()}
                <div className="share-button-group bottom">
                    <ShareButton slug={slug} title={metaTitle} facebook />
                    <ShareButton slug={slug} title={metaTitle} twitter />
                    <ShareButton slug={slug} title={metaTitle} reddit />
                    <ShareButton slug={slug} title={metaTitle} mail />
                    <ShareButton slug={slug} title={metaTitle} link />
                </div>
                <hr />
                {renderTags()}
                <hr />
                {/* {renderPrevNext()} */}
                {/* <hr /> */}
                {renderBottomNav()}
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
            }
            frontmatter {
                title
                subtitle
                date
                author
                metaTitle
                metaDescription
                tags
                image
            }
        }
    }
`