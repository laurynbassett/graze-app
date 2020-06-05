import * as ImagePicker from 'expo-image-picker'

export const takePhotoAsync = async thisObj => {
  try {
    if (thisObj.state.cameraStatus) {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true
      })
      if (!result.cancelled) {
        thisObj.setState({ image: result.uri })
      }
    }
  } catch (err) {
    console.error('Error selecting image: ', err)
  }
}
