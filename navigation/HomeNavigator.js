/* eslint-disable react/display-name */
import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { HomeScreen, InboxScreen } from '../screens'
import { HomeHeaderCenter, HomeHeaderRight, BackArrowIcon } from '../components'

const Stack = createStackNavigator()

export default function HomeNavigator({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName='Home' navigationOptions={{ tabBarVisible: false }}>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Home',
          gestureEnabled: false,
          headerTitle: () => <HomeHeaderCenter />,
          headerRight: () => <HomeHeaderRight navigation={navigation} route={route} back='Home' />
        }}
        navigationOptions={{ tabBarVisible: false }}
      />
      <Stack.Screen
        name='Inbox'
        component={InboxScreen}
        options={{
          title: 'Inbox',
          gestureEnabled: false,
          headerLeft: () => <BackArrowIcon onPress={() => navigation.navigate('Home')} />
        }}
        navigationOptions={{ tabBarVisible: false }}
      />
    </Stack.Navigator>
  )
}
