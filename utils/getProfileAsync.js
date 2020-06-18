import { auth, firestore } from '../Firebase'

// Get Images
const getProfileAsync = async (uid = auth.currentUser.uid) => {
  try {
    const profileRef = firestore.collection('users').doc(uid)
    const doc = await profileRef.get()

    if (!doc.exists) {
      console.log('No such document!')
    } else {
      let profile = doc.data()
      profile.uid = doc.id
      return profile
    }
  } catch (err) {
    console.error('Error getting document', err)
  }
}

export default getProfileAsync
