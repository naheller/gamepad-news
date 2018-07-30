import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import SiteLayout from '../components/SiteLayout'
import { get, map, kebabCase } from 'lodash'

import facebook from '../../static/svg/facebook-blue.svg'
import twitter from '../../static/svg/twitter-blue.svg'

class PostTemplate extends Component {
    render() {
        const { data, location, pageContext } = this.props
        const siteTitle = get(data, 'site.siteMetadata.title', 'Gamepad News')

        const post = get(data, 'markdownRemark', {})
        const { title, date, image, tags } = post.frontmatter
        const { previous, next } = pageContext
        const { slug } = post.fields

        return (
        <SiteLayout location={location}>
            <div className="blog-post content-wrapper">
                <Helmet title={`${title} | ${siteTitle}`} />
                <div className="blog-post-header">
                    <h1 className="h1-post-title">{title}</h1>
                    <div className="blog-post-date-social">
                        <div className="blog-post-date">{date}</div>
                        <div className="blog-post-social-buttons-wrapper">
                            <div 
                                className="blog-post-social-button fb-blue"
                                onClick={() => window.open(`https://www.facebook.com/sharer.php?u=https://gamepad.news${slug}`, '_blank', 'top=250,left=250,width=555,height=326')} 
                            >
                                <img 
                                    src={facebook} 
                                    alt="facebook"
                                    style={{ width: '13px', margin: '0 4px 4px 1px' }} 
                                />
                                <span>share</span>
                            </div>
                            <div 
                                className="blog-post-social-button twitter-blue"
                                onClick={() => window.open(`https://twitter.com/intent/tweet?url=https://gamepad.news${slug}`, '_blank', 'top=250,left=250,width=500,height=300')}
                            >
                                <img 
                                    src={twitter} 
                                    alt="twitter"
                                    style={{ width: '13px', margin: '0 6px 4px 4px' }} 
                                />
                                <span>tweet</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Img sizes={image.childImageSharp.sizes} className="featured-image" />
                <p className="blog-post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
                <hr className="blog-post-details-divider" />
                <div className="tags-container">
                    <h6 className="tags-header">in this post</h6>
                    <div className="tags-list">
                        {map(tags, tag => {
                            return (
                                <Link
                                    to={`/${kebabCase(tag)}`}
                                    key={kebabCase(tag)}
                                >
                                    <div className="tag-item">{tag}</div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <hr className="blog-post-details-divider" />
                <div className="prev-next-container">
                <h6 className="prev-next-header">up next...</h6>
                    <div className="prev-next-buttons">
                        {previous && (
                            <div className="prev-next-button">
                                <Link 
                                    rel="prev"
                                    to={previous.fields.slug} 
                                    className="prev-next-button-text"
                                >
                                    <div>{previous.frontmatter.title.toLowerCase()}</div>
                                </Link>
                            </div>
                        )}

                        {next && (
                            <div className="prev-next-button">
                                <Link 
                                    rel="next"
                                    to={next.fields.slug} 
                                    className="prev-next-button-text"
                                >
                                    <div>{next.frontmatter.title.toLowerCase()}</div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </SiteLayout>
        )
    }
}

export default PostTemplate

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                author
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
                date(formatString: "dddd, MMM D, YYYY")
                author
                tags
                image {
                    childImageSharp{
                        sizes(maxWidth: 630) {
                            ...GatsbyImageSharpSizes
                        }
                    }
                }
            }
        }
    }
`
