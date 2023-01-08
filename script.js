//Déclaration des variables à utiliser
const timeChoices = document.querySelectorAll('.time-choice');
let data = [];
//On déclare un tableau data qui va permettre de récupérer toutes les données
//Cette variable sera modifiée dans la fonction fetchData
console.log(data); //retourne tableau vide
const activitySpan = document.getElementsByClassName('activity');
const previousSpan = document.getElementsByClassName('previous');
const currentSpan = document.getElementsByClassName('current');


timeChoices.forEach(timeChoice =>{
  timeChoice.addEventListener('click', ()=>{
    addClassActive(timeChoice);
    //on récupère le dataset pour envoyer la donnée dans la prochaine fonction
    const dataTime = timeChoice.dataset.time;
    
    renderDataOnCards(dataTime);
  })
})

function addClassActive(timeChoice){
  //Permet d'ajouter la class active à l'élément cliqué
  //Mais avant, on s'assure que la classe est retirée sur les autres éléments
  timeChoices.forEach(notClickedElement => {
    notClickedElement.classList.remove('active');
  });
  timeChoice.classList.add('active');
}

//la fonction suivante doit être asynchrone pour laisser le temps
//à js de récupérer les données
async function renderDataOnCards(dataTime){
  //on récupère le dataTime envoyé en argument dans l'event listener comme paramètre
  // afin qu'il garde en mémoire la donnée du dataset
  //Puis on itère sur chaque entrée du tableau data

  //Chaque entrée sera nommée activity,
  //et on récupère l'index pour itérer sur toutes les entrées nécessaires
  data.forEach((activity, index) =>{
    const currentData = activity.timeframes[dataTime].current;
    const previousData = activity.timeframes[dataTime].previous;
    currentSpan[index].innerHTML = `${currentData} hrs`;
    previousSpan[index].innerHTML = `${previousData} hrs`;
    
  })
}


//Fetch data
async function fetchData(){
  const response = await fetch('data.json');
  data = await response.json();
  console.log(data);//retourne tableau d'objets, 
  //qui arrive après le log en fin de fichier car opération asynchrone
}

fetchData();
console.log(data);//retourne tableau vide