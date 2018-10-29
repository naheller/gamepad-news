import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import moment from 'moment'
import _ from 'lodash'

const Sidebar = props => {
    const currentLocation = _.get(props, 'location.pathname', '')
    const pathNoSlash = _.replace(currentLocation, '/', '')

    return (
        <StaticQuery 
            query={graphql`
                query SidebarQuery($pathNoSlash: String) {
                    allMarkdownRemark(
                        sort: { fields: [frontmatter___date], order: DESC },
                        filter: { fields: { slug: { ne: $pathNoSlash } } }
                        limit: 5
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
                }
            `}
            render={data => {
                const posts = _.get(data, 'allMarkdownRemark.edges', [])

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
                                {_.map(posts, post => {
                                    const title = _.get(post, 'node.frontmatter.title', '')
                                    const slug = _.get(post, 'node.fields.slug', '')
                                    
                                    let date = _.get(post, 'node.frontmatter.date', '')
                                    const now = moment()
                                    
                                    const minsDiff = now.diff(moment(date), 'minutes')
                                    const hoursDiff = now.diff(moment(date), 'hours')
                                    const daysDiff = now.diff(moment(date), 'days')

                                    if (minsDiff < 60) {
                                        date = `${minsDiff} minute${minsDiff > 1 ? `s` : ``} ago`
                                    } else if (hoursDiff < 24) {
                                        date = `${hoursDiff} hour${hoursDiff > 1 ? `s` : ``} ago`
                                    } else if (daysDiff === 1) {
                                        date = `yesterday`
                                    } else if (daysDiff < 6) {
                                        date = `${daysDiff} day${daysDiff > 1 ? `s` : ``} ago`
                                    } else {
                                        date = ''
                                    }
                                    
                                    // const boldIfSelected = (currentLocation === `/${slug}`) ? 'bold' : ''
                                    const greenIfNew = (hoursDiff < 24) ? 'green' : ''
                                    // const notLastPost = currentIndex !== posts.length - 1

                                    return [
                                        <div key={slug} className="post">
                                            <Link to={`/${slug}`} className="link">
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
