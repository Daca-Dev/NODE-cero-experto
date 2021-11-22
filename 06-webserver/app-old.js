
const http = require("http");


http.createServer( (request, response) => {
    
    console.log(`🚀 ~ http.createServer ~ request`, request);

    // set status code (default 200)
    response.setHeader('Content-Disposition', 'attachment; filename=data.csv')
    response.writeHead(200, { 'Content-Type': 'application/csv' });
    // configure attachments

    response.write("id, nombre\n");
    response.write("1, David\n");
    response.write("2, Laura\n");
    response.write("3, Camilo\n");
    response.write("4, Juana\n");
    response.end();

})
.listen( 8080 );

console.log('Estamos escuachando en el puerto 8080');
