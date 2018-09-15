import React, { Component } from 'react'
// import Link from 'gatsby-link'
// import Img from 'gatsby-image'

class BlogPosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numPosts: 3
        }
    }

    render() {
        return (
            <div>
                Blog posts
            </div>
        )
    }
}

export default BlogPosts