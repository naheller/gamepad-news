import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import moment from 'moment'
import _ from 'lodash'

const Sidebar = props => (
    <StaticQuery 
        query={graphql`
            query SidebarQuery {
                allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 5) {
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
            const locationPath = _.get(props, 'location.pathname', '')

            return (
                <div className="sidebar">
                    <div className="latest-posts">
                        <div className="header">
                            <span className="icon">
                                <i className="fa fa-bolt" aria-hidden="true"></i>
                            </span>
                            <h4 className="title">The Latest</h4>
                        </div>
                        <div >
                            {_.map(posts, post => {
                                const title = _.get(post, 'node.frontmatter.title', '')
                                let date = _.get(post, 'node.frontmatter.date', '')
                                const slug = _.get(post, 'node.fields.slug', '')

                                const now = moment()
                                const minsDiff = now.diff(moment(date), 'minutes')
                                const hoursDiff = now.diff(moment(date), 'hours')
                                const daysDiff = now.diff(moment(date), 'days')

                                const currentIndex = _.findIndex(posts, postToCompare => {
                                    return postToCompare.node.id === post.node.id
                                });

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
                                
                                // const titleTextColor = (locationPath === `/${slug}`) ? 'has-text-dark' : 'has-text-grey'
                                const titleFontWeight = (locationPath === `/${slug}`) ? 'bold' : 'normal'
                                const dateColor = (hoursDiff < 24) ? '#ff8d79' : '#aaa'

                                return [
                                    <div key={slug} className="post">
                                        <Link to={`/${slug}`}>
                                            <p className="title">{title}</p>
                                        </Link>
                                        <p className="date">{date}</p>
                                    </div>,
                                    (currentIndex !== posts.length - 1)
                                    && <hr />
                                ]
                            })}
                        </div>
                    </div>
                </div>
            )}}
        />
    )

export default Sidebar
