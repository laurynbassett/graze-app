import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Login } from '../components'

export default function LoginScreen(props) {
  return (
    <View style={styles.container}>
      <Login navigation={props.navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})
