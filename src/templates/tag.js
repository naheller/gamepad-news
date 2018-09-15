import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import SiteLayout from '../components/SiteLayout'
import BlogPosts from '../components/BlogPosts'
import _ from 'lodash'

// const tagTypes = ['playstation', 'xbox', 'switch', 'pc', 'mobile', 'retro']

const TagTemplate = props => { 
    const { data, location, pageContext } = props
    const { edges, /*totalCount*/ } = data.allMarkdownRemark
    const { tag } = pageContext

    const siteTitle = _.get(data, 'site.siteMetadata.title', 'Gamepad News')
    // const isSpecialTag = _.includes(tagTypes, tag)

    // const s3ImageKey = get(data, 's3Image.Key', '')
    const s3images = _.get(props, 'data.allS3Image.edges', [])
    const capTag = _.capitalize(tag)

    return (
        <SiteLayout location={location}>
            <Helmet>
                <title>{`${capTag} articles on ${siteTitle}`}</title>
                <meta name="title" content={`${capTag} articles on ${siteTitle}`} />
                <meta name="description" content={`${capTag} articles on ${siteTitle}`} /> 
                <meta name="keywords" content={tag} />
                <meta name="robots" content="index,follow" />

                <meta property="og:url" content={`https://gamepad.news/${location.pathname}`} />
                <meta property="og:type" content="blog" />
                <meta property="og:title" content={`${capTag} articles on ${siteTitle}`} />
                <meta property="og:description" content={`${capTag} articles on ${siteTitle}`} />
            </Helmet>
            <BlogPosts posts={edges} images={s3images} />
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
                        date
                        author
                        tags
                        s3image
                    }
                }
            }
        }
    }
`