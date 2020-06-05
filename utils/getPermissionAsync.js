import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import { Linking } from 'react-native'

// Camera + Camera Roll Permissions
const getPermissionAsync = async permission => {
  try {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(permission)
      console.log('GETPERMISSION STATUS:', status)
      if (status !== 'granted') {
        alert('Please grant camera roll permissions')
        Linking.openURL('app-settings:')
        return false
      }
      return status
    }
  } catch (err) {
    console.error('Error getting camera permissions: ', err)
  }
}

export default getPermissionAsync
