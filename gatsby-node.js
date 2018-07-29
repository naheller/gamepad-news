const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
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
                                fields {
                                    slug
                                }
                                frontmatter {
                                    title
                                    date
                                    author
                                    tags
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

                _.each(posts, (post, index) => {
                    const previous = index === posts.length - 1 ? null : posts[index + 1].node
                    const next = index === 0 ? null : posts[index - 1].node
                    
                    const slug = _.get(post, 'node.fields.slug', '')
                    const postTags = _.get(post, 'node.frontmatter.tags', [])

                    if (!_.isEmpty(postTags)) {
                        tags = tags.concat(postTags);
                    }

                    createPage({
                        path: slug,
                        component: postTemplate,
                        context: {
                            slug: slug,
                            previous,
                            next,
                        },
                    })
                })

                tags = _.uniq(tags)

                _.each(tags, tag => {
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
        const value = createFilePath({
            node,
            getNode
        })
        createNodeField({
            name: `slug`,
            node,
            value
        })
    }
}
