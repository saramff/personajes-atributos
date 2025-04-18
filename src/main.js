////////////////////////////////////////////////////////////////////////
//                           Creations                                //
//                                                                    //  
////////////////////////////////////////////////////////////////////////

import { menDataArray, womenDataArray, menNames, womenNames } from "./objects.js";

// import { createClient } from "@supabase/supabase-js";


/**************************************************************************************/

const randomNumber = Math.random();

let correctKey;
let incorrectKey;

if (randomNumber < 0.5) {
  correctKey = "a";
  incorrectKey = "l";
} else {
  correctKey = "l";
  incorrectKey = "a";
}

/**************************************************************************************/





// Create suffle function - suffles array index randomly
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Suffle all arrays (images and names)
shuffle(menDataArray);
shuffle(womenDataArray);
shuffle(menNames);
shuffle(womenNames);

// Add names to men and women 

menDataArray.forEach((man, index) => man.name = menNames[index]);
womenDataArray.forEach((woman, index) => woman.name = womenNames[index]);

// Create new array concatenating men & women
const peopleDataArray = [...menDataArray, ...womenDataArray];

// suffle people array randomly
shuffle(peopleDataArray);

// Get images to preload them
const bodyImgs = peopleDataArray.map((person) => person.bodyImg);
const faceImgs = peopleDataArray.map((person) => person.faceImg);
const allImgs = [...bodyImgs, ...faceImgs];


/**************************************************************************************/



/**************************************************************************************/



/**************************************************************************************/



/**************************************************************************************/


/* Initialize jsPsych */
let jsPsych = initJsPsych();

/* Create timeline */
let timeline = [];

////////////////////////////////////////////////////////////////////////
//                           Consent                                  //
//                                                                    //  
////////////////////////////////////////////////////////////////////////

let check_consent = (elem) => {
  if (document.getElementById('consent_checkbox').checked) {
    return true;
  }
  else {
    alert("Muchas gracias por su interés en nuestro experimento. Si está listo para participar, por favor, dénos su consentimiento.");
    return false;
  }
  return false;
};

let html_block_consent = {
  type: jsPsychExternalHtml,
  url: "consentA2.html",
  cont_btn: "start_experiment",
  check_fn: check_consent
};
timeline.push(html_block_consent);

// // ////////////////////////////////////////////////////////////////////////
// // //                           Demographic  variables                   //
// // ////////////////////////////////////////////////////////////////////////

/* fullscreen */
timeline.push({
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  message: '<p>Por favor, haga clic para cambiar al modo de pantalla completa.</p>',
  button_label:'Continuar',
  on_finish: function(data){
    var help_fullscreen = data.success;
    jsPsych.data.addProperties({fullscreen: help_fullscreen});
  }
});

var participantName = {
  type: jsPsychSurveyText,
  preamble: 'A continuación, le preguntaremos algunos datos.',
  name: 'participantName',
    button_label:'Continuar',
    questions: [{prompt:'<div>¿Cuál es su nombre y apellidos?<\div>', rows: 1, columns: 2, required: 'true'}],
  data: {
    type:"demo",
    participantName: participantName,
  },
  on_finish: function(data){
    var help_participantName = data.response.Q0;
    jsPsych.data.addProperties({participantName: help_participantName});
  },
  on_load: function() {
    document.querySelector('.jspsych-btn').style.marginTop = '20px'; // Adjust margin as needed
  }
};

timeline.push(participantName);

var centroAsociado = {
  type: jsPsychSurveyText,
  name: 'centroAsociado',
    button_label:'Continuar',
    questions: [{prompt:'<div>¿Cuál es su centro asociado?<\div>', rows: 1, columns: 2, required: 'true'}],
  data: {
    type:"demo",
    centroAsociado: centroAsociado,
  },
  on_finish: function(data){
    var help_centroAsociado = data.response.Q0;
    jsPsych.data.addProperties({centroAsociado: help_centroAsociado});
  },
  on_load: function() {
    document.querySelector('.jspsych-btn').style.marginTop = '20px'; // Adjust margin as needed
  }
};

timeline.push(centroAsociado);

