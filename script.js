
var lang = 'en-US'
var accessToken = 'CFPAT-9b7a21488af237b472d49f2a7a235f8dacc4f99cee5df788bcb47bf6c5a4bb4d'
var space_id = 'vxu5be6w735m'
var query = {}
query.content_type = '1xYw5JsIecuGE68mmGMg20'
var baseAPI = 'https://api.contentful.com'
var assetAPI = baseAPI +"/spaces/" + space_id + "/assets/<asset_id>"; // ?access_token=" + accessToken;

var client = contentful.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken: accessToken
})

function assetEndpoint(asset_id) {
  return assetAPI.replace("<asset_id>", asset_id);
}

client.getSpace(space_id)
.then((space) => space.getEntries(query))
.then((response) => renderPhotos(response.items))
.catch(console.error)

function renderPhotos (data) {
  console.log(data)
  window.data = data
  $.each( data, function( i, photo ){
    var img_url = "https:"
    $.getJSON( assetEndpoint(photo.fields.photo['en-US'].sys.id), { access_token: accessToken, w: '200', h: '150', fit: 'fill' } )
      .done(function( data ) {
        img_url = img_url + data.fields.file[lang].url
        var $div = $("<div>", {id: photo.fields.slug[lang], "class": "col-md-3 col-sm-6"})
        var $buttons_div = $("<div>", {"class": "likes"})
        var $p = $("<p></p>")
        var $like_button = $('<button type="button" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-heart"></span> Like</button>')
        var $comment_button = $('<button type="button" class="btn btn-default btn-sm" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-comment"></span> Comment</button>')
        var $title = $("<h2>" + photo.fields.title[lang] + "</h2>")
        var $img = $("<img>", {"class": "img-thumbnail"})
        $p.append($like_button,$comment_button)
        $buttons_div.append($p)
        $img.attr( "src", img_url )
        $div.append($title)
        $div.append($img)
        $div.append($buttons_div)
        $("#photo-row").append($div)
      })
      .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });
  });
}
