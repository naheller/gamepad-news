import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'


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
                return (
                    <div>Sidebar</div>
                )}
            }
        />
    )
}

export default Sidebar
