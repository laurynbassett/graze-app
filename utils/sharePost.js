import { decode, encode } from 'base-64'

if (!global.btoa) {
  global.btoa = encode
}
if (!global.atob) {
  global.atob = decode
}

import { auth, firestore, storage } from '../Firebase'
import reduceImageAsync from './reduceImageAsync'
import getProfileAsync from './getProfileAsync'

export const uploadPost = (uri, path) => {
  return new Promise(async (res, rej) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    const ref = storage.ref(path)
    const unsubscribe = ref.put(blob).on(
      'state_changed',
      state => {
        // Observe state change events such as progress, pause, and resume
        const progress = state.bytesTransferred / state.totalBytes * 100
        console.log('Upload is ' + progress + '% done')
      },
      err => {
        // Handle unsuccessful uploads
        unsubscribe()
        rej(err)
      },
      async () => {
        // Handle successful uploads on complete
        unsubscribe()
        const uri = await ref.getDownloadURL()
        const metadata = await ref.getMetadata()

        res({ name: metadata.name, uri })
      }
    )
  })
}

// Get Remote URI and upload post to Firebase Storage
getRemoteUri = async uri => {
  const { uid } = auth.currentUser
  console.log('GET REMOTE URI - UID: ', uid)

  const randomId = Math.random().toString(36).slice(3)
  const path = `posts/${uid}/userPosts/${randomId}.jpg`
  return uploadPost(uri, path)
}

// Share Post
export default async function sharePost({ caption, image: localUri }) {
  try {
    const { uri: reducedImage, width, height } = await reduceImageAsync(localUri)
    const { uid } = auth.currentUser
    const { name, uri } = await getRemoteUri(reducedImage)
    const profile = await getProfileAsync()
    const userRef = firestore.collection('posts').doc(name)
    await userRef.set({
      id: name,
      uid: uid,
      name: profile.name,
      username: profile.username,
      userAvatar: profile.userAvatar,
      caption,
      timestamp: Date.now(),
      imageWidth: width,
      imageHeight: height,
      uri,
      likes: 0,
      comments: []
    })

    console.log('POSTED SUCCESS!')
  } catch ({ message }) {
    alert(message)
  }
}
