import React, { Component } from 'react'

import LoginNavigator from './LoginNavigator'
import BottomTabNavigator from './BottomTabNavigator'
import { auth } from '../Firebase'

export default class AppNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    console.log('APP NAV PROPS', this.props)
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('LOGGED IN')
        this.setState({ isLoggedIn: true })
      }
    })
  }

  render() {
    return !this.state.isLoggedIn ? <LoginNavigator /> : <BottomTabNavigator />
  }
}
