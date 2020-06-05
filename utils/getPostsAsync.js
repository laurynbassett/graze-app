import { auth, firestore } from '../Firebase'

// Get Images
const getPostsAsync = async () => {
  try {
    const { uid } = auth.currentUser

    const querySnapshot = await firestore.collection(`posts/${uid}/userPosts`).get()
    console.log('SNAPSHOT', querySnapshot)

    const posts = querySnapshot.docs.map(doc => {
      return doc.data()
    })
    console.log('POSTS', posts)
    return posts
  } catch (err) {
    console.error('Error getting documents: ', err)
  }
}

export default getPostsAsync
