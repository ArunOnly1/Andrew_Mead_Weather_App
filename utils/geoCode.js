const request = require('postman-request')
const debug = require('debug')('geoCode.js')
// Geocoding
// Address->Lat/Long->Weather
// encodeURIComponent to make if special characters like "?" used in address is safely converted into strings
const geoCode = (address, callback) => {
	const geoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoiYXJ1bjFubHkxIiwiYSI6ImNrdzA2eTB0NzFibjYyeXFpMnZxdmxlNHMifQ.QdhSTGzweQtgJJ-HafYp8A&limit=1`

	request({ url: geoCodeURL, json: true }, (error, response) => {
		if (error) {
			callback('unable to fetch map-box api', undefined)
		} else if (response.body.message) {
			callback('unable to find location,try another search', undefined)
		} else {
			const { features } = response.body
			// Try with 12What the api returns features as empty array

			if (features.length >= 1) {
				const { center, place_name } = features[0]
				const [longitude, latitude] = center
				callback(undefined, { latitude, longitude, location: place_name })
			} else {
				callback(
					new Error(
						'no items as per location i.e featured array is empty(weird scenario)'
					)
				)
			}
		}
	})
}

module.exports = geoCode
