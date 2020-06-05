import React, { useState, useEffect } from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import blogs from '../seed/blogs'
import { formatFeedPhotos } from '../utils'
import { IconBar, TextBar, UserBar } from '../components'
import Layout from '../constants/Layout'

export default function HomeScreen() {
  const [ feed, setFeed ] = useState([])

  useEffect(() => {
    const feed = formatFeedPhotos(blogs)
    setFeed(feed)
  }, [])

  return (
    <FlatList
      style={styles.list}
      numColumns={1}
      data={feed}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <UserBar name={item.name} image={item.thumb} />
          <Image style={styles.image} source={{ uri: item.displayUrl }} />
          <IconBar />
          <TextBar name={item.name} likes={item.likes} caption={item.caption} comments={item.comments} />
        </View>
      )}
    />
  )
}

HomeScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white'
  },
  image: {
    flex: 1,
    width: Layout.window.width * 0.9,
    height: Layout.window.width * 0.9,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: 'cover',
    alignSelf: 'center'
  },
  caption: {
    overflow: 'hidden'
  }
})
