import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native'

import { getAllPostsAsync, getMatchingUsersAsync } from '../utils'
import Colors from '../constants/Colors'
import { Search, SearchListItem } from '../components'

export default function ExploreScreen(props) {
  const [ posts, setPosts ] = useState([])
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ searchResults, setSearchResults ] = useState([])

  const fetchPosts = async () => {
    const posts = await getAllPostsAsync()
    setPosts(posts)
  }

  const fetchUsers = async () => {
    const matchingUsers = await getMatchingUsersAsync(searchQuery)
    console.log('MATCHING', matchingUsers)
    setSearchResults(matchingUsers)
  }

  const updateSearch = searchQuery => {
    console.log('UPDATE SEARCH', searchQuery)
    setSearchQuery(searchQuery)
    fetchUsers(searchQuery)
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  useEffect(
    () => {
      fetchPosts()
    },
    [ posts.length ]
  )

  return (
    <View>
      <Search clearSearch={clearSearch} updateSearch={updateSearch} searchQuery={searchQuery} />
      {searchResults.length ? (
        <FlatList
          key={1}
          // numColumns={1}
          style={styles.list}
          data={searchResults}
          horizontal={false}
          renderItem={({ item }) => <SearchListItem profile={item} navigation={props.navigation} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <FlatList
          style={styles.grid}
          numColumns={3}
          data={posts}
          renderItem={({ item }) => <Image key={item.id} style={styles.image} source={{ uri: item.uri }} />}
        />
      )}
    </View>
  )
}

ExploreScreen.navigationOptions = {
  headerTitle: 'Explore'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightestGray
  },
  list: {
    flexDirection: 'column'
  },
  grid: {
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  image: {
    width: 124,
    height: 124,
    marginRight: 2,
    marginBottom: 2,
    resizeMode: 'cover'
  }
})
