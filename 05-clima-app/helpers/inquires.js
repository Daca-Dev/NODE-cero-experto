// paquete para crear interfaces de usuario amigables
const inquires = require("inquirer");
// paquete apra colorear la consola
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      { value: 1, name: `${"1.".green} Buscar ciudad` },
      { value: 2, name: `${"2.".green} Historial` },
      { value: 0, name: `${"0.".green} Salir` },
    ],
    loop: false,
    pageSize: 10,
  },
];

const pause = [
  {
    type: "input",
    name: "pause",
    message: `Presione ${"Enter".yellow} para continuar.`,
  },
];

const inquireMenu = async () => {
  console.clear();
  console.log("=================================".green);
  console.log("||    Seleccione una opción    ||".green);
  console.log("=================================".green);

  const { opcion } = await inquires.prompt(preguntas);
  return opcion;
};

const inquirePause = async () => {
  console.log("\n");
  await inquires.prompt(pause);
  return "0";
};

const inquireInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) return "Por favor ingrese un valor.";
        return true;
      },
    },
  ];

  const { desc } = await inquires.prompt(question);
  return desc;
};

const completarTarea = async( tareas = [] ) => {

  const choices = generarChoices( tareas );

  const items = {
    type: "checkbox",
    name: "selection",
    message: "Cual tarea deseas borrar?",
    choices,
    loop: false
  };

  const { selection } = await inquires.prompt( items );
  return selection;

}

const listadoLugares = async(lugares = []) => {

  const choices = lugares.map((lugar, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: lugar.id,
      name: `${idx}. ${lugar.name}`,
    }
  });
  choices.push({ value: '0', name: `${'0'.green} Cancelar`})

  const items = {
    type: "list",
    name: "id",
    message: "Selecciona un lugar:",
    choices,
  };

  console.log();
  const { id } = await inquires.prompt(items);

  return id !== '0' ? id : null;
};

const listadoHistorial = async( lugaresHis = [] ) => {
  const choices = lugaresHis.map((lugar, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: lugar,
      name: `${idx}. ${lugar}`,
    }
  });

  const items = {
    type: "list",
    name: "name",
    message: "Selecciona un lugar:",
    choices,
  };

  choices.push({ value: '0', name: `${'0'.green} Cancelar`})
  
  console.log();
  const { name } = await inquires.prompt(items);
  return name;
}


module.exports = {
  inquireMenu, inquirePause, inquireInput,
  listadoLugares, listadoHistorial
};
