import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { BioBar, FollowBar, PostsGrid, TitleBar } from '../components'
import { getPostsAsync, getProfileAsync } from '../utils'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import { auth } from '../Firebase'
import getProfileAsync from '../utils/getProfileAsync'

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {
        name: '',
        bio: '',
        url: '',
        followers: 0,
        following: 0,
        userAvatar: ''
      },
      posts: []
    }
  }

  async componentDidMount() {
    const profile = await getProfileAsync()
    const posts = await getPostsAsync()
    this.setState({ profile, posts })
  }

  render() {
    const { profile, posts } = this.state
    // console.log('USER POSTS', posts)

    return (
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>
        <TitleBar
          userAvatar={profile.userAvatar}
          photoCount={posts.length}
          followers={profile.followers}
          following={profile.following}
        />
        <BioBar name={profile.name} bio={profile.bio ? profile.bio : null} url={profile.url ? profile.url : null} />
        {auth.currentUser.email !== profile.email && <FollowBar />}
        {posts.length ? <PostsGrid posts={posts} /> : <Text style={styles.text}>No posts</Text>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightestGray,
    flexDirection: 'column'
  },
  contentContainer: {
    paddingTop: 15
  },
  text: {
    alignSelf: 'center',
    marginTop: Layout.window.height * 0.2
  }
})
