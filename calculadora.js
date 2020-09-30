'use strict'

var args = process.argv.slice(2);

var num1 = parseFloat(args[0]);
var num2 = parseFloat(args[1]);

// alt + 96 = ``

var plantilla = `
La suma es: ${num1 + num2}
La resta es: ${num1 - num2}
La multiplicación es: ${num1 * num2}
La división es: ${num1 / num2}
`;

console.log(plantilla);

console.log('Hola Mundo con NodeJS');
