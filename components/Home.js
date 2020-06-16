import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Feather, FontAwesome } from '@expo/vector-icons'

import Colors from '../constants/Colors'
import { auth } from '../Firebase'
import { likePost } from '../utils'

export const IconBar = props => {
  const { uid } = auth.currentUser
  const userLiked = props.likes.includes(uid)
  return (
    <View style={styles.iconContainer}>
      <View style={styles.row}>
        <FontAwesome
          style={styles.icon}
          color={userLiked ? '#F44E65' : 'black'}
          name={userLiked ? 'heart' : 'heart-o'}
          size={24}
          onPress={() => props.likePost(props.id, uid)}
        />
        <Feather style={styles.icon} name='message-circle' size={24} />
        <Feather style={styles.icon} name='send' size={24} />
      </View>
      <Feather style={styles.icon} name='bookmark' size={24} />
    </View>
  )
}

export const TextBar = ({ name, likes, caption, comments }) => (
  <View style={styles.textBox}>
    <Text style={styles.text}>{likes.length} likes</Text>
    <View style={styles.caption}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={{ flex: 1 }} numberOfLines={1}>
        {caption}
      </Text>
    </View>
    <Text style={styles.subtext}>View all {comments} comments</Text>
  </View>
)

export const UserBar = ({ name, image }) => (
  <View style={[ styles.userContainer, styles.row ]}>
    <View style={styles.row}>
      <Image style={styles.thumb} source={{ uri: image }} />
      <Text style={styles.text}>@{name}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 5
  },
  userContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  column: {
    flexDirection: 'column'
  },
  thumb: {
    borderRadius: 100,
    width: 30,
    height: 30,
    resizeMode: 'cover',
    marginRight: 10
  },
  text: {
    fontWeight: '600'
  },
  textBox: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginVertical: 10
  },
  caption: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  subtext: {
    color: Colors.lightGray
  },
  nameText: {
    marginRight: 5,
    marginTop: 6,
    marginBottom: 5,
    fontWeight: '600'
  },
  imageInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    marginRight: 10
  }
})
