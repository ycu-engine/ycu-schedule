const newsTemplate = require.resolve(`./src/templates/news.tsx`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: ASC }) {
        nodes {
          id
          parent {
            ... on File {
              name
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  createNewsPages(createPage, result.data.allMarkdownRemark.nodes)
}

const createNewsPages = (createPage, nodes) => {
  const createNewsPage = (newsNode, prevNewsNode, nextNewsNode) => {
    const newsUrl = (node) => `/news/${node.parent.name}`
    createPage({
      path: newsUrl(newsNode),
      component: newsTemplate,
      context: {
        id: newsNode.id,
        prev: prevNewsNode ? newsUrl(prevNewsNode) : undefined,
        next: nextNewsNode ? newsUrl(nextNewsNode) : undefined,
      },
    })
  }

  nodes.forEach((node, i) => {
    createNewsPage(
      node,
      i > 0 ? nodes[i - 1] : undefined,
      i < nodes.length - 1 ? nodes[i + 1] : undefined
    )
  })
}
