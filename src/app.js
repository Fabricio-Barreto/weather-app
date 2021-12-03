const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templetes/views')
const partialsPath = path.join(__dirname, '../templetes/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Fabricio Barreto'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Fabricio Barreto'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Fabricio Barreto'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            res.send({
                error: error
            })
            return console.log(error)
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            res.send({
                error: error,
                Message: forecastData.message,
                address: req.query.address,
                temperature: forecastData.temperature +'°C',
                feelslike: forecastData.feelslike +'°C',
                weather_descriptions: forecastData.weather_descriptions
            })

        })
    })


})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Fabricio Barreto'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})