import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native'

import { loginWithEP, loginWithGoogle } from '../utils'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  handleEmailChange(evt) {
    this.setState({ email: evt.target.value })
  }

  handlePasswordChange(evt) {
    this.setState({ password: evt.target.value })
  }

  render() {
    const { email, password } = this.state
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/graze-logo.png')} style={styles.image} resizeMode='center' />
        <TextInput
          type='email'
          value={email}
          placeholder='Email'
          onChangeText={email => this.setState({ email })}
          autoCapitalize='none'
          style={styles.inputBox}
        />
        <TextInput
          type='password'
          value={password}
          placeholder='Password'
          onChangeText={password => this.setState({ password })}
          autoCapitalize='none'
          style={styles.inputBox}
        />
        <TouchableOpacity style={styles.btn} onPress={() => loginWithEP(email, password)}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.googleBtn}
            activeOpacity={0.5}
            onPress={() => loginWithGoogle(this.props.navigation)}
          >
            <Image source={require('../assets/images/google-button.png')} style={styles.googleBtnIcon} />
            <Text style={styles.googleBtnText}> Sign In with Google </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Login

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
  btnContainer: {
    flexDirection: 'row'
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
  },
  googleBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    position: 'relative',
    height: 50,
    width: Layout.window.width * 0.8,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.tintColor,
    backgroundColor: Colors.tintColor
  },
  googleBtnText: {
    paddingLeft: 50,
    paddingRight: 50,
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  googleBtnIcon: {
    height: 50,
    width: 50,
    position: 'absolute',
    left: 0
  }
})
