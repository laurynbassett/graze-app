import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'

import { IconBar, TextBar, UserBar } from '../components'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

const PostScreen = props => {
  console.log('PROPS', props)
  const { item } = props.route.params
  return (
    <View key={item.id} style={styles.container}>
      <UserBar name={item.username} image={item.userAvatar} />
      <Image style={styles.image} source={{ uri: item.uri }} />
      <IconBar id={item.id} likes={item.likes} />
      <TextBar name={item.username} likes={item.likes} caption={item.caption} comments={item.comments} />
    </View>
  )
}

export default PostScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightestGray,
    flexDirection: 'column'
  },
  contentContainer: {
    paddingTop: 15
  },
  image: {
    width: Layout.window.width,
    height: Layout.window.width,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: 'cover',
    alignSelf: 'center'
  },
  text: {
    alignSelf: 'center',
    marginTop: Layout.window.height * 0.2
  }
})
