import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ExploreScreen } from '../screens'

const Stack = createStackNavigator()

export default function ExploreNavigator({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName='Explore' navigationOptions={{ tabBarVisible: false }}>
      <Stack.Screen
        name='Explore'
        component={ExploreScreen}
        options={{
          title: 'Explore',
          gestureEnabled: false,
          headerTitle: 'Explore'
        }}
        navigationOptions={{ tabBarVisible: false }}
      />
    </Stack.Navigator>
  )
}
