export const formatExplorePhotos = blogs => {
  return blogs
    .reduce((photosArr, blog) => {
      blog.photos.reduce((photos, photo, i) => {
        const arrayContainsImage = photos.find(p => {
          return p.url === photo.displayUrl
        })
        if (!arrayContainsImage && photo.displayUrl) {
          photos.push({ id: i, url: photo.displayUrl })
        }
        return photos
      }, [])
      return photosArr.concat(blog.photos)
    }, [])
    .sort(() => Math.random() - 0.5)
}

export const formatFeedPhotos = blogs => {
  return blogs
    .reduce((a, i) => {
      i.photos.map(p => a.push({ blogId: i.id, name: i.blog, thumb: i.profileUrl, ...p }))
      return a
    }, [])
    .sort(() => Math.random() - 0.5)
}
