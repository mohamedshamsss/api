
let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let Days = [ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let dateNow = new Date()
let month = dateNow.getMonth()
let day = dateNow.getDay()

let dateOfDay = dateNow.getDate()

let printDay = Days[day]

let prinMonth = months[month]

const yourLocation = document.getElementById("locate");
yourLocation.addEventListener('click', function(){
    
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(getPosition);
        }
      
})

function getPosition(position) {
    let lat = position.coords.latitude
    let lon = position.coords.longitude
    let changeLat = lat.toFixed(2)
    let changeLon = lon.toFixed(2)
    let collect = `${changeLat},${changeLon}`
    getAPI(collect)
}

let searchInput = document.getElementById("search")
searchInput.addEventListener("change", function(){
    getAPI(searchInput.value);
    clearInput();
})

getAPI("Alexandria")

async function getAPI(result){
    let APIKey = "6a02086e510a477a878145757240201";
    let getAPI = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${result}&days=3`);
    const data = await getAPI.json();
    showData(data)
    showDataForNextDays(data)
}
getAPI();


function showData(list){
    document.getElementById("location").innerHTML=`
    ${list.location.country} - ${list.location.region} - ${list.location.name}
    `
    let mainData = `
    <div class="artPop">
    <article>
        <p class="d-flex justify-content-between mt-2 text-light fw-bolder bg-gradient p-3">
            <span>${printDay}</span>
            <span>${dateOfDay}/${prinMonth}</span>
        </p>
         <div class="content">
            <div class="country">
                <p class="text-light my-3 fs-4 fw-bold">${list.location.name}</p>
            </div>
            <div class="degree d-flex justify-content-between">
                <h2 class="mx-2 text-primary">${list.current.temp_c}<span class="text-light">ºC</span></h2>
                <img src="http:${list.current.condition.icon}" class="" alt="">
            </div>
            <div class="info">
                <p class="text-light bg-dark rounded fs-5 fw-bolder badge" style="letter-spacing: 2px;">${list.current.condition.text}</p>
            </div>

            <ul class="d-flex justify-content-around text-light list-unstyled">
                <li><i class="fa-solid fa-droplet"></i> ${list.current.humidity}%</li>
                <li><i class="fa-solid fa-wind"></i> ${list.current.wind_kph}km/h</li>
                <li><i class="fa-regular fa-compass"></i> ${list.current.wind_dir}</li>
            </ul>
         </div>
    </article>
</div>
    `
    document.getElementById("weatherData").innerHTML = mainData;
}

function showDataForNextDays(tomorrowData){
    let tbody = "";
    for (let T = 0; T < 2; T++) {
        
        let afterTheDay = tomorrowData.forecast.forecastday[T+1].date
        let changeAfterTheDaySyntax = new Date(afterTheDay)
        let finallyPrintTheDay = Days[changeAfterTheDaySyntax.getDay()]
        tbody += `

         <tr>
         <td class="fw-bolder">${finallyPrintTheDay}</td>
         <td>${tomorrowData.forecast.forecastday[T+1].day.maxtemp_c}ºC</td>
         <td>${tomorrowData.forecast.forecastday[T+1].day.mintemp_c}ºC</td>
         <td>${tomorrowData.forecast.forecastday[T+1].day.condition.text}</td>
         <td> <img src="http:${tomorrowData.forecast.forecastday[T+1].day.condition.icon}" alt=""></td>
       
       </tr>
    `
    document.getElementById("tbody").innerHTML = tbody;
    }
    
}


function clearInput(){
    searchInput.value = "";
}