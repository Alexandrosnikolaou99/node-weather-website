const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f989c7e091a58854f5444c76f5679224&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services!", undefined)
        }
        else if (body.error) {
            callback("Unable to find location!", undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + ". The temperature is " + body.current.temperature + " degrees out. The real feel is " + body.current.feelslike + " degrees. The humidity is " + body.current.humidity + " and the wind speed is " + body.current.wind_speed +" km/h. Have a nice day! ")
        }
    })
   
}

module.exports=forecast