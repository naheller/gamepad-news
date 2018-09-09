import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
// import Img from 'gatsby-image'
import SiteLayout from '../components/SiteLayout'
import { get, map, join, kebabCase } from 'lodash'
import moment from 'moment'

import TagIcons from '../components/TagIcons'
import facebook from '../../static/svg/facebook-blue.svg'
import twitter from '../../static/svg/twitter-blue.svg'
import '../styles.css'

const PostTemplate = props => {
    console.log('PostTemplate props', props)
    const { data, location, pageContext } = props
    // const siteTitle = get(data, 'site.siteMetadata.title', 'Gamepad News')

    const post = get(data, 'markdownRemark', {})
    const s3ImageKey = get(data, 's3Image.Key', '')

    const { title, date, /*image, s3image,*/ tags, description } = post.frontmatter
    const { previous, next, /*slug*/ } = pageContext
    const { slug } = post.fields
    console.log('slug', slug)

    const dayOfWeek = moment(date).format('dddd')
    const restOfDate = moment(date).format('MMM D, YYYY - h:mm a')

    const showHeader = () => (
        <div className="blog-post-header">
            <h1 className="h1-post-title">{title}</h1>
            {/* <hr style={{ marginBottom: '0.85rem', background: '#dcdcdc' }} /> */}
            <div className="blog-post-date-social">
                <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center' }}>
                    <div className="blog-post-date">
                        <span>{`${dayOfWeek}, `}</span>
                        <span style={{ color: '#939393' }}>{restOfDate}</span>
                    </div>
                    <TagIcons tags={tags} blogPost />
                </div>
                
                <div className="blog-post-social-buttons-wrapper blog-post-social-buttons-wrapper-no-mgn">
                    {showFbButton()}
                    {showTwitterButton()}
                </div>
            </div>
        </div>
    )

    const showFbButton = () => (
        <div 
            className="blog-post-social-button fb-blue"
            onClick={() => window.open(`https://www.facebook.com/sharer.php?u=https://gamepad.news/${slug}`, '_blank', 'top=250,left=250,width=555,height=326')} 
        >
            <img 
                src={facebook} 
                alt="facebook"
                style={{ width: '13px', margin: '0 6px 0 0' }} 
            />
            <span className="blog-post-social-button-text">share</span>
        </div>
    )

    const showTwitterButton = () => (
        <div 
            className="blog-post-social-button twitter-blue"
            onClick={() => window.open(`https://twitter.com/intent/tweet?url=https://gamepad.news/${slug}`, '_blank', 'top=250,left=250,width=500,height=300')}
        >
            <img 
                src={twitter} 
                alt="twitter"
                style={{ width: '13px', margin: '0 7px 0 0' }} 
            />
            <span className="blog-post-social-button-text">tweet</span>
        </div>
    )

    const showBody = () => (
        <p className="blog-post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
    )

    const showTags = () => (
        <div className="tags-container">
            <h5 className="tags-header">in this post</h5>
            <div className="tags-list">
                {map(tags, tag => (
                    <Link
                        to={`/${kebabCase(tag)}`}
                        key={kebabCase(tag)}
                    >
                        <div className="tag-item">{tag}</div>
                    </Link>
                ))}
            </div>
        </div>
    )

    const showPrevNext = () => (
        <div className="prev-next-container">
            <h5 className="prev-next-header">up next...</h5>
            <div className="prev-next-buttons">
                {previous && (
                    <div className="prev-next-button">
                        <Link 
                            rel="prev"
                            to={previous.fields.slug} 
                        >
                            <div className="prev-next-button-text">
                                {previous.frontmatter.title.toLowerCase()}
                            </div>
                        </Link>
                    </div>
                )}

                {next && (
                    <div className="prev-next-button">
                        <Link 
                            rel="next"
                            to={next.fields.slug} 
                        >
                            <div className="prev-next-button-text">
                                {next.frontmatter.title.toLowerCase()}
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )

    return (
        <SiteLayout location={location}>
            <div className="blog-post">
                <Helmet>
                    <title>{title}</title>
                    <meta name="title" content={title} />
                    <meta name="description" content={description} /> 
                    <meta name="keywords" content={join(tags, ',')} />
                    <meta name="robots" content="index,follow" />

                    <meta property="og:url" content={`https://gamepad.news/${slug}`} />
                    <meta property="og:type" content="article" />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta 
                        property="og:image" 
                        content={`https://s3-us-west-2.amazonaws.com/gamepad-images/${s3ImageKey}`} 
                    />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:creator" content="gamepad_news" />
                    <meta name="twitter:title" content={title} />
                    <meta name="twitter:description" content={description} />
                    <meta 
                        name="twitter:image" 
                        content={`https://s3-us-west-2.amazonaws.com/gamepad-images/${s3ImageKey}`}
                    />
                </Helmet>
                {showHeader()}
                {/* <Img sizes={image.childImageSharp.sizes} className="featured-image" /> */}
                <img 
                    className="featured-image" 
                    src={`https://s3-us-west-2.amazonaws.com/gamepad-images/${s3ImageKey}`} 
                    alt="featured"
                />
                {showBody()}
                <div className="blog-post-social-buttons-wrapper" style={{ marginLeft: '1rem' }}>
                    {showFbButton()}
                    {showTwitterButton()}
                </div>
                <hr className="blog-post-details-divider" />
                {showTags()}
                <hr className="blog-post-details-divider" />
                {showPrevNext()}
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
                date
                author
                description
                tags
                s3image
                image {
                    publicURL
                    childImageSharp{
                        sizes(maxWidth: 630) {
                            ...GatsbyImageSharpSizes
                        }
                    }
                }
            }
        }
        s3Image(Key: { eq: "destiny-2-forsaken.jpg" }) {
            id
            Key
            Url
        }
    }
`