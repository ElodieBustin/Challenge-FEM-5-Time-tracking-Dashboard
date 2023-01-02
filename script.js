// let currentHourSuffix = currentTime === 1 ? "hr" : "hrs";
// let previousHourSuffix = previousTime === 1 ? "hr" : "hrs";




function currentTime(data){
  const currentSpan = document.getElementsByClassName('current');
  for(let i = 0; i <data.length; i++){
    currentSpan[i].innerHTML = data[i].timeframes.daily.current;
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
  })
  .catch(function(err){
    console.log(err);
  });
