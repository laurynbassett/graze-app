import React, { useState, useEffect } from 'react'

import { Post } from '../components'
import { getSingleUserPostAsync } from '../utils'

const PostScreen = props => {
  console.log('POST SCREEN PROPS', props)

  const [ post, setPost ] = useState({})

  const fetchPost = async () => {
    if (props.route.params && props.route.params.item) {
      setPost(props.route.params.item)
    } else {
      props.route.params.profile
      const post = await getSingleUserPostAsync(item.id)
      setPost(post)
    }
  }

  useEffect(
    () => {
      // fetch all user posts
      fetchPost()
    },
    [ post.id ]
  )

  const handleLikePost = () => {
    const { uid } = auth.currentUser
    const userLiked = post.likes.includes(uid)
    likePost(post.id, uid, userLiked)
  }

  return post.id ? <Post item={post} handleLikePost={handleLikePost} navigation={props.navigation} /> : null
}

export default PostScreen
