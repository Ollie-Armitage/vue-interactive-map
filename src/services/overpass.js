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

export function fetchTag (app, query) {
  return fetchOverpassData(app, '(node["' + query + '"](51.37392356762,-2.3350667953491,51.382481939058,-2.3199713230133);way["' + query + '"](51.37392356762,-2.3350667953491,51.382481939058,-2.3199713230133);relation["' + query + '"](51.37392356762,-2.3350667953491,51.382481939058,-2.3199713230133););out;')
}
