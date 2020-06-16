import React, { Component } from 'react'
import { Button, Image, StyleSheet, TextInput, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import { sharePost } from '../utils'

export default class EditPost extends Component {
  constructor(props) {
    super(props)
    this.state = { caption: '' }
    this.changeCaption = this.changeCaption.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static navigationOptions = () => ({
    headerRight: (
      <HeaderButtons IconComponent={Ionicons} iconSize={23} color='black'>
        <Item title='Share' onPress={this.handleSubmit} />
      </HeaderButtons>
    )
  })

  changeCaption(caption) {
    this.setState({ caption })
  }

  handleSubmit() {
    const { navigation, route } = this.props
    const { image } = route.params
    navigation.setParams({ caption: this.state.caption })
    const caption = this.state.caption
    if (caption && image) {
      sharePost({ caption: caption.trim(), image }, navigation)
      this.setState({ caption: '' })
    } else {
      alert('Please add a caption')
    }
  }

  render() {
    const { image } = this.props.route.params
    return (
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <TextInput
          type='caption'
          style={styles.text}
          value={this.state.caption}
          onChangeText={this.changeCaption}
          placeholder='Add a Caption'
        />
        <Button title='Share' onPress={this.handleSubmit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    margin: 10,
    backgroundColor: '#fafafa'
  },
  contentContainer: {
    paddingTop: 15
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    width: Layout.window.width,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.lightestGray,
    backgroundColor: '#fff'
  },
  image: {
    margin: 20,
    width: Layout.window.width,
    height: Layout.window.width
    // maxHeight: 200
  }
})
