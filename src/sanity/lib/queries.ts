import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`
  *[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author -> name match $search] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    image,
    category, 
    description,
    views,
    author -> { _id, image, name, bio }
  }
`);

export const STARTUP_BY_ID_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id] [0] {
    _id,
    title,
    slug,
    _createdAt,
    image,
    category, 
    description,
    views,
    pitch,
    author -> { _id, image, name, username, bio }
  }
`);

export const STARTUP_VIEWS_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id] [0] { views }
`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
  *[_type == "author" && id == $id] [0] {
    _id,
    id,
    name,
    username,
    image,
    email,
    bio
  }
`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
  *[_type == "author" && _id == $id] [0] {
    _id,
    id,
    name,
    username,
    image,
    email,
    bio
  }
`);

export const AUTHOR_STARTUPS_QUERY = defineQuery(`
  *[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    image,
    category, 
    description,
    views,
    author -> { _id, image, name, bio }
  }
`);

export const PLAYLIST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "playlist" && slug.current == $slug] [0] {
    _id,
    title,
    slug,
    select[]->{
      _id,
      _createdAt,
      title,
      slug,
      views,
      description,
      category,
      image,
      pitch,
      author -> { _id, image, slug, name, bio }
    }
  }
`);
