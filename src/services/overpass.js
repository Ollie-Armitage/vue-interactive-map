import axios from 'axios'

const boundingBox = '(51.37392356762,-2.3350667953491,51.382481939058,-2.3199713230133)'
export const wizardLink = 'https://overpass-api.de/api/interpreter?data=[out:json];'
export const overpassLink = 'https://overpass-api.de/api/interpreter?data=[out:json];'
export const baseDataQuery = '' +
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
export const trailer = ';out;>;out;'

export function getBaseQuery () {
  return overpassLink + baseDataQuery + trailer
}

function getKeyOverpassFilterQuery (query) {
  if (query === '') return null

  query = fixQuery(query)

  let finalQuery = '('

  finalQuery = finalQuery +
    'node["' + query + '"]' + boundingBox + ';' +
    'way["' + query + '"]' + boundingBox + ';' +
    'relation["' + query + '"]' + boundingBox + ';'

  finalQuery = finalQuery + ')'

  return overpassLink + finalQuery + trailer
}

function fixQuery (query) {
  return query.replace('&', '%26')
}

export async function downloadFilterData (app, query) {
  const osmtogeojson = require('osmtogeojson')
  const overpassLink = getKeyOverpassFilterQuery(query)
  const overpassData = await axios.get(overpassLink)
  return osmtogeojson(overpassData.data)
}
