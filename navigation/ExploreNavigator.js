import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ExploreScreen, PostScreen, ProfileScreen } from '../screens'
import { BackArrowIcon, ProfileHeaderCenter, ProfileHeaderRight } from '../components'

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
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={({ route }) => ({
          // title: 'Profile',
          title: route.params ? `@${route.params.profile.username}` : 'Profile',
          gestureEnabled: false,
          headerLeft: () => <BackArrowIcon onPress={() => navigation.navigate('Explore')} />
        })}
      />
      <Stack.Screen
        name='Post'
        component={PostScreen}
        options={{
          title: 'Post',
          headerTitle: () => <ProfileHeaderCenter />,
          headerLeft: () => <BackArrowIcon onPress={() => navigation.navigate('Profile')} />
        }}
      />
    </Stack.Navigator>
  )
}
