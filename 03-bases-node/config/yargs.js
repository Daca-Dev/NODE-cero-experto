const argv = require("yargs")
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe: 'Es la base por la cual multiplicará'
  })
  .option("l", {
    alias: "list",
    type: "boolean",
    default: false,
  })
  .option('limit', {
    alias: 'limit',
    default: 10,
    type: 'number'
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) {
      throw "El valor de base debe de ser un número";
    } else {
      return true;
    }
  }).argv;

module.exports = argv