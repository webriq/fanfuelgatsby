import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { createSlug, mapEdgesToNodes, createMarkup } from "../helpers"

class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const readyToBePublishedPosts = mapEdgesToNodes(data.allSanityPost).filter(
      post => post && post.isReady
    )

    return (
      <Layout>
        <ul>
          {readyToBePublishedPosts.map(post => (
            <li key={post._id}>
              <h1>
                <Link to={createSlug(post.title)}>{post.title}</Link>
              </h1>
              {post.featuredImage ? (
                <Img fluid={post.featuredImage.asset.fluid} />
              ) : (
                ""
              )}
              <div dangerouslySetInnerHTML={createMarkup(post.excerpt)} />
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export default IndexPage

export const allSanityPostQuery = graphql`
  {
    allSanityPost {
      edges {
        node {
          id
          _id
          title
          _type
          _createdAt
          _updatedAt
          body
          excerpt
          publishedAt
          isReady
          featuredImage {
            asset {
              fluid(maxWidth: 600) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`
