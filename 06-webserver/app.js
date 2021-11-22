const express = require('express');

const port = 8080;
const app = express();


app.use( express.static('public') );

// este path ya no funcionaria porque tiene prioridad el static
// es decir la carpeta public
app.get('/', (req, resp) => {
    resp.send('Hello World!');
})

app.get('/generic', (req, resp) => {
    resp.sendFile(__dirname + '/public/generic.html');
})

app.get('/elements', (req, resp) => {
    resp.sendFile(__dirname + '/public/elements.html');
})

app.get('*', (req, resp) => {
    resp.sendFile(__dirname + '/public/404.html');
})

app.listen( port, () => console.log(`Escuchando en el puerto ${port}`));
