
const boundingBox = '(51.37392356762,-2.3350667953491,51.382481939058,-2.3199713230133)'

export async function fetchOverpassDataFromQuery (app, query) {
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

export async function queryOverpass (app, query) {
  if (query === '') return null
  query = query.replace('&', '%26')

  // Should search name, building, shop, amenity, addr:housenumber, parking, wheelchair, construction, leisure, sport,

  const categoryList = ['name', 'addr:housenumber']

  let finalQuery = '('

  if (categoryList.includes(query)) {
    finalQuery = finalQuery + 'node["' + query + '"]' + boundingBox + ';way["' + query + '"]' + boundingBox + ';relation["' + query + '"]' + boundingBox + ';)'
    return fetchOverpassDataFromQuery(app, finalQuery)
  }

  categoryList.forEach(function (item) {
    finalQuery = finalQuery +
      'node["' + item + '" = "' + query + '"]' + boundingBox + ';' +
      'way["' + item + '" = "' + query + '" ]' + boundingBox + ';' +
      'relation["' + item + '" = "' + query + '"]' + boundingBox + ';'
  })

  finalQuery = finalQuery + ')'

  return fetchOverpassDataFromQuery(app, finalQuery)
}

// Fetch the base data for the map.

export async function fetchBaseData (app) {
  const categoryList = ['name', 'addr:housenumber']

  let finalQuery = '('

  categoryList.forEach(function (item) {
    finalQuery = finalQuery +
      'node["' + item + '"]' + boundingBox + ';' +
      'way["' + item + '"]' + boundingBox + ';' +
      'relation["' + item + '"]' + boundingBox + ';'
  })

  finalQuery = finalQuery + ')'

  const searchJson = await fetchOverpassDataFromQuery(app, finalQuery)

  const searchNames = []

  searchJson.features.forEach((feature) => {
    if (feature.geometry.type === 'Polygon' &&
      feature.properties.type !== 'boundary' &&
      !feature.properties.natural &&
      feature.properties.name !== undefined) {
      searchNames.push(feature.properties)
    }
  })

  return [...new Set(searchNames)]
}

export async function fetchBaseDataNames (app) {
  const baseData = app.$store.getters.getBaseData

  const nameList = []

  baseData.forEach((feature) => {
    nameList.push(feature.name)
  })

  return nameList
}

export async function getNamedLocationCoordinates (app, locationName) {
  let returnValue = null

  return await queryOverpass(app, locationName).then((output) => {
    output.features.forEach((feature) => {
      if (feature.geometry.type === 'Point' && feature.properties.entrance === 'yes') {
        returnValue = feature.geometry.coordinates
      }
    })

    if (returnValue === null) {
      output.features.forEach((feature) => {
        if (feature.geometry.type === 'Point') {
          returnValue = feature.geometry.coordinates
        }
      })
    }

    if (returnValue === null) {
      output.features.forEach((feature) => {
        if (feature.geometry.type === 'Polygon') {
          returnValue = feature.geometry.coordinates[0][0]
        }
      })
    }

    return returnValue
  })
}
