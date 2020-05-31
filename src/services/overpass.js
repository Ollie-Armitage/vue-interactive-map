async function fetchOverpassData (app, query) {
  if (query === '') return null
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

export async function fetchSearchList (app) {
  const categoryList = ['name', 'addr:housenumber']

  let finalQuery = '('
  const boundingBox = '(51.37392356762,-2.3350667953491,51.382481939058,-2.3199713230133)'

  categoryList.forEach(function (item) {
    finalQuery = finalQuery +
      'node["' + item + '"]' + boundingBox + ';' +
      'way["' + item + '"]' + boundingBox + ';' +
      'relation["' + item + '"]' + boundingBox + ';'
  })

  finalQuery = finalQuery + ')'

  const searchJson = await fetchOverpassData(app, finalQuery)

  const searchNames = []

  searchJson.features.forEach((feature) => {
    if (feature.geometry.type === 'Polygon' &&
      feature.properties.type !== 'boundary' &&
      !feature.properties.natural &&
      feature.properties.name !== undefined) {
      searchNames.push(feature.properties.name)
    }
  })

  return [...new Set(searchNames)]
}

export async function fetchPlace (app, query) {
  query = query.replace('&', '%26')

  if (query === '') return null
  // Should search name, building, shop, amenity, addr:housenumber, parking, wheelchair, construction, leisure, sport,

  const categoryList = ['name', 'addr:housenumber']

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
