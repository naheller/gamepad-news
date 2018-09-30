import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import moment from 'moment'
import _ from 'lodash'

import Card from 'react-bootstrap/lib/Card'

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
                <Card>
                    <Card.Header>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="icon">
                                <i className="fa fa-bolt" aria-hidden="true" style={{ color: '#ff8d79' }}></i>
                            </span>
                            <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', marginLeft: '1rem' }}>The Latest</span>
                        </div>
                    </Card.Header>
                    <div style={{ margin: '0.5rem 0' }}>
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
                            } else if (daysDiff < 5) {
                                date = `${daysDiff} day${daysDiff > 1 ? `s` : ``} ago`
                            } else {
                                date = ''
                            }
                            
                            // const titleTextColor = (locationPath === `/${slug}`) ? 'has-text-dark' : 'has-text-grey'
                            const titleFontWeight = (locationPath === `/${slug}`) ? 'bold' : 'normal'
                            const dateColor = (hoursDiff < 24) ? '#ff8d79' : '#666'

                            return [
                                <div key={slug}>
                                    <Card.Body>
                                        <Card.Text>
                                            <Link to={`/${slug}`}>
                                                <h6 style={{ lineHeight: '1.35rem', fontWeight: titleFontWeight }}>{title}</h6>
                                                <p style={{ fontWeight: 'normal', fontStyle: 'italic', marginBottom: 0, color: dateColor, fontSize: '0.85rem' }}>{date}</p>
                                            </Link>
                                        </Card.Text>
                                    </Card.Body>
                                </div>,
                                (currentIndex !== posts.length - 1)
                                && <hr style={{ margin: '0 1rem' }} />
                            ]
                        })}
                    </div>
                </Card>
            )}}
        />
    )

export default Sidebar
