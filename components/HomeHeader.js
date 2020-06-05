import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

export const HomeHeaderCenter = () => {
  return <Image style={styles.headerImg} source={require('../assets/images/graze-logo.png')} />
}

export const HomeHeaderRight = props => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('Inbox')}>
      <Feather size={23} name='send' style={styles.headerIcon} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  headerImg: {
    width: 70,
    height: 70 * 0.4
  },
  headerIcon: {
    marginRight: 20
  }
})
