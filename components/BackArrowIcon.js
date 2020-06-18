import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export const BackArrowIcon = props => {
  console.log('PROPSBACK', props)
  return (
    <TouchableOpacity style={styles.left} onPress={props.onPress} hitSlop={styles.hitSlop}>
      <Ionicons name='ios-arrow-back' size={25} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  left: {
    marginLeft: 15
  },
  hitSlop: {
    top: 15,
    left: 15,
    bottom: 15,
    right: 20
  }
})
