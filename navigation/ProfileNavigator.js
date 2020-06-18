import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { ProfileScreen, ProfileSettingsScreen, PostScreen } from '../screens'
import { BackArrowIcon, ProfileHeaderCenter, ProfileHeaderRight } from '../components'

const Stack = createStackNavigator()

export default function ProfileNavigator({ navigation }) {
  return (
    <Stack.Navigator initialRouteName='Profile' navigationOptions={{ tabBarVisible: false }}>
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerTitle: () => <ProfileHeaderCenter navigation={navigation} />,
          headerRight: () => <ProfileHeaderRight navigation={navigation} />
        }}
      />
      <Stack.Screen
        name='Post'
        component={PostScreen}
        options={{
          title: 'Post',
          headerTitle: () => <ProfileHeaderCenter navigation={navigation} />,
          headerLeft: () => <BackArrowIcon onPress={() => navigation.navigate('Profile')} />
        }}
      />
      <Stack.Screen
        name='Settings'
        component={ProfileSettingsScreen}
        options={({ navigation }) => ({
          title: 'Settings',
          headerLeft: () => <BackArrowIcon onPress={() => navigation.navigate('Profile')} />
        })}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  headerIcon: {
    marginLeft: 20
  }
})
