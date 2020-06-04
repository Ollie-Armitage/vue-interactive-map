import $ from 'jquery'
export async function calculateRoute (app, point1, point2) {
  let requestData = null
  const point1String = JSON.stringify(point1).replace('[', '').replace(']', '')
  const point2String = JSON.stringify(point2).replace('[', '').replace(']', '')

  await $.get('https://api.openrouteservice.org/v2/directions/foot-hiking?api_key=5b3ce3597851110001cf6248b1426a0951e44ffab46db840dab08c5a&start=' + point1String + '1&end= + ' + point2String,
    function (responseText) {
      requestData = responseText
      addMarkers(app, requestData.features[0])
    })

  return requestData
}

async function addMarkers (app, feature) {
  const currentRouteMarkers = []
  const coord1 = feature.geometry.coordinates[0].slice().reverse()
  const coord2 = feature.geometry.coordinates[feature.geometry.coordinates.length - 1].slice().reverse()

  currentRouteMarkers.push(coord1)
  currentRouteMarkers.push(coord2)

  app.$store.commit('setRouteMarkers', currentRouteMarkers)
}

export async function removeMarkers (app, feature) {
  app.$store.commit('setRouteMarkers', [])
}
