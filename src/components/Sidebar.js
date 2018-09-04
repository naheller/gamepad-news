import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import moment from 'moment'
import get from 'lodash/get'
import map from 'lodash/map'

import gamepad from '../../static/svg/dpad.svg'
import '../styles.css'

const Sidebar = props => {
    return (
        <StaticQuery 
            query={graphql`
                query SidebarQuery {
                    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 10) {
                        edges {
                            node {
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
                const posts = get(data, 'allMarkdownRemark.edges', [])
                const locationPath = get(props, 'location.pathname', '')
                console.log('locationPath', locationPath)

                return (
                    <div>
                        <div className="sidebar-post-list-header">
                            <img 
                                src={gamepad} className="sidebar-post-list-header-icon" 
                                alt="dpad"
                            />
                            <h5 className="sidebar-post-list-header-text">the latest</h5>
                        </div>
                        <div className="sidebar-post-list">
                            {map(posts, post => {
                                const postTitle = get(post, 'node.frontmatter.title', '')
                                let postDate = get(post, 'node.frontmatter.date', '')
                                const slug = get(post, 'node.fields.slug', '')
                                console.log('slug', slug)
                                
                                const now = moment()
                                const minsDiff = now.diff(moment(postDate), 'minutes')
                                const hoursDiff = now.diff(moment(postDate), 'hours')
                                const daysDiff = now.diff(moment(postDate), 'days')

                                if (minsDiff < 60) {
                                    postDate = `${minsDiff} minute${minsDiff > 1 ? `s` : ``} ago`
                                } else if (hoursDiff < 24) {
                                    postDate = `${hoursDiff} hour${hoursDiff > 1 ? `s` : ``} ago`
                                } else if (daysDiff === 1) {
                                    postDate = `yesterday`
                                } else if (daysDiff < 5) {
                                    postDate = `${daysDiff} day${daysDiff > 1 ? `s` : ``} ago`
                                } else {
                                    postDate = ''
                                }

                                const activePost = (locationPath === `/${slug}`)
                                ? 'off-tomato-color'
                                : ''

                                return (
                                    <div className="sidebar-post" key={slug}>
                                        <Link to={slug}>
                                            <h5 className={`h5-sidebar-post-title ${activePost}`}>{postTitle}</h5> 
                                        </Link>
                                        <h5 className="h5-sidebar-post-date">{postDate}</h5>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            }
        />
    )
}

export default Sidebar
