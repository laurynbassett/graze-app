import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet } from 'react-native'

import { getAllPostsAsync } from '../utils'
import Colors from '../constants/Colors'

export default function ExploreScreen() {
  const [ posts, setPosts ] = useState([])

  const fetchData = async () => {
    const posts = await getAllPostsAsync()
    console.log('POSTS ***', posts)
    return posts
  }

  useEffect(
    async () => {
      const posts = await getAllPostsAsync()
      setPosts(posts)
    },
    [ posts.length ]
  )
  console.log('POSTS', posts)
  if (posts.length) {
    return (
      <FlatList
        style={styles.grid}
        numColumns={3}
        data={posts}
        renderItem={({ item }) => <Image key={item.id} style={styles.image} source={{ uri: item.uri }} />}
      />
    )
  }
  return null
}

ExploreScreen.navigationOptions = {
  headerTitle: 'Explore'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightestGray
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 10,
    marginBottom: 10,
    resizeMode: 'cover'
  }
})
