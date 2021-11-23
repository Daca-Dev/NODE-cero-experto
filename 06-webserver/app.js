const express = require('express');
const hbs = require('hbs');


hbs.registerPartials( __dirname + '/views/components' );
const port = 8080;
const app = express();


app.set('view engine', 'hbs');
app.use( express.static('public') );


app.get('/', (req, resp) => {
    resp.render('index', {
        titulo: 'Curso de Node 2021',
        nombre: 'David A. Casas',
        estado: 'Estudiante'
    });
})

app.get('/generic', (req, resp) => {
    resp.render('generic', {
        titulo: 'Curso de Node 2021',
        nombre: 'David A. Casas',
        estado: 'Estudiante'
    });
})

app.get('/elements', (req, resp) => {
    resp.render('elements', {
        titulo: 'Curso de Node 2021',
        nombre: 'David A. Casas',
        estado: 'Estudiante'
    });
})

app.get('*', (req, resp) => {
    resp.sendFile(__dirname + '/public/404.html');
})

app.listen( port, () => console.log(`Escuchando en el puerto ${port}`));
