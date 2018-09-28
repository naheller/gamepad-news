import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { Menu } from 'antd'
import moment from 'moment'
import _ from 'lodash'

const Sidebar = props => (
    <StaticQuery 
        query={graphql`
            query SidebarQuery {
                allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 5) {
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
            const posts = _.get(data, 'allMarkdownRemark.edges', [])
            const locationPath = _.get(props, 'location.pathname', '')

            return (
                <Menu mode="inline">
                    {_.map(posts, post => {
                        const title = _.get(post, 'node.frontmatter.title', '')
                        let date = _.get(post, 'node.frontmatter.date', '')
                        const slug = _.get(post, 'node.fields.slug', '')

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
                        } else if (daysDiff < 5) {
                            date = `${daysDiff} day${daysDiff > 1 ? `s` : ``} ago`
                        } else {
                            date = ''
                        }
                        
                        // const titleTextColor = (locationPath === `/${slug}`) ? 'has-text-dark' : 'has-text-grey'
                        const titleFontWeight = (locationPath === `/${slug}`) ? 'has-text-weight-semibold' : 'has-text-weight-normal'
                        const dateTextColor = hoursDiff < 24 ? 'has-text-tomato' : 'has-text-grey-light'

                        return (
                            <Menu.Item key={slug}>
                                <Link to={`/${slug}`}>
                                    <div>{title}</div>
                                    <div>{date}</div>
                                </Link>
                            </Menu.Item>
                        )
                    })}
                </Menu>
            )}}
        />
    )

export default Sidebar
