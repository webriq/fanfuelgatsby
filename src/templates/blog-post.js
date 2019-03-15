import React from "react"
import { graphql } from "gatsby"
import { createMarkup } from "../helpers"
import Layout from "../components/layout"

const SinglePostPage = ({ data }) => {
  const post = data.sanityPost

  return (
    <Layout>
      <div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={createMarkup(post.body)} />
      </div>
    </Layout>
  )
}

export default SinglePostPage

export const query = graphql`
  query($id: String!) {
    sanityPost(id: { eq: $id }) {
      title
      body
    }
  }
`
