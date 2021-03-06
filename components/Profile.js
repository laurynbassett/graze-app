import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

export const BioBar = props => {
  return (
    <View style={styles.bioContainer}>
      <Text style={styles.bioName}>{props.name}</Text>
      {props.bio && <Text style={styles.bioText}>{props.bio}</Text>}
      {props.url && <Text style={styles.url}>{props.url}</Text>}
    </View>
  )
}

export const PostsGrid = props => {
  console.log('POSTS GRID PROPS', props)
  return (
    <FlatList
      numColumns={3}
      data={props.posts}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => props.navigation.navigate('Post', { item })}>
          <Image key={item.id} style={styles.image} source={{ uri: item.uri }} />
        </TouchableOpacity>
      )}
    />
  )
}

export const FollowBar = props => {
  const { isFollowing, handleFollowPress, uid } = props
  console.log('FOLLOW PROPS', props)
  return (
    <View style={styles.followContainer}>
      <TouchableOpacity
        onPress={() => handleFollowPress(uid)}
        style={isFollowing ? styles.selectedBtn : styles.unselectedBtn}
      >
        <Text style={styles.btnText}>{isFollowing ? 'Following' : 'Follow'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.unselectedBtn}>
        <Text style={styles.btnText}>Message</Text>
      </TouchableOpacity>
    </View>
  )
}

export const TitleBar = ({ userAvatar, photoCount, followers, following }) => (
  <View style={styles.titleContainer}>
    <View style={styles.avatarContainer}>
      <Image style={styles.avatar} source={userAvatar ? { uri: userAvatar } : null} />
    </View>
    <View style={styles.infoRows}>
      <Text style={styles.infoText}>{photoCount}</Text>
      <Text>Posts</Text>
    </View>
    <View style={styles.infoRows}>
      <Text style={styles.infoText}>{followers.length}</Text>
      <Text>Followers</Text>
    </View>
    <View style={styles.infoRows}>
      <Text style={styles.infoText}>{following.length}</Text>
      <Text>Following</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  nameContainer: {},
  nameText: {
    marginTop: 15,
    marginBottom: 15,
    fontWeight: '600',
    textAlign: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 35,
    marginTop: 15,
    marginBottom: 15,
    width: Layout.window.width * 0.8
  },
  avatarContainer: {
    marginRight: 10,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: 'white'
  },
  avatar: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 45,
    backgroundColor: 'white'
  },
  infoRows: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  bioName: {
    marginTop: 2,
    marginBottom: 2,
    fontWeight: '600'
  },
  bioText: {
    marginTop: 5,
    marginBottom: 5,
    lineHeight: 20
  },
  infoText: {
    marginTop: 2,
    marginBottom: 2,
    fontWeight: '600'
  },
  bioContainer: {
    flexDirection: 'column',
    marginLeft: 25,
    marginRight: 35,
    marginBottom: 10
  },
  url: {
    color: Colors.url
  },
  followContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
    marginBottom: 15,
    width: '100%'
  },
  unselectedBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    height: 35,
    width: Layout.window.width * 0.45,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.tintColor,
    backgroundColor: Colors.tintColor
  },
  selectedBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    height: 35,
    width: Layout.window.width * 0.45,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.tintColor,
    backgroundColor: Colors.selectedTint
  },
  btnText: {
    color: 'white'
  },
  image: {
    height: Layout.window.width * 0.33,
    width: Layout.window.width * 0.33,
    marginRight: 3,
    marginBottom: 3
  }
})
