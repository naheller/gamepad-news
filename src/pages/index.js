import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'

import SiteLayout from '../components/SiteLayout'
import BlogPosts from '../components/BlogPosts'

const BlogIndex = props => {
    const siteTitle = get(props, 'data.site.siteMetadata.title', 'Gamepad News')
    const siteDesc = get(props, 'data.site.siteMetadata.description', 'Video game news blog')

    const posts = get(props, 'data.allMarkdownRemark.edges', [])
    // const s3images = get(props, 'data.allS3Image.edges', [])
    const s3imageSize = get(props, 'data.s3Image.localFile.childImageSharp.sizes', {})

    return (
        <SiteLayout location={props.location}>
            <Helmet>
                <title>{siteTitle}</title>
                <meta name="title" content={siteTitle} /> 
                <meta name="description" content={siteDesc} /> 
                <meta name="keywords" content="video games,videogames,games,gaming,news,playstation,xbox,switch,pc,ios,android,sony,microsoft,nintendo" />
                <meta name="robots" content="index,follow" />
                <meta property="og:url" content={`https://gamepad.news`} />
                <meta property="og:type" content="blog" />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content={siteDesc} />
                {/* <meta property="og:image" content={image} /> */}
            </Helmet>
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
                        date
                        title
                        author
                        tags
                        s3image
                    }
                }
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