import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Permissions from 'expo-permissions'

import { SelectPost } from '../components'
import Colors from '../constants/Colors'
import { getPermissionAsync, selectPostAsync, takePhotoAsync } from '../utils'

export default class SelectPostScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null
    }
    this.nextScreen = this.nextScreen.bind(this)
  }

  async componentDidMount() {
    // on blur, reset image
        this.props.navigation.addListener('blur', ()=> {
          this.setState({image:null})
        });
    const cameraRollStatus = await getPermissionAsync(Permissions.CAMERA_ROLL)
    const cameraStatus = await getPermissionAsync(Permissions.CAMERA)
    this.setState({ cameraRollStatus, cameraStatus })
  }

  componentWillUnmount(){
    // remove blur listener on component unmount
    this.props.navigation.removeListener('blur')
  }

  nextScreen = () => {
    this.props.navigation.navigate('EditPost', { image: this.state.image })
  }

  render() {
    const { image } = this.state

    return (
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>
        <SelectPost
          image={image}
          nextScreen={this.nextScreen}
          selectPost={selectPostAsync}
          takePhoto={takePhotoAsync}
          thisObj={this}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightestGray
  },
  contentContainer: {
    paddingTop: 15
  }
})
