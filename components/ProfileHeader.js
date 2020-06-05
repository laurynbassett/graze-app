import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { auth } from '../Firebase'
import { getProfileAsync } from '../utils'

export const ProfileHeaderCenter = props => {
  const [ name, setName ] = useState('Profile')

  async function fetchUsername() {
    const result = await getProfileAsync()
    if (result.username) {
      setName(result.username)
    } else {
      setName('Profile')
    }
  }

  useEffect(() => {
    fetchUsername()
  }, [])

  return <Text style={styles.text}>{name}</Text>
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
    fontSize: 18
  },
  icon: {
    marginRight: 20
  }
})
