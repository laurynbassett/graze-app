import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { editProfileAsync, getProfileAsync, logout } from '../utils'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

export default class ProfileSettingsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      name: '',
      bio: '',
      url: '',
      userAvatar: ''
    }
  }

  async componentDidMount() {
    const profile = await getProfileAsync()
    console.log('FETCHED PROFILE', profile)
    const { username = '', name = '', bio = '', url = '', userAvatar = '' } = profile
    this.setState({ username, name, bio, url, userAvatar, profile })
  }

  render() {
    console.log('PROFILE SETTINGS STATE', this.state)
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.inputLabel}>Username:</Text>
        <TextInput
          type='username'
          style={styles.text}
          value={this.state.username}
          placeholder='Username'
          onChangeText={username => this.setState({ username })}
          containerStyle={styles.listItem}
        />
        <Text style={styles.inputLabel}>Name:</Text>

        <TextInput
          type='name'
          style={styles.text}
          value={this.state.name}
          placeholder='Name'
          onChangeText={name => this.setState({ name })}
          containerStyle={styles.listItem}
        />
        <Text style={styles.inputLabel}>Bio:</Text>

        <TextInput
          type='bio'
          style={styles.text}
          value={this.state.bio}
          placeholder='Bio'
          onChangeText={bio => this.setState({ bio })}
          containerStyle={styles.listItem}
        />
        <Text style={styles.inputLabel}>Link: </Text>

        <TextInput
          type='URL'
          style={styles.text}
          value={this.state.url}
          placeholder='Link'
          onChangeText={url => this.setState({ url })}
          containerStyle={styles.listItem}
        />
        <Text style={styles.inputLabel}>Profile Image URL: </Text>

        <TextInput
          type='userAvatar'
          style={styles.text}
          value={this.state.userAvatar}
          placeholder='Profile Image'
          onChangeText={userAvatar => this.setState({ userAvatar })}
          containerStyle={styles.listItem}
        />
        <TouchableOpacity
          onPress={() =>
            editProfileAsync({
              username: this.state.username,
              name: this.state.name,
              bio: this.state.bio,
              url: this.state.url,
              userAvatar: this.state.userAvatar,
              navigation: this.props.navigation,
              profile: this.state.profile
            })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout(this.props.navigation)} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10
  },
  inputLabel: {
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginVertical: 10,
    fontSize: 14,
    fontWeight: '500'
  },
  text: {
    flexDirection: 'row',
    margin: 5,
    paddingHorizontal: 15,
    height: 50,
    width: Layout.window.width * 0.9,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.lightestGray,
    backgroundColor: Colors.inputBox
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: Colors.lightGray,
    borderBottomWidth: 1,
    textAlign: 'left'
  },
  button: {
    marginTop: 30
  },
  buttonText: {
    color: Colors.tintColor,
    fontSize: 18
  }
})
