const debug = require('debug')('forecast.js')
const request = require('postman-request')
const forecast = (data, callback) => {
	if (data) {
		const { latitude, longitude } = data
		const url = `http://api.weatherstack.com/current?access_key=02db67272da2421655d15c719606b999&query=${latitude}, ${longitude}&units=f`
		request({ url: url, json: true }, (error, response) => {
			if (error) {
				callback('Unable to connect to weather service', undefined)
			} else if (response.body.error) {
				callback('Unable to find location', undefined)
			} else {
				const { temperature, feelslike, weather_descriptions } =
					response.body.current

				callback(undefined, { temperature, feelslike, weather_descriptions })
			}
		})
	}
}

module.exports = forecast
