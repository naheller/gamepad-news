import React from 'react'
import Helmet from 'react-helmet'
import { /*Link,*/ graphql } from 'gatsby'
// import Img from 'gatsby-image'
import _ from 'lodash'
import moment from 'moment'

// import Comments from '../components/Comments'
import SiteLayout from '../components/SiteLayout'
import Button from '../components/Button'
import ShareButton from '../components/ShareButton'
import '../../static/fontello/css/fontello.css'
import './post.scss'

const PostTemplate = props => {
    const { data, location, /*pageContext*/ } = props
    const siteTitle = _.get(data, 'site.siteMetadata.title')
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
        <>
            <h1 className="headline">{title}</h1>
            {subtitle !== '' && (
                <div className="subtitle">
                    <h2 className="text">{subtitle}</h2>
                </div>
            )}
            <div className="date-author-share">
                <div className="date-author">
                    <div className="date">{formattedDate}</div>
                    <p className="author">by <span className="name">{author}</span></p>
                </div>
                {renderTopShare()}
            </div>
            <img 
                src={`${image}-/format/auto/-/quality/lightest/`} 
                className="image"
                alt={`${metaTitle} - ${siteTitle}`} 
                title={`${metaTitle} - ${siteTitle}`} 
            />
            <div className="share-tags-body">
                <div className="share-tags">
                    {renderBottomShare()}
                    {renderTags()}
                </div>
                
                <div className="body-and-below">
                    <div className="body" dangerouslySetInnerHTML={{ __html: post.html }} />
                    {renderBottomNav()}
                </div>
                
            </div>
            
        </>
    )

    const renderTopShare = () => (
        <div className="share-button-group">
            <ShareButton slug={slug} title={metaTitle} facebook />
            <ShareButton slug={slug} title={metaTitle} twitter />
            <ShareButton slug={slug} title={metaTitle} reddit />
        </div>
    )
    
    const renderBottomShare = () => (
        <div className="share">
            <p className="header">Share this article</p>
            <div className="share-button-group">
                <ShareButton slug={slug} title={metaTitle} facebook text />
                <ShareButton slug={slug} title={metaTitle} twitter text />
                <ShareButton slug={slug} title={metaTitle} reddit text />
                <ShareButton slug={slug} title={metaTitle} mail text />
                <ShareButton slug={slug} title={metaTitle} link text />
            </div>
        </div>
    )

    const renderTags = () => (
        <div className="tags">
            <p className="header">Explore the topics</p>
            <div className="items">
                {_.map(tags, tag => <Button key={tag} tag={tag} />)}
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
        <div className="button-row">
            <Button 
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
                <div className="text">
                    Back to top
                </div>
            </Button>
            <Button internalLink slug ='/'>
                <span className="icon">
                    <i className="icon-home" />
                </span>
                {`\xa0\xa0\xa0`}
                <div className="text">
                    Home
                </div>
            </Button>
        </div>
    )

    const addHelmet = () => (
        <Helmet>
            <title>{metaTitle}</title>
            <meta name="title" content={siteTitle} />
            <meta name="description" content={metaDescription} /> 
            <meta name="keywords" content={_.join(tags, ',')} />
            <meta name="robots" content="index,follow" />

            <meta property="og:url" content={`https://gamepad.news/${slug}`} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={image} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@gamepad_news" />
            <meta name="twitter:creator" content="@gamepad_news" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    )

    return (
        <SiteLayout location={location}>
            {addHelmet()}
            <div className="blog-post">
                {renderArticle()}
                {/* {renderPrevNext()} */}
                {/* <Comments /> */}
            </div>
        </SiteLayout>
    )
}

export default PostTemplate

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                tagline
                description
            }
        }
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