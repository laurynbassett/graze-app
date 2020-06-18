import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { getAllPostsAsync, getMatchingUsersAsync } from '../utils'
import { PostsGrid, Search, SearchListItem } from '../components'

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
    setSearchResults([])
  }

  useEffect(
    () => {
      // set up listener on blur
      const unsubscribe = props.navigation.addListener('blur', () => {
        console.log('BLURRED')
        clearSearch()
      })
      // fetch all user posts
      fetchPosts()

      // return to unsubscribe listener on unmount
      return unsubscribe
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
      ) : posts.length ? (
        <PostsGrid posts={posts} navigation={props.navigation} />
      ) : null}
    </View>
  )
}

ExploreScreen.navigationOptions = {
  headerTitle: 'Explore'
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'column'
  }
})
