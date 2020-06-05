import * as React from 'react'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'

import Colors from '../constants/Colors'

export function IonIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={23}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tintColor : Colors.tabIconDefault}
    />
  )
}

export function MaterialIcon(props) {
  return (
    <MaterialIcons
      name={props.name}
      size={23}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tintColor : Colors.tabIconDefault}
    />
  )
}

export function FontAwesomeIcon(props) {
  return (
    <FontAwesome
      name={props.name}
      size={23}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tintColor : Colors.tabIconDefault}
    />
  )
}
