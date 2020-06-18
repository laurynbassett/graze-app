import { auth, firestore } from '../Firebase'

// Get Single User Image
export const getSingleUserPostAsync = async postId => {
  try {
    const userPostQuery = await firestore.collection('posts').doc(postId).get()

    console.log('USER POST QUERY DATA', userPostQuery.data())
    const post = userPostQuery.data()
    return post
  } catch (err) {
    console.error('Error getting documents: ', err)
  }
}

// Get User Images
export const getUserPostsAsync = async (uid = auth.currentUser.uid) => {
  try {
    const userPostsQuery = await firestore.collection('posts').where('uid', '==', uid).get()
    const posts = userPostsQuery.docs.map(doc => {
      return doc.data()
    })

    return sortPosts(posts)
  } catch (err) {
    console.error('Error getting documents: ', err)
  }
}

// Get All Images
export const getAllPostsAsync = async () => {
  try {
    const postsRef = await firestore.collection('posts').get()
    const posts = postsRef.docs.map(doc => {
      return doc.data()
    })

    // console.log('POSTS***', posts)
    return posts
  } catch (err) {
    console.error('Error getting documents: ', err)
  }
}

const sortPosts = posts => {
  return posts.reduce((sorted, el) => {
    let index = 0
    while (index < sorted.length && el.timestamp < sorted[index].timestamp) {
      index++
    }
    sorted.splice(index, 0, el)
    return sorted
  }, [])
}
