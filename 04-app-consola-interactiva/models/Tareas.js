
require('colors');
const Tarea = require("./Tarea");



class Tareas {

    get listarArr() {

        const listado = [];
        Object.keys( this._listado ).forEach( key => {
            
            const tarea = this._listado[ key ];
            listado.push( tarea );
        });
        return listado;
    }

    constructor () {
        this._listado = {}
    }

    borrarTarea( id ) {
        delete this._listado[id];
    }

    agregarTarea ( desc = '', id = null, date = null ) {
        const tarea = new Tarea( desc, id, date );
        this._listado[tarea.id] = tarea;
    }

    listarTareas () {

        console.log();
        Object.keys( this._listado ).forEach( (key, i) => {
            const { desc, completeDate } = this._listado[ key ];
            const state = (completeDate) ? '[ Complete ]'.green : '[ Incomplete ]'.red;
            console.log(`${i + 1}. ${ desc } :: ${ state }`);
        });
    }

    listarComplete() {
        console.log();
        Object.keys( this._listado ).forEach( (key, i) => {
            const { desc, completeDate } = this._listado[ key ];

            if ( completeDate ) {
                console.log(`${i + 1}. ${ desc } :: ${ completeDate.green }`);
            }
        });
    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( !tarea.completeDate ) {
                tarea.completeDate = new Date().toISOString();
            }
        })

        this.listarArr.forEach( tarea => {
            if (!ids.includes( tarea.id ) ) {
                this._listado[tarea.id].completeDate = null;
            }
        })
    }

    listarIncomplete() {
        console.log();
        Object.keys( this._listado ).forEach( (key, i) => {
            const { desc, completeDate } = this._listado[ key ];

            if ( !completeDate ) {
                console.log(`${i + 1}. ${ desc } :: ${ '[ Incomplete ]'.red }`);
            }
        });
    }



}

module.exports = Tareas;
