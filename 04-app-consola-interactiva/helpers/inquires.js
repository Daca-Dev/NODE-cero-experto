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
      { value: "1", name: `${"1.".green} Crear tarea` },
      { value: "2", name: `${"2.".green} Listar tareas` },
      { value: "3", name: `${"3.".green} Listar tareas completadas` },
      { value: "4", name: `${"4.".green} Listar tareas pendientes` },
      { value: "5", name: `${"5.".green} Completar tarea(s)` },
      { value: "6", name: `${"6.".green} Borrar tarea` },
      { value: "0", name: `${"0.".green} Salir\n` },
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

const listadoBorrar = async (tareas = []) => {

  const choices = generarChoices( tareas );
  choices.unshift({ value: '0', name: `${'0'.green} Cancelar`})

  const items = {
    type: "list",
    name: "id",
    message: "Cual tarea deseas borrar?",
    choices,
  };

  console.log();
  const { id } = await inquires.prompt(items);

  if ( id === '0' ) return null;
    
  const { state } = await confirm( "Esta seguro de borrar la tarea?" );

  return state ? id : null;
};

const generarChoices = ( tareas =[] ) => {
  return tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;
    return { value: tarea.id, name: `${idx}. ${tarea.desc}`, checked: tarea.completeDate ? true : false };
  })
}

const confirm = async(message) => {
  const confirm = {
    type: "confirm",
    name: "state",
    message,
    default: true,
  };

  return await inquires.prompt( confirm );
};

module.exports = {
  inquireMenu, inquirePause, inquireInput,
  listadoBorrar, completarTarea
};
