/*DECLARATION DES VARIABLES*/

//Variables pour l'initialisation du jeu
var letsPlay = document.getElementById("play");
var messageJ = document.getElementById("messageJoueur");
var messageB = document.getElementById("messageBilles");
var tabJeu = [];
const joueurs = document.querySelectorAll("input[name='nb_joueurs']");
var nom, personnage;

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

//Variables pour lancement de la partie
var nomJoueurUn = document.getElementById("nomJoueurUn");
var nomJoueurDeux = document.getElementById("nomJoueurDeux");
var avatarJoueurUn  = document.getElementById("avatarJoueurUn");
var avatarJoueurDeux  = document.getElementById("avatarJoueurDeux");
var tableau = document.getElementById("monTableau");

//Variables pour la partie à 2 joueurs
var tabPartie = [];
var pointsJoueur1 = document.getElementById("pointsJoueur1");
var pointsJoueur2 = document.getElementById("pointsJoueur2");
const jouez = document.getElementById("jouez");
var ok2 = false;
var vie1 = 2;
var vie2 = 2;
var currentPlayer = {name:"",avatar:""};
var message = document.getElementById("message");
//Tableau des boutons de jeu
var billes_jouees = document.querySelectorAll("input[name='billes_jouees']");


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
  tabJeu = {};
  tabPartie = [];
  messageJ.innerHTML = "";
  messageB.innerHTML = "";

  /*On checke les nouvelles données joueur et billes
        et si c'est bon on les ajoute au tableau de jeu*/
  initJeu();

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
      if (ok2==true){
        afficherPartie2Joueurs();
        var resultat = partie2Joueurs();   
        }
    });

    

    

    //Fin affichage du jeu
  }
  //Fin algorithme de jeu
});



/*FONCTIONS OUTILS*/
/*FONCTIONS OUTILS*/

function toggle(target, cclass) {
  document.getElementById(target).classList.toggle(cclass);
}

function pointsDeVie(points,myDiv){
  myDiv.innerHTML="";
 for (let i=1; i<=points; i++){
  image = document.createElement('img');
  image.setAttribute("src","images/point-de-vie.png");
  myDiv.appendChild(image);
 }
}

function affichageBilles(){
  tableau.innerHTML="";
  for (let i=1; i<=tabJeu[2]; i++){
    var divBille = document.createElement('div');
    divBille.classList.add('tailleBille');
    divBille.innerHTML="<img src=\"images/bille.png\">";
    tableau.appendChild(divBille);
    }
}

function switchPlayer(currentPlayer){
  if(currentPlayer.name==tabJeu[0].name 
    && currentPlayer.avatar==tabJeu[0].avatar ){

    currentPlayer.name=tabJeu[1].name;
    currentPlayer.avatar=tabJeu[1].avatar
    toggle("tourJoueurUn","opacite");
    toggle("tourJoueurDeux","opacite");
    }
  else if(currentPlayer.name==tabJeu[1].name 
    && currentPlayer.avatar==tabJeu[1].avatar ){
      currentPlayer.name=tabJeu[0].name;
      currentPlayer.avatar=tabJeu[0].avatar;
    toggle("tourJoueurUn","opacite");
    toggle("tourJoueurDeux","opacite");
    // tabJeu[3].currentName=currentPlayer.name;
    // tabJeu[3].currentAvatar=currentPlayer.avatar;
    // console.log("On affiche dans la fonction switch player");
    // console.log(currentPlayer.name);
  }
  else{
    console.log("swicthplayer ne marche pas");
  }
  return currentPlayer;
  
}


