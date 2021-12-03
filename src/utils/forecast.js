const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2035cf7bb0887c364a0d036cdc01dda4&query=' + latitude +',' + longitude

    //console.log(url)

    request({ url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                temperature : body.current.temperature,
                feelslike : body.current.feelslike,
                weather_descriptions : body.current.weather_descriptions[0],
                message: 'It is ' + body.current.temperature + '°C in ' + body.location.name + ', ' + body.location.country + '. The weather is ' + body.current.weather_descriptions[0] + '.'

            })
        }
    })
}

module.exports = forecast