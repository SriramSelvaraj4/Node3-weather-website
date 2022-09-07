const request = require('request')

const geoCode = (address, callback)=>{
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic3JpcmFtc2VsdmFyYWoiLCJhIjoiY2w2ZGE3ZWdyMGNwYzNtb3Z2bjdxZzZlbCJ9.TIRuqQ-y7B97b2AdfmtQAg`
  request({ url, json: true }, (error, {body})=>{
      if(error){
          callback('Unable to Connect to Location Services!', undefined)
      }else if(body.features.length === 0){
          callback('Unable to Find Location Period', undefined)
      }else{
          callback(undefined,{
              // console.log('response', 'longitude ' + response.body.features[0].center[0] , 'latitude ' + response.body.features[0].center[1])
              latitude : body.features[0].center[1],
              longitude: body.features[0].center[0],
              location : body.features[0].place_name
          })
      }
  })
}

module.exports  =  geoCode