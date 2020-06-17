import React from 'react'
import { SearchBar } from 'react-native-elements'
import { StyleSheet } from 'react-native'

const Search = props => {
  const { clearSearch, updateSearch, searchQuery } = props
  return (
    <SearchBar
      value={searchQuery}
      placeholder='Search'
      lightTheme
      round
      inputStyle={styles.inputStyle}
      containerStyle={styles.containerStyle}
      inputContainerStyle={styles.inputContainerStyle}
      clearIcon={{
        iconStyle: styles.iconStyle,
        containerStyle: styles.iconContainerStyle
      }}
      onChangeText={search => updateSearch(search)}
      onClear={clearSearch}
      showCancel={true}
      autoCorrect={false}
      autoCapitalize='none'
    />
  )
}

export default Search

const styles = StyleSheet.create({
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)'
  },
  containerStyle: {
    borderTopColor: 'white',
    backgroundColor: 'white',
    padding: 10
  },
  inputContainerStyle: {
    backgroundColor: '#e7e7e7'
  },
  inputStyle: {
    backgroundColor: '#e7e7e7'
  },
  clearIconStyle: { margin: 20 }
  // clearContainerStyle: {margin: -10},
})
