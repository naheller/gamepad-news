const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const moment = require('moment')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    return new Promise((resolve, reject) => {
        const postTemplate = path.resolve('./src/templates/post.js')
        const tagTemplate = path.resolve('./src/templates/tag.js')

        resolve(
            graphql(
            `
                {
                    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 10000) {
                        edges {
                            node {
                                id
                                fields {
                                    slug
                                }
                                frontmatter {
                                    title
                                    subtitle
                                    date
                                    author
                                    description
                                    tags
                                    s3Image
                                    slugPartial
                                }
                            }
                        }
                    }
                }
            `
            )
            .then(result => {
                const { data, errors } = result

                if (errors) {
                    console.log(errors)
                    reject(errors)
                }

                const posts = _.get(data, 'allMarkdownRemark.edges', [])
                let tags = []

                _.forEach(posts, (post, index) => {
                    const date = _.get(post, 'node.frontmatter.date', '')
                    const formattedDate = moment(date).format('YYYY-MM-DD')

                    const slug = _.get(post, 'node.fields.slug', '')
                    const s3Image = _.get(post, 'node.frontmatter.s3Image', '')
                    // const slugPartial = _.get(post, 'node.frontmatter.slugPartial', '')

                    const postTags = _.get(post, 'node.frontmatter.tags', [])

                    if (!_.isEmpty(postTags)) {
                        tags = tags.concat(postTags);
                    }

                    const previous = index === posts.length - 1 ? null : posts[index + 1].node
                    const next = index === 0 ? null : posts[index - 1].node
                    // const slugWithDate = `${formattedDate}-${slugPartial}`

                    createPage({
                        path: slug,
                        component: postTemplate,
                        context: {
                            slug,
                            s3Image,
                            previous,
                            next,
                        },
                    })
                })

                tags = _.uniq(tags)

                _.forEach(tags, tag => {
                    createPage({
                        path: `/${_.kebabCase(tag)}/`,
                        component: tagTemplate,
                        context: {
                            tag
                        }
                    })
                })
            })
        )
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        // const value = createFilePath({
        //     node,
        //     getNode
        // })

        const truncId = _.get(node, 'id').substring(0, 8)
        const slugPartial = _.get(node, 'frontmatter.slugPartial', '')
        // const truncTitle = _.truncate(_.get(node, 'frontmatter.title', ''), {
        //     'length': 40,
        //     'omission': ''
        // })

        // const relativeFilePath = createFilePath({
        //     node,
        //     getNode,
        //     basePath: "posts/",
        //     trailingSlash: false
        // })

        createNodeField({
            node,
            name: `slug`,
            // value: `${_.kebabCase(slugPartial)}-${truncId}`
            value: `${slugPartial}-${truncId}`
        })

        const s3Image = _.get(node, 'frontmatter.s3Image', '')

        createNodeField({
            node,
            name: `s3Image`,
            value: s3Image
        })
    }
}
