import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

import Colors from '../constants/Colors'

export const IconBar = () => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Feather style={styles.icon} name='heart' size={24} />
      <Feather style={styles.icon} name='message-circle' size={24} />
      <Feather style={styles.icon} name='send' size={24} />
    </View>
    <Feather style={styles.icon} name='bookmark' size={24} />
  </View>
)

export const TextBar = ({ name, likes, caption, comments }) => (
  <View style={styles.textBox}>
    <Text style={styles.text}>{likes} likes</Text>
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
  <View style={[ styles.container, styles.row ]}>
    <View style={styles.row}>
      <Image style={styles.thumb} source={{ uri: image }} />
      <Text style={styles.text}>@{name}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    marginBottom: 10
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
    margin: 20
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
