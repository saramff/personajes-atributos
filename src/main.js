////////////////////////////////////////////////////////////////////////
//                           Creations                                //
//                                                                    //  
////////////////////////////////////////////////////////////////////////

import { correctObjects, incorrectObjects } from "./objects.js";

import { createClient } from "@supabase/supabase-js";


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

const PEOPLE_URL =
  "https://raw.githubusercontent.com/saramff/face-images-spanish/refs/heads/master";
const IMAGES_PER_GENDER = 24;  

// Create pictures arrays for men and women images
const menImages = Array.from(
  { length: IMAGES_PER_GENDER },
  (_, i) => `${PEOPLE_URL}/men/man_${i + 1}.jpg`
);
const womenImages = Array.from(
  { length: IMAGES_PER_GENDER },
  (_, i) => `${PEOPLE_URL}/women/woman_${i + 1}.jpg`
);

// Create new array concatenating men & women images
const peopleImages = [...menImages, ...womenImages];

// Create name arrays for men and women
const menNames = ["Antonio", "José", "Manuel", "Juan", "Francisco", "David", "Javier", "Carlos", "Miguel", "Jesús", "Alejandro", "Pedro", "Pablo", "Ángel", "Sergio", "Rafa", "Andrés", "Alberto", "Enrique", "Rubén", "Fernando", "Luis", "Daniel", "Marcos"];
const womenNames = ["María", "Carmen", "Ana", "Laura", "Isabel", "Marta", "Sara", "Elena", "Lucía", "Patricia", "Teresa", "Pilar", "Silvia", "Rosa", "Beatriz", "Claudia", "Raquel", "Sonia", "Nuria", "Alicia", "Irene", "Andrea", "Cristina", "Julia"];

// Create suffle function - suffles array index randomly
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Suffle all arrays (images and names)
shuffle(menImages);
shuffle(womenImages);
shuffle(menNames);
shuffle(womenNames);

// Create object array for men and women {img, name} 
const menImgsNames = menImages.map((img, index) => {
  return {
    img: img,
    name: menNames[index],
  };
});

const womenImgsNames = womenImages.map((img, index) => {
  return {
    img: img,
    name: womenNames[index],
  };
});

// Create new array concatenating men & women images & names
const peopleImgsNames = [...menImgsNames, ...womenImgsNames];

// suffle people imgs & names array randomly
shuffle(peopleImgsNames);


/**************************************************************************************/

// add correct_response to objects array
correctObjects.forEach((object) => object.correct_response = correctKey);

// create objects images array to preload them
const objectsImgs = correctObjects.map((object) => object.img);

// Create function to get a new array with a random slice from other array
function getRandomSlice(array, sliceSize) {
  const arraySlice = [];

  for (let i = 0; i < sliceSize; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomPerson = array.splice(randomIndex, 1)[0];
    arraySlice.push(randomPerson);
  }

  return arraySlice;
}

// Define slice size & create men & women array copy not to alter the original ones
const SLICE_SIZE = 24;
const menCopy = [...menImgsNames];
const womenCopy = [...womenImgsNames];

// Create men & women slice array
const menSlice = getRandomSlice(menCopy, SLICE_SIZE);
const womenSlice = getRandomSlice(womenCopy, SLICE_SIZE);

// Create correct objects slice array
const correctObjectsSlice = getRandomSlice(correctObjects, SLICE_SIZE)

// Add correct objects to men & women
const menCorrectObjects = correctObjectsSlice.slice(0, SLICE_SIZE / 2);
const womenCorrectObjects = correctObjectsSlice.slice(SLICE_SIZE / 2, correctObjectsSlice.length);

menCorrectObjects.forEach((object, index) => menSlice[index].object = object);
womenCorrectObjects.forEach((object, index) => womenSlice[index].object = object);

// Create incorrect objects slice (first is just sentences, and then random images are added)
const incorrectObjectsSlice = getRandomSlice(incorrectObjects, SLICE_SIZE);

const incorrectObjectsWithImg = incorrectObjectsSlice.map((objectSentence) => {
  const img = getRandomSlice(correctObjects, 1)[0].img;

  return {
    sentence: objectSentence,
    img: img,
    correct_response: incorrectKey
  }
})

// Add incorrect objects to men & women
const menIncorrectObjects = incorrectObjectsWithImg.slice(0, SLICE_SIZE / 2);
const womenIncorrectObjects = incorrectObjectsWithImg.slice(SLICE_SIZE / 2, incorrectObjectsSlice.length);

menIncorrectObjects.forEach((object, index) => menSlice[menSlice.length - 1 - index].object = object);
womenIncorrectObjects.forEach((object, index) => womenSlice[womenSlice.length - 1 - index].object = object);

// Create people slice array concatenating men & women slice arrays
const peopleSlice = [...menSlice, ...womenSlice];

