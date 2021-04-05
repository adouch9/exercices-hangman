
   //-----------------------------------Import API d'outils de travail (Package.json)-------------------------------------------

   const fs             = require('fs')                                  
const { randomInt }     = require('crypto')
const readlineSync      = require('readline-sync')
const chalk             = require('chalk');
const { hangman }       = require('./hangman.js')

   //-----------------------------------Déclaration des variables assigner au jeux----------------------------------------------

const dictionnaire = fs.readFileSync('./dictionnaire.txt', 'utf-8')     //Import du dictionnaire.txt dans ma const dictionnaire
const transformStringInArray = dictionnaire.split('\n')                // transform dictionnaire de string en tableaux
// console.log(transformStringInArray)
const n = randomInt(0, transformStringInArray.length)                 // variable assigner pour utiliser le random pour l'array du dictionnaire
const motSecret = Array(transformStringInArray[n].length).fill('_')   // Tableaux pour récuperer les lettres du mot secret remplacer par les _
let count = 7
//console.log(chalk.greenBright(`BullMarket Prédiction: ${chalk.yellow(transformStringInArray[n])} pour la fin de l'anner 2021`))        // test d'afichage du programme
console.log(chalk.greenBright(`Tentez de deviner le mot secret en entrant des lettres une par une au clavier. Ne gaspillez pas vos coups, car si trop de vos choix sont erronés vous tuerez le pendu et vous perdrez la partie.`))
   
//------------------------------------Programme du jeux-----------------------------------------------------------------------

while (motSecret.includes('_')) {
  console.log(motSecret.join(" "))
  let question = readlineSync.question(chalk.yellow(`Qu'elle est votre lettre?`))

  if(transformStringInArray[n].includes(question)){
    for (let i = 0; i < motSecret.length; i++) {
  if(transformStringInArray[n][i] === question){
   motSecret[i] = question
     }
   }
  }
  if(!transformStringInArray[n].includes(question)){
    count --
    console.log(chalk.redBright(`Cette lettre ${question} est incorrect il vous reste ${count} chances ${hangman[count]}`))
  }
  if (!transformStringInArray[n].includes(question) && count <= 0){
    console.log(chalk.blueBright(`Vous avez perdu ! Le mot secret était  ${chalk.yellow(transformStringInArray[n])}`))
    process.exit(1)

  }
  if(motSecret === transformStringInArray[n]){
    console.log('bien jouer')
  }
}