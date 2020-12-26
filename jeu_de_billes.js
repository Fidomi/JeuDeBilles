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
var letsPlay = document.getElementById('play');
var messageJ = document.getElementById("messageJoueur");
var messageB = document.getElementById("messageBilles");
var tabJeu=[];

//Variables pour l'enregistrement des joueurs
var unJoueur = document.getElementById("un-joueur");
var deuxJoueurs = document.getElementById("deux-joueurs");
var circle = document.getElementById("circle");

//Variables pour la partie de jeu
var affichage_billes=document.getElementById("billes");


/*FONCTIONS OUTILS*/

function toggle (target, cclass) {
  document.getElementById(target).classList.toggle(cclass);
}





/*INITIALISATION DU JEU : Choisir le nombre de joueurs et le nombre de billes*/
/*INITIALISATION DU JEU : Choisir le nombre de joueurs et le nombre de billes*/

toggle("circle","hide");
toggle("regles","hide");
toggle("menu-jeu","hide");

/***********LET'S PLAY**********************/
letsPlay.addEventListener('click',function(event){
        event.preventDefault();
        /*On efface le tableau de jeu précédent
        et les messages d'erreur*/
        tabJeu=[];
        console.log(tabJeu);
        messageJ.innerHTML="";
        messageB.innerHTML="";

        /*On checke les nouvelles données joueur et billes
        et si c'est bon on les ajoute au tableau de jeu*/
        initJeu();
        console.log(tabJeu);
    
        /*Si les données sont correctement entrées,
        on affiche la page d'inscription*/
        if (tabJeu[0] && tabJeu[2] && tabJeu[2]){
            affichageInscription();
        }
  });



/*********Fonction pour initialiser le tableau de jeu***********/
function initJeu(){
    const joueurs = document.querySelectorAll("input[name='nb_joueurs']");
    var billes = document.querySelector("input[name='nombre-billes']");
    var nbBilles = billes.value;
    var nom,personnage;
    
    if (joueurs[0].checked){
        tabJeu[0] = {name:nom,avatar:personnage};
        tabJeu[1] = 0;
    }
    else if(joueurs[1].checked){
        tabJeu[0] = {name:nom,avatar:personnage};
        tabJeu[1] = {name:nom,avatar:personnage};
    }
    else{
        messageJ.innerText="Choisir 1 ou 2 joueurs!";
    }

    if ((!isNaN(nbBilles)) && nbBilles>=20 && nbBilles<=100){
        tabJeu[2] = nbBilles;
    }
    else{
        messageB.innerText="Choisir un nombre de billes entre 20 et 100!";
    }
    
    return tabJeu;
}




/*********Fonction pour afficher la page d'inscription : 2 joueurs***********/
function affichageInscription(){
  toggle("circle","hide");
  toggle("regles","hide");
  toggle("menu-jeu-02","hide");
  toggle("menu-jeu","hide");
  

  if(tabJeu[1]==0){
    toggle("un-joueur","hide");
    toggle("un-joueur-ok","hide");
  }
  else{
    toggle("deux-joueurs","hide");
    toggle("deux-joueurs-ok","hide");
    toggle("un-joueur","hide");
    toggle("un-joueur-ok","hide");
  }
  //Afficher le nombre de billes du jeu dans le compteur
 affichage_billes.innerText=tabJeu[2];
 //Activer inscription joueur 1
 const activeJoueur1 = document.getElementById('un-joueur');
 var tabActiveJoueur1=activeJoueur1.querySelectorAll("[disabled]");
 for(i=0; i<tabActiveJoueur1.length; i++){
     tabActiveJoueur1[i].disabled=false;
 }
}




