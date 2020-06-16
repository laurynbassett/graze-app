import { auth, firestore } from '../Firebase'
import { uploadPost } from './sharePost'

// Edit Profile Settings
const editProfileAsync = async ({ username, name, bio, url, userAvatar, navigation, profile }) => {
  try {
    const { uid } = auth.currentUser
    let avatar = profile.userAvatar

    if (profile.userAvatar !== userAvatar) {
      const path = `userAvatars/${uid}/avatar.png`
      const uploadUri = userAvatar ? userAvatar : '../assets/images/default-avatar.png'
      const { uri } = await uploadPost(uploadUri, path)
      avatar = uri
    }

    const userPostsQuery = await firestore.collection('posts').where('uid', '==', uid).get()
    userPostsQuery.docs.forEach(doc => {
      doc.ref.update({ name, username, userAvatar })
    })
    const userRef = firestore.collection('users').doc(uid)

    await userRef.update({ username, name, bio, url, userAvatar: avatar })
    console.log('NAV', navigation)
    navigation.goBack()
  } catch (err) {
    console.error('Error getting documents: ', err)
  }
}

export default editProfileAsync
