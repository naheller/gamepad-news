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
                                    metaTitle
                                    metaDescription
                                    tags
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
                    const slug = _.get(post, 'node.fields.slug', '')
                    const postTags = _.get(post, 'node.frontmatter.tags', [])

                    if (!_.isEmpty(postTags)) {
                        tags = tags.concat(postTags);
                    }

                    const previous = index === posts.length - 1 ? null : posts[index + 1].node
                    const next = index === 0 ? null : posts[index - 1].node

                    createPage({
                        path: slug,
                        component: postTemplate,
                        context: {
                            slug,
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
        const date = _.get(node, 'frontmatter.date', '')
        const shortDate = moment(date).format('YYMMDD')
        const slugPartial = _.get(node, 'frontmatter.slugPartial', '')

        createNodeField({
            node,
            name: `slug`,
            value: `${slugPartial}-${shortDate}`
        })
    }
}
