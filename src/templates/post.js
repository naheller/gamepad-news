import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import _ from 'lodash'
import moment from 'moment'
import { Button, Tag, Divider } from 'antd'

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
        <div style={{ marginBottom: '2rem' }}>
            <h1>{title}</h1>
            <Divider />
            <div 
                style={{ 
                    display: 'flex', 
                    flexFlow: 'row wrap', 
                    justifyContent: 'space-between', 
                }}
            >
                <div style={{ marginBottom: '1rem' }}>
                    <h5>{formattedDate}</h5>
                    <h6 style={{ fontWeight: 'lighter', color: '#666' }}><i>{`by ${author}`}</i></h6>
                </div>
                <ShareButtons slug={slug} title={title} showAll={false} />
            </div>
            <Img sizes={s3ImageSizes} style={{ marginBottom: '2rem', borderRadius: '4px' }} />
            <div style={{ fontSize: '16px', lineHeight: '1.75' }} dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
    )

    const renderTags = () => (
        <div>
            <h5>In this story...</h5>
            {_.map(tags, tag => (
                <Tag style={{ marginBottom: '0.25rem' }}>
                    <span key={tag}>
                        <Link to={`/${_.kebabCase(tag)}`}>
                            {tag}
                        </Link>
                    </span>
                </Tag>
            ))}
        </div>
    )

    const renderPrevNext = () => (
        <div 
            style={{ 
                display: 'flex', 
                flexFlow: 'row wrap', 
                justifyContent: 'space-between', 
                marginBottom: '1rem' 
            }}
        >
            <Button.Group style={{ marginBottom: '1rem' }}>
                <Button 
                    
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
                </Button>
                <Button >
                    <Link to="/">
                        <span className="icon">
                            <i className="fas fa-home" />
                        </span>
                        <span>{'\xa0\xa0Home'}</span>
                    </Link> 
                </Button>
            </Button.Group>
            <div>
                <Button.Group>
                {   
                    !_.isNull(previous) &&
                    <Button >
                        <Link to={`/${previous.fields.slug}`}>
                            <span className="icon">
                                <i className="fas fa-chevron-left" />
                            </span>
                            <span>{'\xa0\xa0Older'}</span>
                        </Link>
                    </Button> 
                }
                {   
                    !_.isNull(next) &&
                    <Button >
                        <Link to={`/${next.fields.slug}`}>
                            <span>{'Newer\xa0\xa0'}</span>
                            <span className="icon">
                                <i className="fas fa-chevron-right" />
                            </span>
                        </Link>
                    </Button>
                }
                </Button.Group>
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
            {renderArticle()}
            <ShareButtons slug={slug} title={title} showAll />
            <Divider />
            {renderTags()}
            <Divider />
            {renderPrevNext()}
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