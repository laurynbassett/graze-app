import { auth, firestore } from '../Firebase'

const getMatchingUsersAsync = async searchQuery => {
  try {
    const usersRef = await firestore.collection('users').orderBy('name').startAt(searchQuery).get()
    console.log('USERS REF', usersRef)

    const users = usersRef.docs.reduce((arr, doc) => {
      // get all users that match search query, filtering out current user
      if (doc.id !== auth.currentUser.uid) {
        console.log('DOC ID', doc.id)
        console.log('DOC DATA', doc.data())
        let profile = doc.data()
        profile.uid = doc.id
        arr.push(profile)
      }
      return arr
    }, [])

    console.log('USERS', users)
    return users
  } catch (err) {
    console.error('Error getting document', err)
  }
}

export default getMatchingUsersAsync
