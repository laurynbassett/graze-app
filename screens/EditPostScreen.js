import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { EditPost } from '../components'

export default function EditPostScreen(props) {
  return (
    <View style={styles.container} contentContainerStyle={styles.contentContainer}>
      <EditPost navigation={props.navigation} route={props.route} />
    </View>
  )
}

EditPostScreen.navigationOptions = ({ navigation, navigationOptions }) => {
  console.log('NAV OPTS', navigationOptions)
  return {
    headerRight: (
      <TouchableOpacity>
        <Text>Share</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  contentContainer: {
    paddingTop: 15
  }
})
