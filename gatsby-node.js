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
                                id
                                fields {
                                    slug
                                }
                                frontmatter {
                                    title
                                    date
                                    author
                                    description
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

                _.forEach(posts, (post, index) => {
                    // console.log('POST-------------------------------\n', post)
                    const previous = index === posts.length - 1 ? null : posts[index + 1].node
                    const next = index === 0 ? null : posts[index - 1].node
                    
                    const postId = _.get(post, 'node.id', '')
                    const slug = _.get(post, 'node.fields.slug', '')
                    const shortSlug = _.truncate(_.trim(slug, '/'), {
                        'length': 32,
                        'omission': ''
                    })
                    const slugWithId = `${shortSlug}-${postId.substring(0, 8)}`
                    const postTags = _.get(post, 'node.frontmatter.tags', [])

                    if (!_.isEmpty(postTags)) {
                        tags = tags.concat(postTags);
                    }

                    createPage({
                        path: slug, //`/${slugWithId}/`,
                        component: postTemplate,
                        context: {
                            slug: slug,
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
    // console.log('NODE-------------------------------\n', node)
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({
            node,
            getNode
        })
        console.log('node----------', node)
        console.log('value----------', value)
        createNodeField({
            name: `slug`,
            node,
            value
        })
    }
}
