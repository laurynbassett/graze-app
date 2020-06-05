import React, { Fragment } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Colors from '../constants/Colors'

export default function SelectPost(props) {
  const { image, nextScreen, selectPost, takePhoto, thisObj } = props
  return (
    <View style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.button} onPress={() => takePhoto(thisObj)}>
        <Text style={styles.text}>Take a Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => selectPost(thisObj)}>
        <Text style={styles.text}>Open Camera Roll</Text>
      </TouchableOpacity>

      {image && (
        <Fragment>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          <TouchableOpacity style={styles.button} onPress={nextScreen}>
            <Text style={styles.text}>Next</Text>
          </TouchableOpacity>
        </Fragment>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: Colors.lightestGray
  },
  contentContainer: {
    paddingTop: 15
  },
  button: {
    margin: 20
  },
  text: {
    fontSize: 18
  }
})
