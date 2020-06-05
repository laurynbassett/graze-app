import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

const onPress = () => {
  console.log('Pressed!')
}

export const BioBar = props => {
  return (
    <View style={styles.bioContainer}>
      <Text style={styles.bioName}>{props.name}</Text>
      {props.bio && <Text style={styles.bioText}>{props.bio}</Text>}
      {props.url && <Text style={styles.url}>{props.url}</Text>}
    </View>
  )
}

export const PostsGrid = props => (
  <FlatList
    numColumns={3}
    data={props.posts}
    style={styles.grid}
    renderItem={({ item }) => <Image key={item.id} style={styles.image} source={{ uri: item.uri }} />}
  />
)

export const FollowBar = () => (
  <View style={styles.followContainer}>
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={styles.btnText}>Follow</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={styles.btnText}>Message</Text>
    </TouchableOpacity>
  </View>
)

export const TitleBar = ({ userAvatar, photoCount, followers, following }) => (
  <View style={styles.titleContainer}>
    <Image style={styles.userAvatar} source={{ uri: userAvatar }} />
    <View style={styles.infoRows}>
      <Text style={styles.infoText}>{photoCount}</Text>
      <Text>Posts</Text>
    </View>
    <View style={styles.infoRows}>
      <Text style={styles.infoText}>{followers}</Text>
      <Text>Followers</Text>
    </View>
    <View style={styles.infoRows}>
      <Text style={styles.infoText}>{following}</Text>
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
    marginLeft: 25,
    marginRight: 35,
    marginTop: 15,
    marginBottom: 15,
    width: Layout.window.width * 0.8
  },
  userAvatar: {
    borderRadius: 100,
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10
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
    marginBottom: 15
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
  btn: {
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
  btnText: {
    color: 'white'
  },
  grid: {
    marginHorizontal: 2
  },
  image: {
    height: Layout.window.width * 0.32,
    width: Layout.window.width * 0.32,
    margin: 2
  }
})
