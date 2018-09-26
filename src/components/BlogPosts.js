import React, { Component } from 'react'
import moment from 'moment'
import _ from 'lodash'
// import Link from 'gatsby-link'
import Img from 'gatsby-image'

class BlogPosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numPosts: 3
        }
    }

    render() {
        console.log('this.props', this.props)
        const posts = _.get(this.props, 'posts', [])

        return _.map(posts, post => {
            // const title = _.get(post, 'node.frontmatter.title', '')
            const { title, date, /*image,*/ /*s3image,*/ tags, description, author } = post.node.frontmatter
            const sizes = _.get(this.props, 's3imageSize', {})
            let formattedDate = moment(date).format('MMM D, YYYY – h:mm a')

            return (
                <div>{title}</div>
            )
        })
    }
}

export default BlogPosts