import React from "react"
import { Link } from "gatsby"
import moment from "moment"
import { get } from "lodash"
import Img from "gatsby-image"
import { createSlug, createMarkup } from "../helpers"

const PostDetails = props => {
  const post = props && props.data
  const pubDate = get(post, "publishedAt", "_createdAt")
  const author = get(post, "author.person.name", "FanFuelHQ")

  return (
    <section>
      <h1>
        <Link to={createSlug(post.title)}>{post.title}</Link>
      </h1>
      <small title={moment(pubDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}>
        Published {moment(pubDate).fromNow()} by {author}
      </small>
      {post.featuredImage ? <Img fluid={post.featuredImage.asset.fluid} /> : ""}
      <div dangerouslySetInnerHTML={createMarkup(post.excerpt)} />
    </section>
  )
}

export default PostDetails
