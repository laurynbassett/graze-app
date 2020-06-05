/* eslint-disable react/display-name */
import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { EditPostScreen, SelectPostScreen } from '../screens'
import { BackArrowIcon, PostHeaderLeft } from '../components'

const Stack = createStackNavigator()

export default function PostNavigator({ navigation }) {
  return (
    <Stack.Navigator initialRouteName='SelectPost' navigationOptions={{ tabBarVisible: false }}>
      <Stack.Screen
        name='SelectPost'
        component={SelectPostScreen}
        options={{
          title: 'Select Post',
          headerLeft: () => <PostHeaderLeft navigation={navigation} />
        }}
      />
      <Stack.Screen
        name='EditPost'
        component={EditPostScreen}
        options={{
          title: 'Edit Post',
          headerLeft: () => <BackArrowIcon onPress={() => navigation.navigate('SelectPost')} />
        }}
      />
    </Stack.Navigator>
  )
}
