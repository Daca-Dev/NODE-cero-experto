
const axios = require('axios');
const fs = require('fs');

class Busqueda {

    constructor() {
        
        this.pathDb = './db/database.json';
        this.leerDb();
    }

    get getPramasmapbox() {
        return {
            limit: 5,
            language: 'es',
            access_token: process.env.MAPBOX_TOKEN
        }
    }

    get getParamsOpenWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async buscarCiudad( lugar ) {
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
            params: this.getPramasmapbox
        })

        const resp = await instance.get();
        
        return resp.data.features.map( lugar => ({
            id: lugar.id,
            name: lugar.place_name,
            lat: lugar.center[1],
            lng: lugar.center[0]
        }));
    }

    async obtenerClima( lat, lon ) {
        const instance = axios.create({
            baseURL: 'https://api.openweathermap.org/data/2.5/weather',
            params: {
                lat,
                lon,
                ...this.getParamsOpenWeather
            }
        })

        const { data } = await instance.get();
        
        return {
            desc: data.weather[0].description,
            temp: data.main.temp,
            min: data.main.temp_min,
            max: data.main.temp_max
        };
    }

    actualizarHistorial( lugar = '' ) {

        if ( this.historial.includes( lugar.toLocaleLowerCase() ) ) return;

        this.historial.unshift( lugar.toLocaleLowerCase() );
        if ( this.historial.length > 5 ) {
            this.historial = this.historial.slice(0, 5);
        }

        this.guardarDb();
    }

    guardarDb() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync( this.pathDb, JSON.stringify( payload ) )
    }

    leerDb() {
        if ( !fs.existsSync( this.pathDb ) ) {
            return [];
        }

        const data = fs.readFileSync( this.pathDb, { encoding: 'utf-8' } );
        const { historial } = JSON.parse( data )
        this.historial = historial;
    }

}

module.exports = { Busqueda };
