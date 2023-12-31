const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express Config

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const  partialsPath= path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Alexandros Nikolaou'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alexandros Nikolaou'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        text: 'This is some helpful text',
        name: 'Alexandros Nikolaou'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:"You must provide an address"
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
   
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        porducts:[]
    })
})

app.get('/help/*', (req, res) => {

    res.render('error', {
        title: "Error Page",
        errorMessage: "Help article not found",
        name: "Alexandros Nikolaou"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title:"Error Page",
        errorMessage: "Error 404",
        name: "Alex Nik"
    })
})


app.listen(port, () => {
    console.log('Server is up on port '+port)
})