// Shuffle people slice array
shuffle(peopleSlice);


/**************************************************************************************/

const NEW_PEOPLE_URL =
  "https://raw.githubusercontent.com/saramff/face-images-spanish/refs/heads/master/new-faces/newface_";
const NEW_IMAGES = 48;

// Create pictures array for new images
const newImages = Array.from(
  { length: NEW_IMAGES },
  (_, i) => {
    return {
      img: `${NEW_PEOPLE_URL}${i + 1}.jpg`,
      correct_response: incorrectKey
    }
  }
);

const peopleSliceImgs = peopleSlice.map((person) => {
  return {
    img: person.img,
    correct_response: correctKey
  }
})

const recognitionFaces = [...newImages, ...peopleSliceImgs];

shuffle(recognitionFaces);

// create faces images array to preload them
const recognitionFacesImgs = recognitionFaces.map((face) => face.img);

/**************************************************************************************/

const NAMES_PER_GENDER = 24

const newMenNames = ["Víctor", "Álvaro", "Jorge", "Iván", "Guillermo", "Adrián", "Diego", "Óscar", "Samuel", "Cristian", "Jaime", "Hugo", "Tomás", "Ignacio", "Nicolás", "Mario", "Lorenzo", "Rodrigo", "Esteban", "Gonzalo", "Mateo", "Martín", "Joaquín", "Julián"];
const newWomenNames = ["Alba", "María José", "Noelia", "Belén", "Carolina", "Inés", "Ángela", "Manuela", "Lourdes", "Eugenia", "Paula", "Verónica", "Rocío", "Mercedes", "Esther", "Gema", "Ainhoa", "Lidia", "Vanesa", "Miriam", "Eva", "Lola", "Antonia", "Marina"];
const newNames = [...newMenNames, ...newWomenNames];

const newNamesWithResponse = newNames.map((name) => {
  return {
    name: name,
    correct_response: correctKey
  }
})

const menNamesSlice = getRandomSlice([...menNames], NAMES_PER_GENDER);
const womenNamesSlice = getRandomSlice([...womenNames], NAMES_PER_GENDER);
const menAndWomenSliceNames = [...menNamesSlice, ...womenNamesSlice];

const menAndWomenNamesWithResponse = menAndWomenSliceNames.map((name) => {
  return {
    name: name,
    correct_response: incorrectKey
  }
})

const allNames = [...newNamesWithResponse, ...menAndWomenNamesWithResponse];
shuffle(allNames);


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
  images: peopleImages,
};
timeline.push(preload);

/* Preload objects */
let preloadObjects = {
  type: jsPsychPreload,
  images: objectsImgs,
};
timeline.push(preloadObjects);

/* Preload new faces */
let preloadNewFaces = {
  type: jsPsychPreload,
  images: recognitionFacesImgs,
};
timeline.push(preloadNewFaces);

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


// /**************************************************************************************/

/* Instructions trial */
let instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>En este experimento se mostrarán automáticamente diferentes rostros uno tras otro.</p>  
    <p>Por favor, preste mucha atención a cada rostro y al nombre que lo acompaña.</p>
    <p>Los rostros aparecerán automáticamente y no necesita hacer nada más que estar atento.</p>
    <p>Cuando esté preparado, pulse la barra espaciadora para empezar.</p>
  `,
  choices: [' '],
  post_trial_gap: 500,
};
timeline.push(instructions);

/* Create stimuli array for image presentation */
let test_stimuli = peopleImgsNames.map((person) => {
  return {
    stimulus: `
      <img class="person-img" src="${person.img}">
      <p class="person-name">${person.name}</p>
    `,
  };
});

/* Image presentation trial */
let test = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: "NO_KEYS", // Prevent key press
  trial_duration: 1000, // Display each image for 1 second
  post_trial_gap: 500
};

/* Test procedure: fixation + image presentation */
let test_procedure = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli,
  randomize_order: true, // Randomize image order
};
timeline.push(test_procedure);


/**************************************************************************************/

/* Instructions for recognition phase */
let instructionsrecognition = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>Ahora verá una serie de rostros junto con un objeto y una frase asociada.</p>
    <p>Presione '${incorrectKey.toUpperCase()}', si la frase es falsa, y '${correctKey.toUpperCase()}', si la frase es verdadera.</p>
    </p></p>
    <p>Como en este ejemplo: si en la pantalla aparecen la cara de Ana y un oso de peluche, y la frase dice 'Ana tiene un bolígrafo', presione '${incorrectKey.toUpperCase()}' (NO).</p>
    <br />
    <div>
      <img src='https://raw.githubusercontent.com/saramff/face-recognition-images/refs/heads/master/Example/Ana.jpg'  class="img-instructions" />
      <img src='https://raw.githubusercontent.com/saramff/face-recognition-images/refs/heads/master/Example/Teddy.jpg' class="img-instructions" />
    </div>
    <br />
    <p>Le recomendamos colocar los dedos sobre las teclas ${correctKey.toUpperCase()} y ${incorrectKey.toUpperCase()} durante la tarea para no olvidarlas.</p>
    <p>Cuando esté preparado, pulse la barra espaciadora para empezar.</p>
   `,
  choices: [' '],
  post_trial_gap: 500,
};
timeline.push(instructionsrecognition);

