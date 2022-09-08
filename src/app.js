const express = require('express')
const geoCode = require('./utils/Geocode')
const foreCast = require('./utils/Forecast')
const path = require('path')
const hbs = require('hbs')
const port = process.env.PORT || 3000

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath =  path.join(__dirname, '../templates/views')
const partialsPath =  path.join(__dirname, '../templates/partials')

//setup Handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
  res.render('index',{
    title:"Weather",
    name:"Sriram",
    footer:"weather"
  })
})

app.get('/about',(req, res)=>{
  console.log('in about')
  res.render('about',{
    title:"About me",
    name:"Sriram",
    footer:"about"
  })
})

app.get('/help',(req, res)=>{
  res.render('help',{
    title:"Help",
    name:"Sriram",
    footer:"help"
  })
})

app.get('/products',(req, res)=>{
  if(!req.query.search){
    res.send({
      error:'You much provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})

app.get('/weather',(req, res)=>{
  if(!req.query.address){
    return res.send({
      error:'You must provide a address term'
    })
  }else{
    geoCode(req.query.address, (error, {latitude, longitude, location}={}) => {
      if (error) {
          return res.send({
            error
          })
      }
      foreCast(latitude, longitude, (error, foreCataData) => {
          if (error) {
              return res.send({
                error
              })
          }
          res.send({
            location,
            forecastDetails:foreCataData,
            address:req.query.address
          })
      })
  })
  }
})

app.get('*',(req,res)=>{
  res.render('404',{
    footer:"hello"
  })
})

app.listen(port, ()=>{
  console.log('this server is running in', port)
})