import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import SiteLayout from '../components/SiteLayout'
import get from 'lodash/get'
import BlogPosts from '../components/BlogPosts'

class TagTemplate extends Component { 
    constructor(props) {
        super(props)
    }

    showTagHeader() {
        const { data, pageContext } = this.props
        const { totalCount } = data.allMarkdownRemark
        const { tag } = pageContext

        return (
            <div>
                <div className="tag-page-header">
                    <p className="tag-page-header-text">
                        {`${totalCount} ${totalCount === 1 ? 'story' : 'stories'} about\xa0`}
                        <span style={{ fontFamily: 'Octarine-Bold' }}>{tag}</span>
                    </p>
                </div>
                <hr className="blog-post-divider" style={{ margin: 0 }} />
            </div>
        )
    }

    showPosts() {
        const { data, location, pageContext } = this.props
        const { edges } = data.allMarkdownRemark
        const { tag } = pageContext

        return <BlogPosts posts={edges} />
    }

    render() {
        const { data, location, pageContext } = this.props
        const { tag } = pageContext

        const siteTitle = get(data, 'site.siteMetadata.title', 'Gamepad News')
        
        return (
            <SiteLayout location={location}>
                    <Helmet title={`${tag} | ${siteTitle}`} />
                    {this.showTagHeader()}
                    {this.showPosts()}
                {/* <div>{this.showMorePostsButton()}</div> */}
            </SiteLayout>
        )
    } 
}

export default TagTemplate

export const pageQuery = graphql`
    query TagPage($tag: String) {
        site {
            siteMetadata {
                title
                author
            }
        }
        allMarkdownRemark(
            limit: 10000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    excerpt(pruneLength: 350)
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
        }
    }
`
