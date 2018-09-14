import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import SiteLayout from '../components/SiteLayout'
import _ from 'lodash'
import moment from 'moment'

const PostTemplate = props => {
    const { data, location, pageContext } = props
    // const siteTitle = _.get(data, 'site.siteMetadata.title', 'Gamepad News')

    const post = _.get(data, 'markdownRemark', {})
    const s3ImageUrl = _.get(data, 's3Image.Url', '')
    const s3ImageSizes = _.get(data, 's3Image.localFile.childImageSharp.sizes', {})

    const { title, date, /*image,*/ /*s3image,*/ tags, description } = post.frontmatter
    const { previous, next, /*slug*/ } = pageContext
    const { slug } = post.fields

    const dayOfWeek = moment(date).format('dddd')
    const restOfDate = moment(date).format('MMM D, YYYY - h:mm a')

    const renderShareButtons = (withText = false) => (
        <div className="field is-grouped">
            <button 
                className="button control is-link is-outlined"
                onClick={() => window.open(`https://www.facebook.com/sharer.php?u=https://gamepad.news/${slug}`, '_blank', 'top=250,left=250,width=555,height=326')}
            >
                <span class="icon">
                    <i className="fab fa-facebook-f" />
                </span>
                { withText && <span>Share</span> }
            </button>
            <button 
                className="button control is-info is-outlined"
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=https://gamepad.news/${slug}`, '_blank', 'top=250,left=250,width=500,height=300')}
            >
                <span class="icon">
                    <i className="fab fa-twitter" />
                </span>
                { withText && <span>Tweet</span> }
            </button>
            <button 
                className="button control is-danger is-outlined"
                onClick={() => window.open(`https://www.reddit.com/submit?url=https://gamepad.news/${slug}&title=${_.replace(title, '', '%20')}`, '_blank', 'width=610,height=600')}
            >
                <span class="icon">
                    <i className="fab fa-reddit-alien" />
                </span>
                { withText && <span>Post</span> }
            </button>
        </div>
    )

    return (
        <SiteLayout location={location}>
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
            <div className="blog-post">
                <div className="section">
                    <div className="container">
                        <h1 className="title is-size-1">{title}</h1>
                        <hr className="header-hr" />
                        <div className="level">
                            <h2 className="subtitle level-left">{`${dayOfWeek}, ${restOfDate}`}</h2>
                            <div className="level-right">{renderShareButtons()}</div>
                        </div>
                        <Img className="featured-image" sizes={s3ImageSizes} />
                        <div 
                            className="content is-size-5" 
                            dangerouslySetInnerHTML={{ __html: post.html }} 
                        />
                        {renderShareButtons(true)}
                    </div>
                    <hr />
                    <div className="tags container">
                        {_.map(tags, tag => (
                                <span className="tag is-uppercase has-letter-spacing-1">
                                    <Link to={`/${_.kebabCase(tag)}`} className="has-text-dark">{tag}</Link>
                                </span>
                            )
                        )}
                    </div>
                </div>
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