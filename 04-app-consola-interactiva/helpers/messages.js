// modulo para agregar color a la consola 
// al importarla asi, según la documentación nos permite extender las funcionalidades de los strings
require('colors');


const mostrarMenu = () => {
    // retornamos una promesa para que no se agregue a la cola de tareas sino que espere a que
    // retorne algo la función
    return new Promise( resolve => {
        console.clear();
        console.log('================================='.green)
        console.log('==    Seleccione una opción    =='.green)
        console.log('================================='.green)
        console.log(`${'1.'.green} Crear tarea`)
        console.log(`${'2.'.green} Listar tareas`)
        console.log(`${'3.'.green} Listar tareas completadas`)
        console.log(`${'4.'.green} Listar tareas pendientes`)
        console.log(`${'5.'.green} Completar tarea(s)`)
        console.log(`${'6.'.green} Borrar tarea`)
        console.log(`${'0.'.green} Salir\n`)
    
        // modulo built in de node que nos permite crear una interface para solicitar datos desde la consola
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('Selecione una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        });
    })

}


const pausa = () => {
    // retornamos una promesa para que no se agregue a la cola de tareas sino que espere a que
    // retorne algo la función
    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'Enter'.yellow} para continuar.\n`, (opt) => {
            readline.close();
            resolve();
        });
    })
}

module.exports = {
    mostrarMenu, pausa
}