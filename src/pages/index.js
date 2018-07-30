import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'

import SiteLayout from '../components/SiteLayout'
import BlogPosts from '../components/BlogPosts'

const BlogIndex = props => {
    const siteTitle = get(props, 'data.site.siteMetadata.title', 'Gamepad News')
    const posts = get(props, 'data.allMarkdownRemark.edges', [])

    return (
        <SiteLayout location={props.location}>
            <Helmet title={siteTitle} />
            <BlogPosts posts={posts} />
        </SiteLayout>
    )
}

export default BlogIndex

export const pageQuery = graphql`
    query IndexQuery {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            totalCount
            edges {
                node {
                    excerpt(pruneLength: 350)
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "dddd, MMM D, YYYY")
                        title
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
