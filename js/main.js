const searchInput = document.getElementById("search");

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let display = ``;
searchInput.addEventListener("keyup",  e=> {
  getDegree(e.target.value)
   
})
// ===============functions=============

async function getDegree(requiredCity='cairo') {
   let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c1208ea88eb64dfdb35201659231802&q=${requiredCity}&days=3`)
   if(data.ok && 400 != data.status){
      let weather = await data.json()
   displayToday(weather.location, weather.current)
   nextDay(weather.forecast.forecastday)
   }
   
}

function displayToday(location, current) {
   if (null != current) {
      let getUpdate = new Date(current.last_updated);
      display = `<div class="todayWeather "> 
      <div class="header d-flex justify-content-between">
       <span class="day">${days[getUpdate.getDay()]}</span>
       <span class="month">${getUpdate.getDate() + months[getUpdate.getMonth()]}</span>
      </div>
                <div class="info  " id="current">   
                 <div class="layer">
                  
                     <div class="location p-2 text-muted fs-4 fw-bold">${location.name}</div>   
                     <div class="degree d-flex justify-content-between">     
                        <span>${current.temp_c}<sup>o</sup>C</span>
                        
                     </div>
                     <img src="https:${current.condition.icon}" alt="" class="w-25">

                  
                 <div class="status p-2 text-info">${current.condition.text}</div>
                 <div class="w-75 d-flex justify-content-around">
                 <span><img src="images/icon-umberella.png" alt="">20%</span>
                 <span><img src="images/icon-wind.png" alt="">18km/h</span>
                 <span><img src="images/icon-compass.png" alt="">East</span>
                 </div>
                 </div>
                  
                </div>

    </div>`
   }
   document.getElementById("focecast").innerHTML = display;
}
function nextDay(info) {

   let anotherDay = '';
   for (let i = 1; i < info.length; i++) {
   
      anotherDay += `<div class="nextDegree">
     <div class="header text-center ">         
        <div class="day ">${days[new Date(info[i].date.replace(" ", "T")).getDay()]}</div>   
             </div>      
              <div class="content text-center mt-3">
                        <div class="forecast-icon py-2">     
                                <img src="https:${info[i].day.condition.icon}" alt="" width=48>          
                                </div>         
                                 <div class="maxdegree ">${info[i].day.maxtemp_c}<sup>o</sup>C</div>
                                            <small>${info[i].day.mintemp_c}<sup>o</sup></small>
                                                      <div class="status py-2 mb-4">${info[i].day.condition.text}</div>
                                                              </div>      </div>`;
   }
   document.getElementById('focecast').innerHTML += anotherDay;
}
getDegree()

