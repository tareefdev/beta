const path = require(`path`)
const locales = require(`./config/i18n`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const {
  localizedSlug,
  findKey,
  removeTrailingSlash,
} = require(`./src/utils/gatsby-node-helpers`)

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // First delete the incoming page that was automatically created by Gatsby
  // So everything in src/pages/
  deletePage(page)

  // Grab the keys ('en' & 'de') of locales and map over them
  Object.keys(locales).map(lang => {
    // Use the values defined in "locales" to construct the path
    const localizedPath = locales[lang].default
          ? page.path
          : `${locales[lang].path}${page.path}`
    
  //  const localizedPath = page.path;

    return createPage({
      // Pass on everything from the original page
      ...page,
      // Since page.path returns with a trailing slash (e.g. "/de/")
      // We want to remove that
       path: removeTrailingSlash(localizedPath),
     // path: page.path,
       // Pass in the locale as context to every page
      // This context also gets passed to the src/components/layout file
      // This should ensure that the locale is available on every page
      context: {
        locale: lang,
        dateFormat: locales[lang].dateFormat,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    
    const name = path.basename(node.fileAbsolutePath, `.md`)
    const defaultKey = findKey(locales, o => o.default === true)
    const isDefault = !(name.slice(-3) === '_ar')
    const lang = isDefault ? defaultKey : name.split(`_`)[1]
    createNodeField({ node, name: `locale`, value: lang })
    createNodeField({ node, name: `isDefault`, value: isDefault })

    let value = createFilePath({ node, getNode })
    value = `${lang}${value}`
    value = value.includes('_') ? value.slice(0, -4) : value;
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const blogPost = path.resolve(`./src/templates/blog-post.js`)
    return graphql(
      `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                locale
                isDefault
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
    ).then(result => {
      if (result.errors) {
        throw result.errors
      }

      // Create blog posts pages.
      const posts = result.data.allMarkdownRemark.edges

      posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node

        const slug = post.node.fields.slug
  
       const title = post.node.frontmatter.title

        // Use the fields created in exports.onCreateNode
        const locale = post.node.fields.locale
        const isDefault = post.node.fields.isDefault

        createPage({
          path: post.node.fields.slug,
       //    path: localizedSlug({ isDefault, locale, slug }),
          component: blogPost,
          context: {
            locale,
            title,
            slug: post.node.fields.slug,
       //     slug: localizedSlug({ isDefault, locale, slug }),
            previous,
            next,
          },
        })
      })

      return null
    })
  }

