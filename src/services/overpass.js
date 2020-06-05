
const boundingBox = '(51.37392356762,-2.3350667953491,51.382481939058,-2.3199713230133)'

const baseDataQuery = '' +
  '(way["building"]' + boundingBox + ';' +
  'way["addr:housename"]' + boundingBox + ';' +
  'way["construction"]' + boundingBox + ';' +
  'way["leisure"]' + boundingBox + ';' +
  'node["leisure"]' + boundingBox + ';' +
  'relation["building"]' + boundingBox + ';' +
  'node["amenity"="parking"]' + boundingBox + ';' +
  'way["amenity"="parking"]' + boundingBox + ';' +
  'relation["amenity"="parking"] ' + boundingBox + ';' +
  'node["bus"]' + boundingBox + ';' +
  'way["amenity"]' + boundingBox + ';' +
  'node["entrance"]' + boundingBox + ';)'

export function OverpassQueryToLink (app, query) {
  if (query === '') return null

  query = query.replace('&', '%26')
  const overpassLink = 'https://overpass-api.de/api/interpreter?data=[out:json];'
  const trailer = ';out;>;out;'

  // Tags to to search through

  /*  const categoryList = ['name', 'addr:housenumber']

  let finalQuery = '('

  if (categoryList.includes(query)) {
    finalQuery = finalQuery + 'node["' + query + '"]' + boundingBox + ';way["' + query + '"]' + boundingBox + ';relation["' + query + '"]' + boundingBox + ';)'
  }

  categoryList.forEach(function (item) {
    finalQuery = finalQuery +
      'node["' + item + '" = "' + query + '"]' + boundingBox + ';' +
      'way["' + item + '" = "' + query + '" ]' + boundingBox + ';' +
      'relation["' + item + '" = "' + query + '"]' + boundingBox + ';'
  })

  finalQuery = finalQuery + ')' */

  return overpassLink + query + trailer
}

// Build the base data query for the map.

export function buildBaseDataQuery () {
  /* const categoryList = ['name', 'addr:housenumber']

  let finalQuery = '('

  categoryList.forEach(function (item) {
    finalQuery = finalQuery +
      'node["' + item + '"]' + boundingBox + ';' +
      'way["' + item + '"]' + boundingBox + ';' +
      'relation["' + item + '"]' + boundingBox + ';'
  })

  finalQuery = finalQuery + ')' */
  return baseDataQuery
}

/*
export async function fetchBaseDataNames (app) {
  const baseData = app.$store.getters.getBaseData

  const nameList = []

  baseData.forEach((feature) => {
    nameList.push(feature.name)
  })

  return nameList
} */

/*
export async function getNamedLocationCoordinates (app, locationName) {
  let returnValue = null

  return await OverpassQueryToLink(app, locationName).then((output) => {
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
*/
