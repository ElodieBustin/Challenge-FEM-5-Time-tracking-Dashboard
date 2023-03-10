//Déclaration des variables à utiliser
const timeChoices = document.querySelectorAll('.time-choice');
let data = [];
//On déclare un tableau data qui va permettre de récupérer toutes les données
//Cette variable sera modifiée dans la fonction fetchData
const activitySpan = document.getElementsByClassName('activity');
const previousSpan = document.getElementsByClassName('previous');
const currentSpan = document.getElementsByClassName('current');
const containerActivity = document.getElementById('container-activities');




timeChoices.forEach(timeChoice =>{
  timeChoice.addEventListener('click', ()=>{
    addClassActive(timeChoice);
    //on récupère le dataset pour envoyer la donnée dans la prochaine fonction
    const dataTime = timeChoice.dataset.time;
    renderDataOnCards(dataTime);
  });
});

function addClassActive(timeChoice){
  //Permet d'ajouter la class active à l'élément cliqué
  //Mais avant, on s'assure que la classe est retirée sur les autres éléments
  timeChoices.forEach(notClickedElement => {
    notClickedElement.classList.remove('active');
  });
  timeChoice.classList.add('active');
}


function deleteActivityCard(){
  const cardsActivity = [...document.getElementsByClassName('card-activity')];
  //HTMLCollection est une sorte de pseudo array, certes itérable,
  //mais pas lisible par des fonctions comme forEach
  //Pour le rendre lisible, on utilise le spread operator
  cardsActivity.forEach(activityCard => activityCard.remove());
};

//la fonction suivante doit être asynchrone pour laisser le temps
//à js de récupérer les données
async function renderDataOnCards(dataTime){
  //on récupère le dataTime envoyé en argument dans l'event listener comme paramètre
  // afin qu'il garde en mémoire la donnée du dataset
  //Puis on itère sur chaque entrée du tableau data

  let previousText = '';
  switch(dataTime){
    case 'daily':
      previousText = 'Yesterday';
      break;
    case 'weekly':
      previousText = 'Last week';
      break;
    case 'monthly':
      previousText = 'Last month'
  };

  //Comme le clic génère les cartes, chaque fois que l'on change le dataset
  //cela génère de nouvelles cartes
  //il faut donc les supprimer 
  deleteActivityCard();

  //Chaque entrée sera nommée activity,
  //et on récupère l'index pour itérer sur toutes les entrées nécessaires
  data.forEach((activity) =>{
    const title = activity.title;
    const titleClass = title.toLowerCase().replace(' ', '-');
    const currentData = activity.timeframes[dataTime].current;
    const previousData = activity.timeframes[dataTime].previous;
    let currentHourSuffix = currentData <= 1 ? 'hr' : 'hrs';
    let previousHourSuffix = previousData <= 1 ? 'hr' : 'hrs';
    const divNode = document.createElement('div');
    divNode.classList.add('card', 'card-activity', titleClass);

    const renderCard = `
    <div class="banner">
      <!-- <img src="/images/icon-work.svg" alt=""> -->
    </div>
    <div class="tracker">
      <span class="activity align-end">${title}</span>
      <span class="ellipsis align-end justify-end">
        <img src="/images/icon-ellipsis.svg" alt="">
      </span>
      <span class="current">${currentData} ${currentHourSuffix}</span>
      <span class="previous justify-end">${previousText} - ${previousData} ${previousHourSuffix}</span> 
    </div>
    `
    
    divNode.innerHTML = renderCard;
    containerActivity.appendChild(divNode);
  })
}


//Fetch data
async function fetchData(){
  const response = await fetch('data.json');
  data = await response.json();
  timeChoices[1].click();
  //simule clic sur weekly (comme sur le design)
  //pour que des données s'affichent dès le chargement
}

fetchData();