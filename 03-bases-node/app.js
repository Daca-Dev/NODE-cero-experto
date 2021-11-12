
// requerir paquetes
const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('./config/yargs')

console.log('args:', argv);

const {base, list, limit} = argv

console.log('base:', base);
console.log('listar?:', list);
console.log('limite:', limit);


// console.log(process.argv);
// console.log(argv);

// argumentos desde consola
// console.log(process.argv)

// const [ , , arg3] = process.argv;
// const [ , base] = arg3.split('=');


crearArchivo( base, list, limit )
    .then( nombreArchivo => console.log(nombreArchivo, 'creado'))
    .catch( err => console.log(err) );