var age = {
  type: jsPsychSurveyText,
    name: 'age',
    button_label:'Continuar',
    questions: [{prompt:'<div>¿Cuántos años tiene?<\div>', rows: 1, columns: 2, required: 'true'}],
  data: {
    type:"demo",
    age: age,
  },
  on_finish: function(data){
    var help_age = data.response.Q0;
    jsPsych.data.addProperties({age: help_age});
  },
  on_load: function() {
    document.querySelector('.jspsych-btn').style.marginTop = '20px'; // Adjust margin as needed
  }
};

timeline.push(age);

var demo2 = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      prompt:'Por favor, seleccione el género con el que se identifica.',
      name: 'gender',
      options: ["masculino", "femenino", "otro", "prefiero no decirlo"],
      required: true,
      horizontal: true
    },
     {
      prompt:'Por favor, seleccione su lengua materna.',
      name: 'language',
      options: ["español", "otro"],
      required: true,
      horizontal: true
    },
  ],
  button_label:'Continuar',
  on_finish: function(data) {
    var help_gender = data.response.gender;
    var help_language = data.response.language;
    jsPsych.data.addProperties({gender: help_gender, language: help_language});
  }
};
timeline.push(demo2);

/************************************************************************************************ */

/* Preload images */
let preload = {
  type: jsPsychPreload,
  images: allImgs,
};
timeline.push(preload);


/* Fixation trial */
let fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: "NO_KEYS", // Prevent key press
  trial_duration: 500, // Fixation duration
  data: {
    task: "fixation",
  },
};

/* Welcome message trial */
let welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "Bienvenido al experimento. <br /> </p></p> Pulse la barra espaciadora para comenzar.",
  choices: [' '],
};
timeline.push(welcome);


/**************************************************************************************/




/**************************************************************************************/


/* Instructions for Tetris */
let instructionstetris = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>Ahora jugará al Tetris durante aproximadamente 20 minutos.</p>
    <p>En Tetris, hay piezas de diferentes formas que caen desde la parte superior de la pantalla. <br /> Su objetivo es moverlas y girarlas para que encajen y formen líneas horizontales completas. <br /> Cuando una línea se completa, desaparece. <br /> Si las piezas se acumulan hasta llegar a la parte superior, pierde.</p> <p>Controles:</p> <strong>Flecha izquierda:</strong> Mueve la pieza a la izquierda <br /> <strong>Flecha derecha:</strong> Mueve la pieza a la derecha <br /> <strong>Flecha arriba:</strong> Gira la pieza <br /> <strong>Flecha abajo:</strong> Acelera la caída <p>Cuando aparezca la pantalla del juego, haga clic en <strong>"Play"</strong> para iniciar.</p> <p>Si pierde, seleccione <strong>"Try again"</strong> para reiniciar. <br /> Jugará de esta manera hasta que se agote el tiempo.</p> <p>Pulse la barra espaciadora para comenzar.</p>
  `,
  choices: [' '],
  post_trial_gap: 500,
};
timeline.push(instructionstetris);

/* Tetris */
let tetris = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div class="tetris-visible"></div>
  `,
  post_trial_gap: 500,
  choices: "NO_KEYS", // Prevent key press
  trial_duration: 100, 
};
timeline.push(tetris);


/**************************************************************************************/





// /**************************************************************************************/


// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_API_KEY
// );

// const TABLE_NAME = "";

// async function saveData(data) {
//   console.log(data);
//   const { error } = await supabase.from(TABLE_NAME).insert({ data });

//   return { error };
// }

// const saveDataBlock = {
//   type: jsPsychCallFunction,
//   func: function() {
//     saveData(jsPsych.data.get())
//   },
//   timing_post_trial: 200
// }

// timeline.push(saveDataBlock);



// /**************************************************************************************/


/* Goodbye message trial */
let goodbye = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "Muchas gracias por haber realizado el experimento. <br /> </p></p> Pulsa la barra espaciadora para salir.",
  choices: [' '],
};
timeline.push(goodbye);


// /**************************************************************************************/



/* Run the experiment */
jsPsych.run(timeline);

// Uncomment to see the results on the console (for debugging)
// console.log(jsPsych.data.get());