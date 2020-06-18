import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

import { IconBar, TextBar, UserBar } from '.'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

const Post = props => {
  const { handleLikePost, item, navigation } = props

  return (
    <View key={item.id}>
      <UserBar post={item} navigation={navigation} />
      <Image style={styles.image} source={{ uri: item.uri }} />
      <IconBar id={item.id} likes={item.likes} likePost={handleLikePost} />
      <TextBar post={item} navigation={navigation} />
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightestGray,
    flexDirection: 'column'
  },
  image: {
    width: Layout.window.width,
    height: Layout.window.width,
    margin: 10,
    resizeMode: 'cover',
    alignSelf: 'center'
  }
})
