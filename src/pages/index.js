import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { mapEdgesToNodes } from "../helpers"
import PostDetails from "../components/post_details"

class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const readyToBePublishedPosts = mapEdgesToNodes(data.allSanityPost).filter(
      post =>
        post &&
        post.isReady &&
        new Date().getTime() >= new Date(post.publishedAt).getTime()
    )

    return (
      <Layout>
        <ul>
          {readyToBePublishedPosts.map(post => (
            <li key={post._id}>
              <PostDetails data={post} />
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
          author {
            person {
              name
            }
          }
        }
      }
    }
    site {
      id
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
