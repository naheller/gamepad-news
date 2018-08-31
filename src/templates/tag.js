import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import SiteLayout from '../components/SiteLayout'
import { get, capitalize, includes } from 'lodash'
import BlogPosts from '../components/BlogPosts'

const tagTypes = ['playstation', 'xbox', 'switch', 'pc', 'mobile', 'retro']

const TagTemplate = props => { 
    const { data, location, pageContext } = props
    const { edges, totalCount } = data.allMarkdownRemark
    const { tag } = pageContext

    const siteTitle = get(data, 'site.siteMetadata.title', 'Gamepad News')
    const isSpecialTag = includes(tagTypes, tag)

    const showTagHeader = () => (
        <div>
            <div className="tag-page-header">
                <p className="tag-page-header-text">
                    {
                        isSpecialTag 
                        ? `News about\xa0`
                        : `${totalCount} ${totalCount === 1 ? 'post' : 'posts'} about\xa0`
                    }
                    <span style={{ fontFamily: 'Octarine-Bold' }}>{tag}</span>
                    {isSpecialTag && <span>&nbsp;games</span>}
                </p>
            </div>
            <hr className="blog-post-divider" style={{ margin: 0 }} />
        </div>
    )

    return (
        <SiteLayout location={location}>
            <Helmet>
                <title>{`${capitalize(tag)} articles on ${siteTitle}`}</title>
                <meta name="title" content={`${capitalize(tag)} articles on ${siteTitle}`} />
                <meta name="description" content={`${capitalize(tag)} articles on ${siteTitle}`} /> 
                <meta name="keywords" content={tag} />
                <meta name="robots" content="index,follow" />
                <meta property="og:url" content={`https://gamepad.news/${location.pathname}`} />
                <meta property="og:type" content="blog" />
                <meta property="og:title" content={`${capitalize(tag)} articles on ${siteTitle}`} />
                <meta property="og:description" content={`${capitalize(tag)} articles on ${siteTitle}`} />
            </Helmet>
            {showTagHeader()}
            <BlogPosts posts={edges} />
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
