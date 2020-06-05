import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import PostNavigator from './PostNavigator'
import ProfileNavigator from './ProfileNavigator'
import HomeNavigator from './HomeNavigator'
import { ExploreScreen, NotificationsScreen } from '../screens'
import { FontAwesomeIcon, IonIcon, MaterialIcon } from '../components'

const BottomTab = createBottomTabNavigator()
const INITIAL_ROUTE_NAME = 'HomeTab'

export default function BottomTabNavigator({ navigation, route }) {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} defaultNavigationOptions={{ tabBarVisible: false }}>
      <BottomTab.Screen
        name='HomeTab'
        component={HomeNavigator}
        options={{
          title: 'Home',
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => <MaterialIcon name='home' focused={focused} />
        }}
      />
      <BottomTab.Screen
        name='ExploreTab'
        component={ExploreScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => <IonIcon name='ios-search' focused={focused} />
          // headerTitle: getHeaderTitle(route)
        }}
      />
      <BottomTab.Screen
        name='PostTab'
        component={PostNavigator}
        options={({ route }) => ({
          title: 'Post',
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => <FontAwesomeIcon name='plus-square-o' focused={focused} />,
          tabBarVisible: false
        })}
      />
      <BottomTab.Screen
        name='NotificationsTab'
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => <IonIcon name='ios-heart-empty' focused={focused} />
        }}
      />
      <BottomTab.Screen
        name='ProfileTab'
        component={ProfileNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => <MaterialIcon name='person-outline' focused={focused} />
        }}
      />
    </BottomTab.Navigator>
  )
}

function getHeaderTitle(route) {
  console.log('ROUTE', route)
  if (route) {
    console.log('ROUTE STATE', route.state)
  }
  // Access the tab navigator's state using `route.state`
  const routeName =
    route && route.state
      ? // Get the currently active route name in the tab navigator
        route.state.routes[route.state.index].name
      : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
        // In our case, it's "Feed" as that's the first screen inside the navigator
        INITIAL_ROUTE_NAME

  switch (routeName) {
    case 'Home':
      return 'HOME'
    case 'Explore':
      return 'EXPLORE'
    case 'Notifications':
      return 'NOTIFICATIONS'
    case 'Profile':
      return 'PROFILE'
    case 'Settings':
      return 'SETTINGS'
    case 'PostNavigator':
      return 'POSTS'
    case 'SelectPost':
      return 'SELECT POST'
    case 'EditPost':
      return 'EDIT POST'
  }
}
