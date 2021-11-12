
const { v4: uuidv4} = require('uuid');


class Tarea {

    constructor( desc = '', id = null, date = null ) {
        this.id = id === null ? uuidv4() : id;
        this.desc = desc;
        this.completeDate = date === null ? null : date;
    }
}

module.exports = Tarea;