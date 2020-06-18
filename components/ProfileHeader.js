import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { getProfileAsync } from '../utils'

export const ProfileHeaderCenter = props => {
  const [ name, setName ] = useState('Profile')

  async function fetchUsername() {
    const result = await getProfileAsync()

    if (result && result.username) {
      setName(result.username)
    } else {
      setName('Profile')
    }
  }
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // Refetch data when screen is in focus
      fetchUsername()
    })

    // fetch initial data
    fetchUsername()

    // Return unsubscribe from event so it gets removed on unmount
    return unsubscribe
  }, [])

  return <Text style={styles.text}>@{name}</Text>
}

export const ProfileHeaderRight = props => {
  return (
    <View>
      <TouchableOpacity onPress={() => props.navigation.navigate('Settings')}>
        <Feather name='settings' size={23} style={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '600'
  },
  icon: {
    marginRight: 20
  }
})
