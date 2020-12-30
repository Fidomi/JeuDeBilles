/*  NOTIONS A UTILISER DANS LE PROJET

// Toggle entre fond rouge et pas de fond
    // Donne aléatoirement une valeur du tableau
        var tab = [10, 20, 30, 50];
        let k = document.getElementById("keyc");
        const ESPACE = 32;
        document.addEventListener("keyup", function(e){
            console.log(e.keyCode);
            if (e.keyCode == ESPACE){
                k.classList.toggle('d-none');
                console.log(tab[Math.floor(Math.random()*tab.length)]);
            }
        });

    //POUR EXECUTER QQCH AU CHARGEMENT DU DOCUMENT
        document.addEventListener('DOMContentLoaded', function(e){
            console.log(e.target);
        })

        addEventListener("click",function(e){
                console.log(e.target);});


        //POUR DESACTIVER DES BOUTONS
        document.getElementById('ajouter').addEventListener("blur", function(){console.log("blur")});
        document.getElementById('effacer').disabled=false;
        document.getElementById('effacer').addEventListener("keyup", function(){ocument.getElementById('ajouter').disabled=false;});
        let btn = document.getElementsByClassName('bouton');
        for (let i=0; i<btn; i++){
            btn[i].addEventListener("click",function(e){
                console.log(e.target);
            })

        }

*/

/*DECLARATION DES VARIABLES*/

//Variables pour l'initialisation du jeu
var letsPlay = document.getElementById("play");
var messageJ = document.getElementById("messageJoueur");
var messageB = document.getElementById("messageBilles");
var tabJeu = [];

//Variables pour le choix du nombre de joueurs
var unJoueur = document.getElementById("un-joueur");
var deuxJoueurs = document.getElementById("deux-joueurs");
var circle = document.getElementById("circle");

//Variables pour l'enregistrement des joueurs
var affichage_billes = document.getElementById("billes");
var joueurUnOK = document.getElementById("un-joueur-ok");
var joueurDeuxOK = document.getElementById("deux-joueurs-ok");
const activeJoueur1 = document.getElementById("un-joueur");
const activeJoueur2 = document.getElementById("deux-joueurs");

//Variables pour l'enregistrement des joueurs
var nomJoueurUn = document.getElementById("nomJoueurUn");
var nomJoueurDeux = document.getElementById("nomJoueurDeux");
var avatarJoueurUn  = document.getElementById("avatarJoueurUn");
var avatarJoueurDeux  = document.getElementById("avatarJoueurDeux");



/*FONCTIONS OUTILS*/

function toggle(target, cclass) {
  document.getElementById(target).classList.toggle(cclass);
}

/*INITIALISATION DU JEU : Choisir le nombre de joueurs et le nombre de billes*/
/*INITIALISATION DU JEU : Choisir le nombre de joueurs et le nombre de billes*/

toggle("lancement_jeu", "hide");
toggle("regles", "hide");
toggle("menu-jeu", "hide");

/***********LET'S PLAY**********************/
letsPlay.addEventListener("click", function (event) {
  event.preventDefault();
  /*On efface le tableau de jeu précédent
        et les messages d'erreur*/
  tabJeu = [];
  console.log(tabJeu);
  messageJ.innerHTML = "";
  messageB.innerHTML = "";

  /*On checke les nouvelles données joueur et billes
        et si c'est bon on les ajoute au tableau de jeu*/
  initJeu();
  console.log(tabJeu);

  /*Si les données de jeu sont correctement entrées,
        on affiche la page d'inscription*/
  if (tabJeu[0] && tabJeu[2] && tabJeu[2]) {
    var tabActiveJoueur1 = affichageInscription2();

    //On enregistre les infos des joueurs
    joueurUnOK.addEventListener("click", function (e) {
      e.preventDefault();
      validerInscriptionJoueur1(tabActiveJoueur1);
    });

    joueurDeuxOK.addEventListener("click", function (e) {
      e.preventDefault();
      validerInscriptionJoueur2();
      partie2Joueurs();
    });

    

    //Fin affichage du jeu
  }
  //Fin algorithme de jeu
});

/*********Fonction pour initialiser le tableau de jeu***********/
/*********Fonction pour initialiser le tableau de jeu***********/
function initJeu() {
  const joueurs = document.querySelectorAll("input[name='nb_joueurs']");
  var billes = document.querySelector("input[name='nombre-billes']");
  var nbBilles = billes.value;
  var nom, personnage;

  if (joueurs[0].checked) {
    tabJeu[0] = { name: nom, avatar: personnage };
    tabJeu[1] = 0;
  } else if (joueurs[1].checked) {
    tabJeu[0] = { name: nom, avatar: personnage };
    tabJeu[1] = { name: nom, avatar: personnage };
  } else {
    messageJ.innerText = "Choisir 1 ou 2 joueurs!";
  }

  if (!isNaN(nbBilles) && nbBilles >= 20 && nbBilles <= 100) {
    tabJeu[2] = nbBilles;
  } else {
    messageB.innerText = "Choisir un nombre de billes entre 20 et 100!";
  }

  return tabJeu;
}

