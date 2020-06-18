import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { BioBar, FollowBar, PostsGrid, TitleBar } from '../components'
import { followUser, getUserPostsAsync, getProfileAsync } from '../utils'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import { auth } from '../Firebase'

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      profile: {
        name: '',
        bio: '',
        url: '',
        followers: [],
        following: [],
        userAvatar: ''
      },
      posts: []
    }
    this.fetchData = this.fetchData.bind(this)
    this.handleFollowPress = this.handleFollowPress.bind(this)
    this.isFollowing = this.isFollowing.bind(this)
  }

  componentDidMount() {
    this.fetchData()

    this.props.navigation.addListener('focus', () => {
      this.fetchData()
    })
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', () => {
      console.log('REMOVING PROFILE SCREEN FOCUS LISTENER')
    })
  }

  async fetchData() {
    this.setState({ isLoading: true })
    let profile = {},
      posts = []
    if (this.props.route.params) {
      profile = this.props.route.params.profile
      posts = await getUserPostsAsync(profile.uid)
    } else {
      profile = await getProfileAsync()
      posts = await getUserPostsAsync()
    }
    this.setState({ isLoading: false, profile, posts })
  }

  handleFollowPress(userId) {
    console.log('Pressed Follow!')
    const { profile } = this.state
    const { uid } = auth.currentUser
    const isFollowing = this.isFollowing()

    let updatedProfile = {}

    if (isFollowing) {
      const followers = profile.followers.filter(follower => follower !== uid)
      updatedProfile = Object.assign(profile, { followers })
    } else {
      const followers = [ ...profile.followers, uid ]
      updatedProfile = Object.assign(profile, { followers })
    }
    // update following/followers in firebase
    followUser(userId, isFollowing)
    // update user followers on state
    this.setState({ profile: updatedProfile })
  }

  isFollowing() {
    return this.state.profile.followers.includes(auth.currentUser.uid)
  }

  render() {
    console.log('RENDER')
    const { isLoading, profile, posts } = this.state
    console.log('PROFILE', profile)
    const isFollowing = this.isFollowing()

    return isLoading || !profile.uid ? null : (
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>
        <TitleBar
          userAvatar={profile.userAvatar}
          photoCount={posts.length}
          followers={profile.followers}
          following={profile.following}
        />
        <BioBar name={profile.name} bio={profile.bio ? profile.bio : null} url={profile.url ? profile.url : null} />
        {auth.currentUser.email !== profile.email && (
          <FollowBar isFollowing={isFollowing} handleFollowPress={this.handleFollowPress} uid={profile.uid} />
        )}
        {posts.length ? (
          <PostsGrid posts={posts} navigation={this.props.navigation} />
        ) : (
          <Text style={styles.text}>No posts</Text>
        )}
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
