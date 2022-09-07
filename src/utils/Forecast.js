const request = require('request')

const foreCast = (latitude, longitude, callback) => {
    const url='http://api.weatherstack.com/current?access_key=d2c5c621a6f4d132f23b978f9a5bb62e&query=' + longitude + ',' + latitude + '&units=f' 
    request({ url, json: true}, (error, { body })=>{
      if(error){
          callback('unable to fetch weather for this location', undefined)
      }else if (body.error) {
          callback('unable to fetch weather for this location at this time', undefined)
        }
      else{
          callback(undefined, body.current.weather_descriptions[0] + `. It is currently ${body.current.temperature} degrees out. Thers is ${body.current.feelslike}% chance of rain.`)
      }
  })
}

module.exports = foreCast