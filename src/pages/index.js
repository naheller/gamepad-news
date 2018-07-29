import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import { get, map, take, kebabCase } from 'lodash'
import BlogPosts from '../components/BlogPosts'

import _ from 'lodash';
import SiteLayout from '../components/SiteLayout'
import SocialShare from '../components/socialShare'
import { rhythm } from '../utils/typography'
import arrow from '../../static/arrow.svg'

class BlogIndex extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const siteTitle = get(this.props, 'data.site.siteMetadata.title', 'Gamepad News')
        const posts = get(this.props, 'data.allMarkdownRemark.edges', [])

        return (
            <SiteLayout location={this.props.location}>
                <Helmet title={siteTitle} />
                <BlogPosts posts={posts} />
            </SiteLayout>
        )
    }
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
