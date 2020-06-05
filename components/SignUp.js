import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native'

import { signupWithEP } from '../utils/auth'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      username: '',
      email: '',
      password: ''
    }
  }

  render() {
    const { name, username, email, password } = this.state
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/graze-logo.png')} resizeMode='center' style={styles.image} />
        <TextInput
          type='name'
          value={name}
          placeholder='Full Name'
          onChangeText={name => this.setState({ name })}
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.inputBox}
        />
        <TextInput
          type='username'
          value={username}
          placeholder='Username'
          onChangeText={username => this.setState({ username })}
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.inputBox}
        />
        <TextInput
          type='email'
          value={email}
          placeholder='Email'
          onChangeText={email => this.setState({ email })}
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.inputBox}
        />
        <TextInput
          type='password'
          value={password}
          placeholder='Password'
          onChangeText={password => this.setState({ password })}
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.inputBox}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => signupWithEP(name, username, email, password, this.props.navigation)}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.btnText}>Login with existing account</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    height: 200,
    width: 200
  },
  inputBox: {
    width: Layout.window.width * 0.8,
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    textAlign: 'left',
    backgroundColor: 'white'
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 50,
    width: Layout.window.width * 0.8,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.tintColor,
    backgroundColor: Colors.tintColor
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  }
})
