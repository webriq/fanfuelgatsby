import React from "react"
import Layout from "../components/layout"
import { createMarkup } from "../helpers"
import * as sanityClient from "@sanity/client"

class PreviewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      post: null,
    }
    this.client = sanityClient({
      projectId: process.env.SANITY_PROJECT_ID || "qypammht",
      dataset: process.env.SANITY_DATASET,
      token: process.env.SANITY_API_READ_TOKEN, // or leave blank to be anonymous user
      useCdn: false, // `false` if you want to ensure fresh data,
      ignoreBrowserWarning: true,
    })
  }

  getPost(query, params) {
    return this.client
      .fetch(query, params)
      .then(post => {
        post && post[0]
          ? this.setState({
              isLoaded: true,
              post: post[0],
            })
          : this.setState({
              isLoaded: true,
              error: { message: "Unable to get post" },
            })
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error,
        })
      })
  }

  componentDidMount() {
    const query = `*[_type == 'post' && _id == $id]`
    const currentPostId = this.props.location.search.split("=")[1]
    const params = { id: currentPostId }

    this.getPost(query, params)
  }

  render() {
    const { error, isLoaded, post } = this.state

    if (error) {
      return <Layout>Error: {error.message}</Layout>
    } else if (!isLoaded) {
      return (
        <Layout>
          <p>Fetching data...</p>
        </Layout>
      )
    } else {
      return (
        <Layout>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={createMarkup(post.body)} />
        </Layout>
      )
    }
  }
}

export default PreviewPage
