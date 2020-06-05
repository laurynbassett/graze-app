import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export const PostHeaderLeft = props => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
      <Text style={styles.text}>Cancel</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginLeft: 20
  }
})
