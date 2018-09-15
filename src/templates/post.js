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

    const { title, date, /*image,*/ /*s3image,*/ tags, description, author } = post.frontmatter
    const { previous, next, /*slug*/ } = pageContext
    const { slug } = post.fields

    const dayOfWeek = moment(date).format('dddd')
    const restOfDate = moment(date).format('MMM D, YYYY - h:mm a')

    const renderShareButtons = (withText = false) => (
        <div className="field is-grouped">
            <button 
                className="button control is-link is-outlined"
                onClick={() => window.open(
                    `https://www.facebook.com/sharer.php?u=https://gamepad.news/${slug}`, '_blank', 'top=250,left=250,width=555,height=326'
                )}
            >
                <span 
                    className="icon"
                >
                    <i className="fab fa-facebook-f" />
                </span>
                { withText && <span>Share</span> }
            </button>
            <button 
                className="button control is-info is-outlined"
                onClick={() => window.open(
                    `https://twitter.com/intent/tweet?url=https://gamepad.news/${slug}`, '_blank', 'top=250,left=250,width=500,height=300'
                )}
            >
                <span className="icon">
                    <i className="fab fa-twitter" />
                </span>
                { withText && <span>Tweet</span> }
            </button>
            <button 
                className="button control is-danger is-outlined"
                onClick={() => window.open(
                    `https://www.reddit.com/submit?url=https://gamepad.news/${slug}&title=${_.replace(title, '', '%20')}`, '_blank', 'width=610,height=600'
                )}
            >
                <span className="icon">
                    <i className="fab fa-reddit-alien" />
                </span>
                { withText && <span>Post</span> }
            </button>
        </div>
    )

    const renderArticle = () => (
        <div>
            <h1 className="title is-size-2">{title}</h1>
            <hr className="header-hr" />
            <div className="level">
                <div className="blog-post-date-author">
                    <h2 className="subtitle level-left is-uppercase is-6 has-letter-spacing-1">{`${dayOfWeek}, ${restOfDate}`}</h2>
                    <div className="by-author level-left has-letter-spacing-1">
                        <p className="subtitle is-7 has-text-grey-light">{`by\xa0`}</p>
                        <p className="subtitle is-uppercase is-7 has-text-grey-light">{author}</p>
                    </div>
                </div>
                <div className="level-right">{renderShareButtons()}</div>
            </div>
            <Img className="featured-image" sizes={s3ImageSizes} />
            <div 
                className="content is-size-5" 
                dangerouslySetInnerHTML={{ __html: post.html }} 
            />
        </div>
    )

    const renderTags = () => (
        <div className="tags">
            {_.map(tags, tag => (
                    <span 
                        key={tag}
                        className="tag is-uppercase has-letter-spacing-1"
                    >
                        <Link to={`/${_.kebabCase(tag)}`} className="has-text-dark">{tag}</Link>
                    </span>
                )
            )}
        </div>
    )

    const renderPrevNext = () => (
        <div className="level">
            {   
                !_.isNull(previous) &&
                <Link to={`/${previous.fields.slug}`} className="level-left">
                    <button className="button is-rounded">
                        <span className="icon">
                            <i className="fas fa-chevron-left" />
                        </span>
                        <span>Older</span>
                    </button>
                </Link> 
            }
            {   
                !_.isNull(next) &&
                <Link to={`/${next.fields.slug}`} className="level-right">
                    <button className="button is-rounded">
                        <span>Newer</span>
                        <span className="icon">
                            <i className="fas fa-chevron-right" />
                        </span>
                    </button>
                </Link> 
            }
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
                {/* <div className="container"> */}
                    {renderArticle()}
                {/* </div> */}
                {/* <div className="container"> */}
                    {renderShareButtons(true)}
                {/* </div> */}
                {/* <div className="container"> */}
                    {renderTags()}
                {/* </div> */}
                {/* <hr /> */}
                {/* <div className="container"> */}
                    {renderPrevNext()}
                {/* </div> */}
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