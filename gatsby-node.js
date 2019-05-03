const path = require(`path`);
const locales = require(`./config/i18n`);
const { createFilePath } = require(`gatsby-source-filesystem`);

const {
  findKey,
  removeTrailingSlash,
} = require(`./src/utils/gatsby-node-helpers`);

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  deletePage(page);
  
  Object.keys(locales).map(lang => {
    const localizedPath = (function(){
      if (locales[lang].default && page.path === '/') {
        return '/';
      } else {
        return `${locales[lang].path}${page.path}`;  
      }
    })();
    return createPage({
      ...page,
      path: removeTrailingSlash(localizedPath),
      context: {
        ...page.context,
        locale: lang,
        dateFormat: locales[lang].dateFormat,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Mdx") {

    const filePath= node.fileAbsolutePath;
    const pathAsArray = filePath.split('/');
//    const isChild = !(pathAsArray[pathAsArray.length - 2] == 'blog');
//    if (isChild) {
    const parent = pathAsArray[pathAsArray.length - 2];
    createNodeField({ node, name: `parentDir`, value: parent });
//    }
    
    const name = path.basename(node.fileAbsolutePath, `.md`);
    const defaultKey = findKey(locales, o => o.default === true);
    const isDefault = !(name.slice(-3) === '_ar');
    const lang = isDefault ? defaultKey : name.split(`_`)[1];
    createNodeField({ node, name: `locale`, value: lang });
    createNodeField({ node, name: `isDefault`, value: isDefault });
//    createNodeField({ node, name: `isChild`, value: isChild });

    let value = createFilePath({ node, getNode });
    value = value.includes('_') ? `${value.slice(0, -4)}` : value;
     if (value.includes('index') && !(value.includes('html'))) {
       value = `${value}.html`;
     }
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;  
  const blogPost = path.resolve(`./src/templates/blog-post.js`);
    return graphql(
      `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                locale
                isDefault
                parentDir
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
        throw result.errors;
      }

      const posts = result.data.allMdx.edges;
      
      posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;
        const slug = post.node.fields.slug;
        const title = post.node.frontmatter.title;
        const locale = post.node.fields.locale;
        const parentDir = post.node.fields.parentDir;
        const path = `${locale}${post.node.fields.slug}`;

        createPage({
          path: path,
          component: blogPost,
          context: {
            locale,
            title,
            slug: slug,
            parentDir,
            previous,
            next,
          },
        });
      });
      return null;
    });
};
