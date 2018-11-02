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
    const capTag = _.startCase(_.camelCase(tag))

    return (
        <SiteLayout location={location}>
            <Helmet>
                <title>{`${capTag} - ${siteTitle}`}</title>
                <meta name="title" content={`${capTag} - ${siteTitle}`} />
                <meta name="description" content={`Read the latest about ${capTag} on ${siteTitle}.`} /> 
                <meta name="keywords" content={tag} />
                <meta name="robots" content="index,follow" />

                <meta property="og:url" content={`https://gamepad.news/${location.pathname}`} />
                <meta property="og:type" content="blog" />
                <meta property="og:title" content={`${capTag} - ${siteTitle}`} />
                <meta property="og:description" content={`Read the latest about ${capTag} on ${siteTitle}.`} />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@gamepad_news" />
                <meta name="twitter:creator" content="@gamepad_news" />
                <meta name="twitter:title" content={`${capTag} - ${siteTitle}`} />
                <meta name="twitter:description" content={`Read the latest about ${capTag} on ${siteTitle}.`} />
            </Helmet>
            <BlogPosts posts={edges} tagName={capTag} />
        </SiteLayout>
    )
}

export default TagTemplate

export const pageQuery = graphql`
    query TagPage($tag: String) {
        site {
            siteMetadata {
                title
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