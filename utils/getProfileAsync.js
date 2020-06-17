import { auth, firestore } from '../Firebase'

// Get Images
const getProfileAsync = async (uid = auth.currentUser.uid) => {
  try {
    console.log('UID', uid)
    const profileRef = firestore.collection('users').doc(uid)
    const doc = await profileRef.get()

    if (!doc.exists) {
      console.log('No such document!')
    } else {
      return doc.data()
    }
  } catch (err) {
    console.error('Error getting document', err)
  }
}

export default getProfileAsync
