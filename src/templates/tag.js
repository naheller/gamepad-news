import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import SiteLayout from '../components/SiteLayout'
import get from 'lodash/get'
import BlogPosts from '../components/BlogPosts'

const TagTemplate = props => { 
    const { data, location, pageContext } = props
    const { tag } = pageContext

    const siteTitle = get(data, 'site.siteMetadata.title', 'Gamepad News')

    const showTagHeader = () => {
        const { data, pageContext } = props
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

    const showPosts = () => {
        const { data } = props
        const { edges } = data.allMarkdownRemark

        return <BlogPosts posts={edges} />
    }

    return (
        <SiteLayout location={location}>
            <Helmet title={`${tag} | ${siteTitle}`} />
            {showTagHeader()}
            {showPosts()}
        </SiteLayout>
    )
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
