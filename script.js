
var client = contentful.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken: 'CFPAT-26ba61d69a0aa302ce58740907f49c1181e531bb6e50a9d1210786e7bce0493f'
})

// This API call will request a space with the specified ID
client.getSpace('spaceId')
.then((space) => {
  // Now that we have a space, we can get entries from that space
  space.getEntries()
  .then((entries) => {
    console.log(entries.items)
  })

  // let's get a content type
  space.getContentType('product')
  .then((contentType) => {
    // and now let's update its name
    contentType.name = 'New Product'
    contentType.update()
    .then((updatedContentType) => {
      console.log('Update was successful')
    })
  })
})
