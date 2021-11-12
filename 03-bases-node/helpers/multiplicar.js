

const fs = require('fs');

const crearArchivo = async( base = 5, listar = false, limit = 10 ) => {

    let salida = '';
    
    for ( let i = 1; i <= limit; i++ ) {
        salida += `${base} x ${i} = ${i * base}\n`;
    }
    
    if (listar) {
        console.log('===============================')
        console.log(`        TABLA DEL ${base}`)
        console.log('===============================')
        console.log(salida);
    }

    fs.writeFileSync(`./output/tabla-${base}.txt`, salida)

    return `tabla-${base}.txt`

    // return new Promise( (resolve, reject) => {
    //     console.log('===============================')
    //     console.log(`        TABLA DEL ${base}`)
    //     console.log('===============================')
    
    //     let salida = '';
    
    //     for ( let i = 1; i <= 10; i++ ) {
    //         salida += `${base} x ${i} = ${i * base}\n`;
    //     }
    
    //     fs.writeFileSync(`tabla-${base}.txt`, salida, (err) => {
    //         if (err) throw err;
    //         console.log(`tabla-${base}.txt creado`);
    //     })
    // })

}

module.exports = {
    crearArchivo
}
