import { firestore, fieldValue } from '../Firebase'

export const likePost = async (postId, uid, userLiked) => {
  const postRef = firestore.collection('posts').doc(postId)

  if (userLiked) {
    await postRef.update({ likes: fieldValue.arrayRemove(uid) })
  } else {
    await postRef.update({ likes: fieldValue.arrayUnion(uid) })
  }
}
