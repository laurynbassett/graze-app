import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SignUp } from '../components'

export default function SignUpScreen(props) {
  return (
    <View style={styles.container}>
      <SignUp navigation={props.navigation} />
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
