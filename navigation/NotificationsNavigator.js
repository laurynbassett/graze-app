import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { NotificationsScreen } from '../screens'

const Stack = createStackNavigator()

export default function NotificationsNavigator({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName='Notifications' navigationOptions={{ tabBarVisible: false }}>
      <Stack.Screen
        name='Notifications'
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
          gestureEnabled: false,
          headerTitle: 'Notifications'
        }}
        navigationOptions={{ tabBarVisible: false }}
      />
    </Stack.Navigator>
  )
}
