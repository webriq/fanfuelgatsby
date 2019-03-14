const path = require("path")
const slugify = require("slugify")

function mapEdgesToNodes(data) {
  if (!data.edges) return []
  return data.edges.map(edge => edge.node)
}

function createSlug(text) {
  return slugify(text, {
    replacement: "-", // replace spaces with replacement
    remove: null, // regex to remove characters
    lower: true, // result in lower case
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    {
      allSanityPost {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `).then(result => {
    mapEdgesToNodes(result.data.allSanityPost).map(post => {
      console.log(post)
      createPage({
        path: createSlug(post.title),
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          id: post.id,
        },
      })
    })
  })
}
