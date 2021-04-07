
   //-----------------------------------Import API d'outils de travail (Package.json)-------------------------------------------

const fs             = require('fs')                                  
const { randomInt }     = require('crypto')
const readlineSync      = require('readline-sync')
const chalk             = require('chalk');
const { hangman }       = require('./hangman.js')
const { title }       = require('./intro.js')
const { header }       = require('./header.js')

   //-----------------------------------Déclaration des variables assigner au jeux----------------------------------------------

const dictionnaire = fs.readFileSync('./dictionnaire.txt', 'utf-8')     //Import du dictionnaire.txt dans ma const dictionnaire
const transformStringInArray = dictionnaire.split('\n')                // transform dictionnaire de string en tableaux
// console.log(transformStringInArray)
const n = randomInt(0, transformStringInArray.length)                 // variable assigner pour utiliser le random pour l'array du dictionnaire
const motSecret = Array(transformStringInArray[n].length).fill('_')   // Tableaux pour récuperer les lettres du mot secret remplacer par les _
let count = 7
console.log(header)
console.log(chalk.greenBright(`BullMarket Prédiction: ${chalk.yellow(transformStringInArray[n])} pour la fin de l'anner 2021`))        // test d'afichage du programme
 console.log(chalk.greenBright(title))
  
//------------------------------------Programme du jeux-----------------------------------------------------------------------



while (motSecret.includes('_')) {
  // console.log(motSecret.join(" "))
  let question = readlineSync.question(chalk.yellow(`Qu'elle est votre lettre: ${motSecret.join(" ")} ? `)).toUpperCase() 
  
if(transformStringInArray[n].includes(question)){
    for (let i = 0; i < motSecret.length; i++) {
       if(transformStringInArray[n][i] === question){
          motSecret[i] = question
   
     }
   }
  } else {
    count --
    console.log(chalk.redBright(`Cette lettre ${question} est incorrect il vous reste ${count} chances ${hangman[count]}`))
 }

if (!transformStringInArray[n].includes(question) && count <= 0){
    console.log(chalk.blueBright(`Vous avez perdu ! Le mot secret était  ${chalk.yellow(transformStringInArray[n])}`))
    process.exit(1)
 }else if(motSecret.join("") === transformStringInArray[n]){
   console.log(`Vous avais Gagner Mot secret: ${chalk.grey(transformStringInArray[n])}`)
 }

}


