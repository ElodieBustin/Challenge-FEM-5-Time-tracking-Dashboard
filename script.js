// let currentHourSuffix = currentTime === 1 ? "hr" : "hrs";
// let previousHourSuffix = previousTime === 1 ? "hr" : "hrs";




function currentTime(data){
  const currentSpan = document.getElementsByClassName('current');
  for(let i = 0; i <data.length; i++){
    currentSpan[i].innerHTML = `${data[i].timeframes.daily.current} hrs`;
  }
}

function previousTime(data){
  const previousSpan = document.getElementsByClassName('previous');
  for(let i = 0; i <data.length; i++){
    previousSpan[i].innerHTML = `Previous - ${data[i].timeframes.daily.previous} hrs`;
  }
}

//fetching data

fetch('data.json')
  .then(function(response){
    return response.json();
  })
  .then(function (data){
    console.log(data);
    currentTime(data);
    previousTime(data);

  })
  .catch(function(err){
    console.log(err);
  });
