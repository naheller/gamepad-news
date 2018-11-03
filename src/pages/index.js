import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'

import SiteLayout from '../components/SiteLayout'
import BlogPosts from '../components/BlogPosts'

const BlogIndex = props => {
    const siteTitle = get(props, 'data.site.siteMetadata.title')
    const siteTagline = get(props, 'data.site.siteMetadata.tagline')
    const siteDesc = get(props, 'data.site.siteMetadata.description')
    const posts = get(props, 'data.allMarkdownRemark.edges', [])

    return (
        <SiteLayout location={props.location}>
            <Helmet>
                <title>{`${siteTitle} - ${siteTagline}`}</title>
                <meta name="title" content={`${siteTitle} - ${siteTagline}`} /> 
                <meta name="description" content={siteDesc} /> 
                <meta name="keywords" content="video games,videogames,games,gaming,news,playstation,xbox,switch,pc,sony,microsoft,nintendo" />
                <meta name="robots" content="index,follow" />

                <meta property="og:url" content={`https://gamepad.news`} />
                <meta property="og:type" content="blog" />
                <meta property="og:title" content={`${siteTitle} - ${siteTagline}`} />
                <meta property="og:description" content={siteDesc} />
                {/* <meta property="og:image" content={image} /> */}

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@gamepad_news" />
                <meta name="twitter:creator" content="@gamepad_news" />
                <meta name="twitter:title" content={`${siteTitle} - ${siteTagline}`} />
                <meta name="twitter:description" content={siteDesc} />
            </Helmet>
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
                tagline
                description
            }
        }
        allMarkdownRemark(
            limit: 10000
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            totalCount
            edges {
                node {
                    excerpt(pruneLength: 350)
                    fields {
                        slug
                    }
                    frontmatter {
                        date
                        title
                        metaTitle
                        subtitle
                        author
                        tags
                        image
                    }
                }
            }
        }
    }
`