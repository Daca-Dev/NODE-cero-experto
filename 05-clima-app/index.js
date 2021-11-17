// toma el archivo .env y configura las variables de entorno
require('dotenv').config();

const { inquireInput, inquireMenu, inquirePause, listadoLugares, listadoHistorial } = require("./helpers/inquires");
const { Busqueda } = require("./models/busqueda");



const main = async() => {


    const busqueda = new Busqueda();
    let opt;

    do {
        
        opt = await inquireMenu();
        
        switch ( opt ) {
            case 1:
                // obtener lugar
                const lugar = await inquireInput('Ingrese lugar:');

                // buscar en la API lugares
                const lugares = await busqueda.buscarCiudad( lugar );

                // seleccionar lugar
                const id = await listadoLugares( lugares );
                if ( id === '0') continue;
                const lugarSel = lugares.find( l => l.id === id );

                // guardar en DB
                busqueda.actualizarHistorial( lugarSel.name );

                //clima
                const clima = await busqueda.obtenerClima( lugarSel.lat, lugarSel.lng );
                
                // resultados
                printResults(lugarSel, clima);
                break;

            case 2:
                // listar historial
                const lugarHis = await listadoHistorial( busqueda.historial );
                if ( lugarHis === '0' ) continue;

                // buscar en la API lugares
                const lugareshis = await busqueda.buscarCiudad( lugarHis );
                const lugarSelHis = lugareshis[0];

                //clima
                const climaHis = await busqueda.obtenerClima( lugarSelHis.lat, lugarSelHis.lng );

                // resultados
                printResults( lugarSelHis, climaHis );
                break;

            case 0:
                console.log('\nAdios! (☞ﾟ∀ﾟ)☞');
        }

        if ( opt !== 0 ) {
            await inquirePause();
        }

    } while ( opt !== 0);

}

const printResults = ( lugar, clima ) => {
    console.log('\nInformación de la ciudad\n'.green);
    console.log('Ciudad:'.green, lugar.name);
    console.log('Lat:'.green, lugar.lat);
    console.log('Lng:'.green, lugar.lng);
    console.log('Temperatura:'.green, clima.temp);
    console.log('Mínima:'.green, clima.min);
    console.log('Máxima:'.green, clima.max);
    console.log('Clima actual:'.green, clima.desc);
}

main();