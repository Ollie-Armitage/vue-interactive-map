async function fetchOverpassData (app, query) {
  const overpassLink = 'https://overpass-api.de/api/interpreter?data=[out:json];'
  const fullLink = overpassLink + query

  return app.$http.get(fullLink).then(response => {
    return response.json()
  }).then(data => {
    const osmtogeojson = require('osmtogeojson')

    return osmtogeojson(data)
  })
}

export async function fetchTag (app, query) {
  return fetchOverpassData(app, '(node["' + query + '"](51.37392356762,-2.3350667953491,51.382481939058,-2.3199713230133);way["' + query + '"](51.37392356762,-2.3350667953491,51.382481939058,-2.3199713230133);relation["' + query + '"](51.37392356762,-2.3350667953491,51.382481939058,-2.3199713230133););out;')
}
