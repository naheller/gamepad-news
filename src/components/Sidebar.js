import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import moment from 'moment'
import _ from 'lodash'

const Sidebar = props => {
    const currentLocation = _.get(props, 'location.pathname', '')
    const pathNoSlash = _.replace(currentLocation, '/', '')
    console.log('pathNoSlash', pathNoSlash)

    return (
        <StaticQuery 
            query={graphql`
                query SidebarQuery($pathNoSlash: String) {
                    allMarkdownRemark(
                        sort: { fields: [frontmatter___date], order: DESC },
                        filter: { fields: { slug: { ne: $pathNoSlash } } }
                        limit: 3
                    ) {
                        edges {
                            node {
                                id
                                fields {
                                    slug
                                }
                                frontmatter {
                                    date
                                    title
                                    author
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
                                sizes(maxWidth: 800, maxHeight: 200) {
                                    ...GatsbyImageSharpSizes_withWebp
                                }
                            }
                        }
                    }
                }
            `}
            render={data => {
                const posts = _.get(data, 'allMarkdownRemark.edges', [])
                
                const filteredPosts = _.filter(posts, post => {
                    const slug = _.get(post, 'node.fields.slug', '')
                    return `/${slug}` !== currentLocation
                })

                const s3ImageSizes = _.get(data, 's3Image.localFile.childImageSharp.sizes', {})

                return (
                    <div className="sidebar">
                        <div className="latest-posts">
                            <div className="header">
                                <span className="icon">
                                    <i className="fa fa-bolt" aria-hidden="true"></i>
                                </span>
                                <h5 className="title">The Latest</h5>
                            </div>
                            <div >
                                {_.map(filteredPosts, post => {
                                    const title = _.get(post, 'node.frontmatter.title', '')
                                    const slug = _.get(post, 'node.fields.slug', '')
                                    
                                    let date = _.get(post, 'node.frontmatter.date', '')
                                    const now = moment()
                                    
                                    const minsDiff = now.diff(moment(date), 'minutes')
                                    const hoursDiff = now.diff(moment(date), 'hours')
                                    const daysDiff = now.diff(moment(date), 'days')

                                    // const currentIndex = _.findIndex(posts, postToCompare => {
                                    //     return postToCompare.node.id === post.node.id
                                    // });

                                    if (minsDiff < 60) {
                                        date = `${minsDiff} minute${minsDiff > 1 ? `s` : ``} ago`
                                    } else if (hoursDiff < 24) {
                                        date = `${hoursDiff} hour${hoursDiff > 1 ? `s` : ``} ago`
                                    } else if (daysDiff === 1) {
                                        date = `yesterday`
                                    } else if (daysDiff < 3) {
                                        date = `${daysDiff} day${daysDiff > 1 ? `s` : ``} ago`
                                    } else {
                                        date = ''
                                    }
                                    
                                    // const titleTextColor = (currentLocation === `/${slug}`) ? 'has-text-dark' : 'has-text-grey'
                                    // const boldIfSelected = (currentLocation === `/${slug}`) ? 'bold' : ''
                                    const greenIfNew = (hoursDiff < 24) ? 'green' : ''
                                    // const notLastPost = currentIndex !== posts.length - 1

                                    return [
                                        <div key={slug} className="post">
                                            <Link to={`/${slug}`} className="link">
                                                <Img sizes={s3ImageSizes} className="image" />
                                                <h6 className="title">{title}</h6>
                                            </Link>
                                            <span className={`date ${greenIfNew}`}>{date}</span>
                                        </div>,
                                        // notLastPost && <hr />
                                    ]
                                })}
                            </div>
                        </div>
                    </div>
                )}}
            />
        )
    }

export default Sidebar
