import React from "react"
import marked from "marked"
import slugify from "slugify"

export function mapEdgesToNodes(data) {
  if (!data.edges) return []
  return data.edges.map(edge => edge.node)
}

export function printObj(data) {
  return process.env.NODE_ENV !== "production" ? (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  ) : (
    ""
  )
}

export function createMarkup(content) {
  return { __html: marked(content) }
}

export function createSlug(text) {
  return slugify(text, {
    replacement: "-", // replace spaces with replacement
    remove: null, // regex to remove characters
    lower: true, // result in lower case
  })
}
