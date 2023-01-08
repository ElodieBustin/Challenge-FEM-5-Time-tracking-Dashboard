//Mettre les données daily en dur et ajouter selected
//Une seule fonction dans le fetch
//Ensuite, selon le dataset choisi, on adapte current et previous ?

const daily = document.querySelector('[data-time=\'daily\']');
const weekly = document.querySelector('[data-time=\'weekly\']');
const monthly = document.querySelector('[data-time=\'monthly\']');

console.log(daily.dataset.time);


function dailyTime(data){
  const currentSpan = document.getElementsByClassName('current');
  const previousSpan = document.getElementsByClassName('previous');

  for(let i = 0; i <data.length; i++){
    let currentDataI = data[i].timeframes.daily.current;
    let previousDataI = data[i].timeframes.daily.previous;
    let currentHourSuffix = currentDataI <= 1 ? 'hr' : 'hrs';
    let previousHourSuffix = previousDataI <= 1 ? 'hr' : 'hrs';
    currentSpan[i].innerHTML = `${currentDataI} ${currentHourSuffix}`;
    previousSpan[i].innerHTML = `Previous - ${previousDataI} ${previousHourSuffix}`;
  }
}


//fetching data
fetch('data.json')
  .then(function(response){
    return response.json();
  })
  .then(function (data){
    console.log(data);
    dailyTime(data);

  })
  .catch(function(err){
    console.log(err);
  });
