// packages
require('colors');
// local
// const { mostrarMenu, pausa } = require('./helpers/messages');
const { inquireMenu, inquirePause, inquireInput, listadoBorrar, completarTarea } = require('./helpers/inquires');
const { guardarDB, leerDB } = require('./helpers/saveFile');
const Tareas = require('./models/Tareas');


// limpiamos toda la consola
console.clear();

const main = async() => {

    let opt = '';
    
    const tareas = new Tareas();
    const tareasDb = leerDB();
    
    if ( tareasDb ) {
        tareasDb.forEach( ({ id, desc, completeDate }) => {
            tareas.agregarTarea(desc, id, completeDate);
        });
    }
    
    // ciclo infinito para poder imprimir el menu hasta que
    do {
        // espera el resultado de opt
        opt = await inquireMenu();
        
        switch ( opt ) {
            case '1':
                const desc = await inquireInput( 'Descripción:' );
                tareas.agregarTarea( desc );
                break;
            case '2':
                tareas.listarTareas();
                break;
            case '3':
                tareas.listarComplete(true);
                break;
            case '4':
                tareas.listarIncomplete(false);
                break;
            case '5':
                const ids = await completarTarea( tareas.listarArr );
                tareas.toggleCompletadas( ids );
                break;
            case '6':
                const id = await listadoBorrar( tareas.listarArr );
                if ( id ) {
                    tareas.borrarTarea( id );
                    console.log('Tarea borrada.');
                }
                break;
        }
        guardarDB( tareas.listarArr );
        await inquirePause();

    } while (opt !== '0');
}


main();
