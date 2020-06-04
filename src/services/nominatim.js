import $ from 'jquery'
export async function getNameFromLocation (lat, lng) {
  const link = 'https://nominatim.openstreetmap.org/reverse?'
  const format = 'format=geojson' + '&'
  const latlng = 'lat=' + lat + '&' + 'lon=' + lng + '&'
  const parameters = 'addressdetails=1'
  const fullLink = link + format + '&' + latlng + parameters

  let value = null
  await $.getJSON(fullLink, function (data) {
    value = data
  })

  return value.features[0].properties.name
}