/*********Fonction pour initialiser le tableau de jeu***********/
/*********Fonction pour initialiser le tableau de jeu***********/
function initJeu() {
  var billes = document.querySelector("input[name='nombre-billes']");
  var nbBilles = billes.value;
    
  if (joueurs[0].checked) {
    tabJeu[0] = { name: nom, avatar: personnage };
    tabJeu[1] = 0;
  } else if (joueurs[1].checked) {
    tabJeu[0] = { name: nom, avatar: personnage };
    tabJeu[1] = { name: nom, avatar: personnage };
  } else {
    messageJ.innerText = "Choisir 1 ou 2 joueurs!";
  }

  if (!isNaN(nbBilles) && nbBilles >= 11 && nbBilles <= 25) {
    tabJeu[2] = nbBilles;
  } else {
    messageB.innerText = "Choisir un nombre de billes entre 11 et 25!";
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
    if (name1.value.length>3 && name1.value.length<10){
      tabJeu[0] = { name: name1.value, avatar: avatar1 };
      for (let i= 0; i < tabActiveJoueur1.length; i++) {
        tabActiveJoueur1[i].disabled = true;
        tabActiveJoueur2[i].disabled = false;
        currentPlayer.name=tabJeu[0].name;
        currentPlayer.avatar=tabJeu[0].avatar;  
      }
    }
    else{
      let j = document.querySelector("input[id='name1']");
      j.value="";
      j.placeholder="Entre 3 et 9 lettres";
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
    if (name2.length>3 && name2.length<10){
    tabJeu[1] = { name: name2, avatar: avatar2 };
    ok2 = true;
    toggle("enregistrement", "hide");
    return ok2;
    }
    else{
      {
        let k = document.querySelector("input[id='name2']");
        k.value="";
        k.placeholder="Entre 3 et 9 lettres";
      }
    }
  }
}

/*********Fonction pour afficher la partie de jeu à 2 joueurs***********/
/*********Fonction pour afficher la partie de jeu à 2 jouers***********/
function afficherPartie2Joueurs(){
  //Affiche la partie de jeu
  toggle("lancement_jeu","hide");
  toggle("partie2joueurs", "hide");
  //Entrer le nom des deux joueurs
  nomJoueurUn.innerText = tabJeu[0].name;
  nomJoueurDeux.innerText = tabJeu[1].name;
  //Afficher les avatars des deux joueurs
  avatarJoueurUn.src = 'images/' + tabJeu[0].avatar +'.png';
  avatarJoueurDeux.src = 'images/' + tabJeu[1].avatar +'.png';
  //Afficher les points de vie des deux joueurs
  pointsDeVie(vie1,pointsJoueur1);
  pointsDeVie(vie2,pointsJoueur2);
  //On affiche les billes en flexbox sur la page html
  affichageBilles();
  //Placer les avatars de chaque joueur de part et d'autre des boutons 
  var tourJoueurUn = document.getElementById("tourJoueurUn");
  tourJoueurUn.src = 'images/' + tabJeu[0].avatar +'.png';
  var tourJoueurDeux = document.getElementById("tourJoueurDeux");
  tourJoueurDeux.src = 'images/' + tabJeu[1].avatar +'.png';
  toggle("tourJoueurUn","opacite");
  // tabJeu[3].currentName=tabJeu[0].name;
  // tabJeu[3].currentAvatar=tabJeu[0].avatar;
  // message.innerHTML = "C'est à " + tabJeu[3].currentName + " de jouer!";
}


/*****************Algorithme du jeu à 2 joueurs***********************/
/*****************Algorithme du jeu à 2 joueurs**********************/
function partie2Joueurs(){
    message.innerHTML += "C'est à " + currentPlayer.name + " de jouer!";
    billes_jouees.forEach((bouton) => {
    bouton.addEventListener("click", insertToken);
    });
    }

function insertToken(event){
   //On récupère le nb de billes choisi par le joueur courant
  var choix = event.target.value;
  tabPartie.push(choix);
  message.innerHTML="";
  
  if (tabJeu[2]-choix>1    
      && vie1!=0 
      && vie2!=0){
      
    if (tabPartie[tabPartie.length-2]!=tabPartie[tabPartie.length-1]){
      //On retranche le nb de billes au total
      message.innerHTML = currentPlayer.name + " a pris " + choix + " billes.";
      tabJeu[2] = tabJeu[2] - choix;
      //Afficher le nombre de billes du jeu dans le compteur
      affichage_billes.innerText = tabJeu[2];
      //On met à jour l'affichage du tableau de billes
      affichageBilles();
      //On passe au joueur suivant
      switchPlayer(currentPlayer);
      message.innerHTML += "C'est à " + currentPlayer.name + " de jouer!";
    }
    else if(tabPartie[tabPartie.length-2]==tabPartie[tabPartie.length-1] 
            && tabPartie.length%2!=0){
      //On enlève un point de vie au joueur 1
      vie1--;
      if(vie1!=0){
        //On met à jour le tableau de points de vie du joeur 1
        tabPartie[tabPartie.length-1]="erreur J1";
        pointsDeVie(vie1,pointsJoueur1);
        message.innerHTML = tabJeu[0].name + " , vous avez fait une erreur! Vous perdez un point de vie!";
        //On passe au joueur suivant
        switchPlayer(currentPlayer);
        message.innerHTML += "C'est à " + currentPlayer.name + " de jouer!";
      }
      else{
        var gagnant = tabJeu[1];
        affichageBilles();
        message.innerHTML="Bravo! "+tabJeu[1].name+" a gagné! Poil au nez!";
        findePartie(gagnant);
        return gagnant;
      }
    }
    else{
      //On enlève un point de vie au joueur 2
      vie2--;
      if(vie2!=0){
        //On met à jour le tableau de points de vie du joeur 1
        tabPartie[tabPartie.length-1]="erreur J2";
        pointsDeVie(vie2,pointsJoueur2);
        message.innerHTML = tabJeu[1].name + " , vous avez fait une erreur! Vous perdez un point de vie!";
        //On passe au joueur suivant
        switchPlayer(currentPlayer);
        message.innerHTML += "C'est à " + currentPlayer.name + " de jouer!";
      }
      else{
        var gagnant = tabJeu[0];
        affichageBilles();
        message.innerHTML="Bravo! "+tabJeu[0].name+" a gagné! Poil au nez!";
        findePartie(gagnant);
        return gagnant;
      }
     }
  }
  else if(vie1==0){
    var gagnant = tabJeu[1];
    findePartie(gagnant);
    return gagnant;
  }
  else if(vie2==0){
    var gagnant = tabJeu[0];
    findePartie(gagnant);
    return gagnant;
  }
  else if (tabJeu[2]-choix==1    
    && vie1!=0 
    && vie2!=0){
      message.innerHTML = currentPlayer.name + " a pris " + choix + " billes.";
      tabJeu[2] = tabJeu[2] - choix;
      //Afficher le nombre de billes du jeu dans le compteur
      affichage_billes.innerText = tabJeu[2];
      //On met à jour l'affichage du tableau de billes
      affichageBilles();
      message.innerHTML += currentPlayer.name + " a gagné!!!";
      var gagnant = currentPlayer;
      findePartie(gagnant);
      return gagnant;
    }
  else if (tabJeu[2]-choix<1    
    && vie1!=0 
    && vie2!=0){
      if(tabPartie.length%2!=0){
        vie1--
        pointsDeVie(vie1,pointsJoueur1);
        if(vie1==0){
          var gagnant = tabJeu[1];
          findePartie(gagnant);
          return gagnant;
        }
      }
      else{
        vie2--
        pointsDeVie(vie2,pointsJoueur2);
        if(vie2==0){
          var gagnant = tabJeu[0];
          findePartie(gagnant);
          return gagnant;
        }
      }
      message.innerHTML = currentPlayer.name + " , vous ne pouvez pas jouer ce nombre de billes. Vous perdez un point de vie!";
      tabPartie[tabPartie.length-1]="erreur"+currentPlayer.name;
      switchPlayer(currentPlayer);
      message.innerHTML += "C'est à " + currentPlayer.name + " de jouer!";
      }
  else{
    message.innerHTML="Erreur du programme. Cas non prévu.";
  }
}

function findePartie(gagnant){
    toggle("partie2joueurs", "hide");
    toggle("gagnant","hide");
    console.log("on est dans fin de partie");
    divGagnant = document.getElementById("messageGagnant");
    divGagnant.querySelector('h2').innerHTML=gagnant.name + "<br>\ a gagné!";
    image = document.createElement('img');
    image.src = 'images/' + tabJeu[0].avatar +'.png';
    divGagnant.appendChild(image);
    
    console.log(gagnant.name);
    console.log(" a gagné!");
}



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
