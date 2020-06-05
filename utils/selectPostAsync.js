import * as ImagePicker from 'expo-image-picker'

export const selectPostAsync = async thisObj => {
  try {
    if (thisObj.state.cameraRollStatus) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [ 4, 3 ]
      })
      if (!result.cancelled) {
        thisObj.setState({ image: result.uri })
      }
    }
  } catch (err) {
    console.error('Error selecting image: ', err)
  }
}
