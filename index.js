const debug = require('debug')('index.js')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')
const nodemon = require('nodemon')

const searchTerm = process.argv[2]
if (!searchTerm) {
	debug('Please provide an address from command line ')
	debug('e.g. => node index.js Kathmandu')
} else {
	// This is a pretty example of callback chaining
	geoCode(searchTerm, (error, lat_lon_data) => {
		if (error) debug('Error', error)

		// debug('data', lat_lon_data)
		debug('The location is', lat_lon_data.location)
		forecast(lat_lon_data, (error, weather_data) => {
			if (error) debug('Error', error)

			// debug('weather_data', weather_data)
			if (weather_data) {
				const { temperature, feelslike, weather_descriptions } = weather_data
				debug(
					`The temperature is ${temperature} degree fahrenheit. It feels like ${feelslike} degree fahrenheit. The weather is ${weather_descriptions[0]}`
				)
			}
		})
	})
}
