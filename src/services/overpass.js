export function fetchOverpassData (app, query) {
  const overpassLink = 'https://overpass-api.de/api/interpreter?data=[out:json];'
  const fullLink = overpassLink + query

  app.$http.get(fullLink).then(response => {
    console.log('Obtained OSM data through Overpass query: ' + query)
    return response.json()
  }).then(data => {
    console.log(data)
    return data
  })
}
