import React, { Component } from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native'

import { getAllPostsAsync } from '../utils'
import { IconBar, TextBar, UserBar } from '../components'
import Layout from '../constants/Layout'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  async componentDidMount() {
    const posts = await getAllPostsAsync()
    this.setState({ posts })
  }

  render() {
    const { posts } = this.state
    return (
      <FlatList
        style={styles.list}
        numColumns={1}
        data={posts}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.container}>
            <UserBar name={item.username} image={item.userAvatar} />
            <Image style={styles.image} source={{ uri: item.uri }} />
            <IconBar />
            <TextBar name={item.username} likes={item.likes} caption={item.caption} comments={item.comments} />
          </View>
        )}
      />
    )
  }
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
