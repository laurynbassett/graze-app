import { firestore, fieldValue, auth } from '../Firebase'
// import { getProfileAsync } from '.'
import getProfileAsync from './getProfileAsync'

export const likePost = async (postId, uid, userLiked) => {
  const postRef = firestore.collection('posts').doc(postId)

  if (userLiked) {
    await postRef.update({ likes: fieldValue.arrayRemove(uid) })
  } else {
    await postRef.update({ likes: fieldValue.arrayUnion(uid) })
  }
}

export const followUser = async (userId, isFollowing) => {
  const { uid } = auth.currentUser
  console.log('USERID', userId)
  const currUserRef = firestore.collection('users').doc(uid)

  const userRef = firestore.collection('users').doc(userId)

  if (isFollowing) {
    await userRef.update({ followers: fieldValue.arrayRemove(uid) })
    await currUserRef.update({ following: fieldValue.arrayRemove(userId) })
  } else {
    await userRef.update({ followers: fieldValue.arrayUnion(uid) })
    await currUserRef.update({ following: fieldValue.arrayUnion(userId) })
  }
}

export const goToProfileAsync = async (navigation, profileOrPost) => {
  // check if second prop is a profile or post prop
  const profile = profileOrPost.bio ? profileOrPost : await getProfileAsync(profileOrPost.uid)

  console.log('NOW NAVIGATING', profile)
  // navigate to user profile
  navigation.navigate('Profile', { profile, ...(profileOrPost.id && { item: profileOrPost }) })
}
