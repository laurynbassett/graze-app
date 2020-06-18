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
        name='Post'
        component={PostScreen}
        options={({ route }) => ({
          title: route.params
            ? route.params.profile ? `@${route.params.profile.username}` : `@${route.params.item.username}`
            : 'Post',
          headerLeft: () => <BackArrowIcon onPress={() => navigation.navigate('Explore')} />
        })}
      />
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={({ route }) => ({
          title: route.params
            ? route.params.profile ? `@${route.params.profile.username}` : `@${route.params.item.username}`
            : 'Profile',
          gestureEnabled: false,
          headerLeft: () => (
            <BackArrowIcon route={route} onPress={() => navigation.navigate('Post', { item: route.params.profile })} />
          )
        })}
      />
    </Stack.Navigator>
  )
}
