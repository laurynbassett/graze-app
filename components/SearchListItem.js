import React from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'

import Colors from '../constants/Colors'
import { goToProfileAsync } from '../utils'

const SearchListItem = props => {
  const { navigation, profile } = props

  return (
    <TouchableHighlight onPress={() => goToProfileAsync(navigation, profile)}>
      <View style={styles.container}>
        <Image style={styles.itemImage} source={{ uri: profile.userAvatar, width: 20, height: 20 }} />
        <Text style={styles.itemName}>@{profile.username}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default SearchListItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
    backgroundColor: '#fff'
  },
  itemName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemImage: {
    marginLeft: 5,
    borderRadius: 50
  }
})
