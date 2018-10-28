import React, { PureComponent } from 'react'
// import moment from 'moment'
import _ from 'lodash'
import Link from 'gatsby-link'
// import Img from 'gatsby-image'

class BlogPosts extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            numPosts: 3
        }
    }

    render() {
        const posts = _.get(this.props, 'posts', [])

        return _.map(posts, post => {
            // const title = _.get(post, 'node.frontmatter.title', '')
            const { headline, /*date, image, s3Image, tags, description, author*/ } = post.node.frontmatter
            // const sizes = _.get(this.props, 's3ImageSize', {})
            // let formattedDate = moment(date).format('MMM D, YYYY – h:mm a')

            return (
                <Link to={post.node.fields.slug}>{headline}</Link>
            )
        })
    }
}

export default BlogPosts