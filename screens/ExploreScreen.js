import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet } from 'react-native'

import blogs from '../seed/blogs'
import { formatExplorePhotos } from '../utils'
import Colors from '../constants/Colors'

export default function ExploreScreen() {
  const [ photos, setPhotos ] = useState([])

  useEffect(() => {
    const photos = formatExplorePhotos(blogs)
    setPhotos(photos)
  }, [])

  return (
    <FlatList
      style={styles.grid}
      numColumns={3}
      data={photos}
      renderItem={({ item }) => <Image key={item.id} style={styles.image} source={{ uri: item.displayUrl }} />}
    />
  )
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
