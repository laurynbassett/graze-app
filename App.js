import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'

import LinkingConfiguration from './navigation/LinkingConfiguration'
import AppNavigation from './navigation'
import { LoginScreen, SignUpScreen } from './screens'
import { auth } from './Firebase'

// const Stack = createStackNavigator()

export default function App(props) {
  const isLoggedIn = auth.currentUser
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
      <NavigationContainer linking={LinkingConfiguration}>
        <AppNavigation />
        {/* {isLoggedIn ? (
            <Stack.Screen
              name='App'
              component={BottomTabNavigator}
              options={{
                title: '',
                tabBarVisible: false
              }}
            />
          ) : (
              <>
              <Stack.Screen name='Login' component={LoginScreen} options={{ title: 'Login' }} />
                <Stack.Screen name='SignUp' component={SignUpScreen} options={{ title: 'Sign Up' }} />
                </>
          )} */}
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