/* Create stimuli array for object presentation */
let test_objects_stimuli = peopleSlice.map((person) => {
  return {
    noFaceStimulus: `
      <p class="person-name">Es ${person.name}.</p>
      <div class="imgs-container">
        <img class="person-img" src="${person.img}">
      </div>
    `,
    stimulus: `
    <p class="person-name">Es ${person.name}.</p>
    <div class="imgs-container">
      <img class="person-img" src="${person.img}">
      <img class="object-img" src="${person.object.img}">
    </div>
    <p class="person-name">${person.name} ${person.object.sentence}</p>
    <div class="keys">
      <p class="${correctKey === 'a' ? 'left' : 'right'}">SÍ</p>
      <p class="${correctKey === 'a' ? 'right' : 'left'}">NO</p>
    </div>
  `,
    correct_response: person.object.correct_response
  };
});

/* Only Face trial */
let onlyFace = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable("noFaceStimulus"),
  choices: "NO_KEYS", // Prevent key press
  trial_duration: 2000, // Only Face duration
};

/* Object presentation trial */
let testObjects = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: ['a', 'l'],
  data: {
    task: "response object presentation",
    correct_response: jsPsych.timelineVariable("correct_response"),
  },
  on_finish: function (data) {
    data.correct = jsPsych.pluginAPI.compareKeys(
      data.response,
      data.correct_response
    );
    data.correct_response_meaning = correctKey === data.correct_response ? "YES" : "NO";
  },
};

/* Test procedure: fixation + object presentation */
let test_objects_procedure = {
  timeline: [fixation, onlyFace, testObjects],
  timeline_variables: test_objects_stimuli,
  randomize_order: true, // Randomize object order
};
timeline.push(test_objects_procedure);


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
  trial_duration: 1200000, 
};
timeline.push(tetris);


/**************************************************************************************/


/* Instructions for faces presentation */
let instructionsFacesPresentation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>Ahora realizará la siguiente tarea:</p>
    <p>Si ha visto antes la cara, pulse la tecla '${correctKey.toUpperCase()}' (SÍ).</p>
    <p>Si no ha visto antes la cara, pulse la tecla '${incorrectKey.toUpperCase()}' (NO).</p>
    <p>De nuevo, le recomendamos colocar los dedos sobre las teclas ${correctKey.toUpperCase()} y ${incorrectKey.toUpperCase()} durante la tarea para no olvidarlas.</p>
    <p>Pulse la barra espaciadora para comenzar.</p>
  `,
  choices: [' '],
  post_trial_gap: 500,
};
timeline.push(instructionsFacesPresentation);

/* Create stimuli array for faces presentation */
let face_recognition_stimuli = recognitionFaces.map((face) => {
  return {
    stimulus: `
      <div class="imgs-container">
        <img class="person-img" src="${face.img}">
      </div>
      <div class="keys">
        <p class="${correctKey === 'a' ? 'left' : 'right'}">SÍ</p>
        <p class="${correctKey === 'a' ? 'right' : 'left'}">NO</p>
      </div>
    `,
    correct_response: face.correct_response
  };
});

/* Faces presentation trial */
let testFaces = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: ['a', 'l'],
  data: {
    task: "response faces test",
    correct_response: jsPsych.timelineVariable("correct_response"),
  },
  on_finish: function (data) {
    data.correct = jsPsych.pluginAPI.compareKeys(
      data.response,
      data.correct_response
    );
    data.correct_response_meaning = correctKey === data.correct_response ? "YES" : "NO";
  },
};

/* Test procedure: fixation + faces presentation */
let test_faces_procedure = {
  timeline: [fixation, testFaces],
  timeline_variables: face_recognition_stimuli,
  randomize_order: true, // Randomize faces order
};
timeline.push(test_faces_procedure);


// /**************************************************************************************/


const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

const TABLE_NAME = "experimento_caras_atributos";

async function saveData(data) {
  console.log(data);
  const { error } = await supabase.from(TABLE_NAME).insert({ data });

  return { error };
}

const saveDataBlock = {
  type: jsPsychCallFunction,
  func: function() {
    saveData(jsPsych.data.get())
  },
  timing_post_trial: 200
}

timeline.push(saveDataBlock);



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