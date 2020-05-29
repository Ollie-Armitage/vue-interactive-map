async function fetchOverpassData (app, query) {
  const overpassLink = 'https://overpass-api.de/api/interpreter?data=[out:json];'
  const trailer = ';out;>;out;'
  const fullLink = overpassLink + query + trailer
  return app.$http.get(fullLink).then(response => {
    return response.json()
  }).then(data => {
    const osmtogeojson = require('osmtogeojson')

    return osmtogeojson(data)
  })
}

export async function fetchTagValue (app, query) {
  // Should search name, building, shop, amenity, addr:housenumber, parking, wheelchair, construction, leisure, sport,

  const categoryList = ['name', 'building', 'shop', 'amenity', 'addr:housenumber', 'parking', 'wheelchair', 'construction', 'leisure', 'sport']

  let finalQuery = '('
  const boundingBox = '(51.37392356762,-2.3350667953491,51.382481939058,-2.3199713230133)'

  if (categoryList.includes(query)) {
    finalQuery = finalQuery + 'node["' + query + '"]' + boundingBox + ';way["' + query + '"]' + boundingBox + ';relation["' + query + '"]' + boundingBox + ';)'
    return fetchOverpassData(app, finalQuery)
  }

  categoryList.forEach(function (item) {
    finalQuery = finalQuery +
      'node["' + item + '" = "' + query + '"]' + boundingBox + ';' +
      'way["' + item + '" = "' + query + '" ]' + boundingBox + ';' +
      'relation["' + item + '" = "' + query + '"]' + boundingBox + ';'
  })

  finalQuery = finalQuery + ')'

  return fetchOverpassData(app, finalQuery)
}
