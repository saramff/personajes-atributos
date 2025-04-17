const IMG_URL =
  "https://raw.githubusercontent.com/saramff/face-recognition-images/refs/heads/master/objects/";

export const correctObjects = [
  {
    sentence: "tiene una hucha.", //"has a piggy bank.",
    img: `${IMG_URL}piggy-bank.jpg`,
    correct_response: "a"
  },
  {
    sentence: "tiene una papelera.", //"has a trash can.",
    img: `${IMG_URL}trash-can.jpg`,
    correct_response: "a"
  },
  {
    sentence: "tiene una cuerda.", //"has a rope.",
    img: `${IMG_URL}rope.jpg`,
    correct_response: "a"
  },
  {
    sentence: "tiene una llave.", //"has a key.",
    img: `${IMG_URL}key.jpg`,
    correct_response: "a"
  },
  {
    sentence: "tiene un paraguas.", //"has an umbrella.",
    img: `${IMG_URL}umbrella.jpg`,
    correct_response: "a"
  },
  {
    sentence: "tiene unas gafas.", //"has glasses.",
    img: `${IMG_URL}glasses.jpg`,
    correct_response: "a"
  },
  {
    sentence: "tiene un plátano.", //has a banana.",
    img: `${IMG_URL}banana.jpg`,
    correct_response: "a"
  },
  {
    sentence: "tiene una calculadora.", //"has a calculator.",
    img: `${IMG_URL}calculator.jpg`,
    correct_response: "a"
  },
  {
    sentence: "tiene unas tijeras.", //"has scissors.",
    img: `${IMG_URL}scissors.jpg`,
    correct_response: "a"
  },
  {
    sentence: "tiene un cepillo.", //"has a hairbrush.",
    img: `${IMG_URL}hairbrush.jpg`,
    correct_response: "a"
  },
  {
    sentence: "tiene una lupa.", 
    img: `${IMG_URL}magnifying-glass.jpg`, 
    correct_response: "a"
  },
  {
    sentence: "tiene unas botas.", //"has some boots.",
    img: `${IMG_URL}boots.jpg`,
    correct_response: "a"
  },
  { 
    sentence: "tiene una guitarra.", //"has a guitar.",
    img: `${IMG_URL}guitar.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene miel.", //"has honey.", 
    img: `${IMG_URL}honey.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene un micrófono.", //has a microphone.", 
    img: `${IMG_URL}microphone.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene un martillo.", //has a hammer.", 
    img: `${IMG_URL}hammer.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene leche.", //has milk.", 
    img: `${IMG_URL}milk.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene un huevo.", //has an egg.", 
    img: `${IMG_URL}egg.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene un perro.", //has a dog.", 
    img: `${IMG_URL}dog.jpg`, 
    correct_response: "a" },
  { 
    sentence: "tiene una naranja.", //has an orange.", 
    img: `${IMG_URL}orange.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene pan.", //has bread.", 
    img: `${IMG_URL}bread.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene una bicicleta.", //has a bicycle.", 
    img: `${IMG_URL}bicycle.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene café.", //has coffee.", 
    img: `${IMG_URL}coffee.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene un globo.", //has a balloon.", 
    img: `${IMG_URL}balloon.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene una pizza.", //has a pizza.", 
    img: `${IMG_URL}pizza.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene una piña.", //has a pineapple.", 
    img: `${IMG_URL}pineapple.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene una pantalla.", //has a screen.", 
    img: `${IMG_URL}screen.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene una pelota.", //has a ball.", 
    img: `${IMG_URL}ball.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene una mariposa.", //has a butterfly.", 
    img: `${IMG_URL}butterfly.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene chocolate.", //has chocolate.", 
    img: `${IMG_URL}chocolate.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene una moneda.", //has a coin.", 
    img: `${IMG_URL}coin.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene un lápiz.", //has a pencil.", 
    img: `${IMG_URL}pencil.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene una silla.", //has a chair.", 
    img: `${IMG_URL}chair.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene un cinturón.", //has a belt.", 
    img: `${IMG_URL}belt.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene una cuchara.", //has a spoon.", 
    img: `${IMG_URL}spoon.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene un sombrero.", //has a hat.", 
    img: `${IMG_URL}hat.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene queso.", //has cheese.", 
    img: `${IMG_URL}cheese.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene una maceta.", //has a flowerpot.", 
    img: `${IMG_URL}flowerpot.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene un batido.", //has a milkshake.", 
    img: `${IMG_URL}milkshake.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene una flor.", //has a flower.", 
    img: `${IMG_URL}flower.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene un reloj de pulsera.", //has a watch.", 
    img: `${IMG_URL}watch.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene un tomate.", //has a tomato.", 
    img: `${IMG_URL}tomato.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene una calabaza.", //has a pumpkin.", 
    img: `${IMG_URL}pumpkin.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene un dado.", //has a dice.", 
    img: `${IMG_URL}dice.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene una regadera.", //has a watering can.", 
    img: `${IMG_URL}watering-can.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene una libreta.", //has a notebook.", 
    img: `${IMG_URL}notebook.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene una manzana.", //has an apple.", 
    img: `${IMG_URL}apple.jpg`, 
    correct_response: "a" 
  },
  { 
    sentence: "tiene una regla.", //has a ruler.", 
    img: `${IMG_URL}ruler.jpg`, 
    correct_response: "a" 
  },
];

export const incorrectObjects = [
  "tiene una lámpara.",
  "tiene una alfombra.",
  "tiene una nevera.",
  "tiene una sartén.",
  "tiene una almohada.",
  "tiene una jaula.",
  "tiene una escalera.",
  "tiene un bastón.",
  "tiene una botella.",
  "tiene un ventilador.",
  "tiene una maleta.",
  "tiene una impresora.",
  "tiene una cartera.",
  "tiene una linterna.",
  "tiene una corbata.",
  "tiene una plancha.",
  "tiene un casco.",
  "tiene una mochila.",
  "tiene un espejo.",
  "tiene una grapadora.",
  "tiene un candado.",
  "tiene una escoba.",
  "tiene un coche.",
  "tiene una pala.",
  "tiene un mapa.",
];
