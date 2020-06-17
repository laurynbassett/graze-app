import React, { Component } from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native'

import { getAllPostsAsync, likePost } from '../utils'
import { IconBar, TextBar, UserBar } from '../components'
import Layout from '../constants/Layout'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      posts: []
    }
    this.fetchPosts = this.fetchPosts.bind(this)
    this.handleLikePost = this.handleLikePost.bind(this)
  }

  async componentDidMount() {
    this.fetchPosts()

    this.props.navigation.addListener('focus', () => {
      this.fetchPosts()
    })
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus')
  }

  async fetchPosts() {
    this.setState({ isLoading: true })
    const posts = await getAllPostsAsync()
    this.setState({ isLoading: false, posts })
  }

  handleLikePost(postId, uid) {
    const { posts } = this.state

    let likedPostIdx = posts.findIndex(post => post.id === postId)
    let likedPost = posts.find(post => post.id === postId)
    let otherPosts = posts.filter(post => post.id !== postId)
    const userLiked = likedPost.likes.includes(uid)

    likePost(postId, uid, userLiked)

    if (userLiked) {
      likedPost.likes = likedPost.likes.filter(userId => userId !== uid)
    } else {
      likedPost.likes.push(uid)
    }
    otherPosts.splice(likedPostIdx, 0, likedPost)

    this.setState({ posts: otherPosts })
  }

  render() {
    const { posts } = this.state
    return this.state.isLoading ? null : (
      <FlatList
        style={styles.list}
        numColumns={1}
        data={posts}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.container}>
            <UserBar post={item} navigation={this.props.navigation} />
            <Image style={styles.image} source={{ uri: item.uri }} />
            <IconBar id={item.id} likes={item.likes} likePost={this.handleLikePost} />
            <TextBar post={item} navigation={this.props.navigation} />
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
    width: Layout.window.width,
    height: Layout.window.width,
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