/*********Fonction pour afficher la page d'inscription : 2 joueurs***********/
/*********Fonction pour afficher la page d'inscription : 2 joueurs***********/
function affichageInscription2() {
  toggle("circle", "hide");
  toggle("regles", "hide");
  toggle("menu-jeu-02", "hide");
  toggle("menu-jeu", "hide");
  toggle("enregistrement", "hide");

  if (tabJeu[1] == 0) {
    toggle("un-joueur", "hide");
    toggle("un-joueur-ok", "hide");
  } else {
    toggle("deux-joueurs", "hide");
    toggle("deux-joueurs-ok", "hide");
    toggle("un-joueur", "hide");
    toggle("un-joueur-ok", "hide");
  }
  //Afficher le nombre de billes du jeu dans le compteur
  affichage_billes.innerText = tabJeu[2];
  //Activer inscription joueur 1
  var tabActiveJoueur1 = activeJoueur1.querySelectorAll("[disabled]");
  for (let i = 0; i < tabActiveJoueur1.length; i++) {
    tabActiveJoueur1[i].disabled = false;
  }
    return tabActiveJoueur1;

}

/*********Fonction pour valider l'inscription du joueur 1***********/
/*********Fonction pour valider l'inscription du joueur 1***********/
function validerInscriptionJoueur1(tabActiveJoueur1) {
  var tabActiveJoueur1 = tabActiveJoueur1;
  var tabActiveJoueur2 = activeJoueur2.querySelectorAll("[disabled]");
  //On vérifie que les infos du joueur 1 sont ok
  var name1 = document.getElementById("name1");
  var listeAvatar1 = document.querySelectorAll('input[name="avatar1"]');
  var avatarExiste = false;
  for (let i = 0; i < listeAvatar1.length; i++) {
    if (listeAvatar1[i].checked) {
      var avatarExiste = true;
      var avatar1 = listeAvatar1[i].value;
    }
  }
  if (name1.value && avatarExiste) {
    tabJeu[0] = { name: name1.value, avatar: avatar1 };
    for (let i= 0; i < tabActiveJoueur1.length; i++) {
      tabActiveJoueur1[i].disabled = true;
      tabActiveJoueur2[i].disabled = false;
    }
  }
}

/*********Fonction pour valider l'inscription du joueur 2***********/
/*********Fonction pour valider l'inscription du joueur 2***********/
function validerInscriptionJoueur2() {
  //On vérifie que les infos du joueur 2 sont ok
  var name2 = document.getElementById("name2").value;
  var listeAvatar2 = document.querySelectorAll('input[name="avatar2"]');
  var avatarExiste = false;
  for (let i = 0; i < listeAvatar2.length; i++) {
    if (listeAvatar2[i].checked) {
      var avatarExiste = true;
      var avatar2 = listeAvatar2[i].value;
    }
  }
  if (name2 && avatarExiste) {
    tabJeu[1] = { name: name2, avatar: avatar2 };
    toggle("enregistrement", "hide");
  }
}

/*********Fonction pour lancer la partie de jeu à 2 joueurs***********/
/*********Fonction pour lancer la partie de jeu à 2 jouers***********/
function partie2Joueurs() {
  //Affiche la partie de jeu
  toggle("partie2joueurs", "hide");
  toggle("lancement_jeu","hide");
 //Entre les données des deux joueurs
  nomJoueurUn.innerText = tabJeu[0].name;
  nomJoueurDeux.innerText = tabJeu[1].name;
  avatarJoueurUn.src = 'images/' + tabJeu[0].avatar +'.png';
  avatarJoueurDeux.src = 'images/' + tabJeu[1].avatar +'.png';

 // On remplit le tableau de billes
 //On va cherche le tableau myTable dans la page html
 var table = document.getElementById("myTable");
 //Déterminer le nombre de lignes à 10 billes et le reste
 var nbBilles = parseInt(tabJeu[2]);
 var nbRows = Math.floor(nbBilles/10);
 var nbBillesRestantes = nbBilles%10;
 var tabBilles=[];
 console.log(tabBilles);
 console.log(nbBilles);

 //On crée un tableau avec toutes les billes:
 for (let i=0; i<nbBilles; i++){
   tabBilles.push(i);
 }

 console.log(tabBilles);

// On crée un array avec des lignes à 10 billes
//  var tabBilles=[];
//  for (let i=0, i<nbBilles, i++){
//   tabBilles.push(i);
//  }
//  console.log(tabBilles);


  // var row = table.insertRow(i);
  //   for (let j=0, j<10, j++){
  //     var cell[j]=row.insertCell(j);
  //   }
 
//  var row = table.insertRow(0);
//  //S'il reste des billes on les met sur une dernière ligne

// // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
// var cell1 = row.insertCell(0);
// var cell2 = row.insertCell(1);

// // Add some text to the new cells:
// cell1.innerHTML = "NEW CELL1";
// cell2.innerHTML = "NEW CELL2";



  
}
