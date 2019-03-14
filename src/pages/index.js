import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { createSlug, printObj, mapEdgesToNodes, createMarkup } from "../helpers"

const IndexPage = ({ data }) => (
  <Layout>
    {printObj(data)}
    <ul>
      {mapEdgesToNodes(data.allSanityPost).map(post => (
        <li key={post._id}>
          <h1>
            <Link to={createSlug(post.title)}>{post.title}</Link>
          </h1>
          <div dangerouslySetInnerHTML={createMarkup(post.excerpt)} />
        </li>
      ))}
    </ul>
  </Layout>
)

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
        }
      }
    }
  }
`
