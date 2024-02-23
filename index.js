const searchArea = document.querySelector(".input-text input");
const searchButton = document.querySelector(".input-text button");
const imageArea = document.querySelector(".sun-image-description img");
const tempreture = document.querySelector(".sun-image-description h1");
const description = document.querySelector(".sun-image-description p")
const humidity = document.querySelector(".humidity h1");
const wind = document.querySelector(".wind h1");

const apiKey = "your Api key";
const apiUrl =  "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function checkWeather(city){
    const response = await fetch(apiUrl +"&q="+ city + "&appid="+apiKey);
    var data = await response.json();

    if(response.status=="404"){
        imageArea.setAttribute("src", "image/404.PNG");
        document.querySelector(".sun-image-description h1").style.display = 'none';
        document.querySelector(".sun-image-description  p").style.display = 'none';
        document.querySelector(".humidity-wind ").style.display = 'none';
        alert("invalid city name refresh the page and try again");
    }

    const temp =  data.main.temp;
    const weatherDescription = data.weather[0].description;
    const weatherHumidity = data.main.humidity;
    const windSpead = data.wind.speed;
    const image = data.weather[0].icon;

    const imageUrl = "https://openweathermap.org/img/wn/"+image+"@2x.png";

    tempreture.innerHTML = Math.round(temp)+"°C";
    description.innerHTML = weatherDescription;
    humidity.innerHTML = Math.round(weatherHumidity)+"%";
    wind.innerHTML = Math.round(3.6*windSpead)+"Km/hr"; //to change m/s to km/hr multiply by 3.6
    imageArea.setAttribute("src", imageUrl);

}

searchButton.addEventListener("click", function(){
    if(searchArea.value!=""){
        document.querySelector(".input-text p").style.display = 'none';
        checkWeather(searchArea.value);
    }
    else{
        document.querySelector(".input-text p").innerHTML = "enter a valid city name";
    }
    
})

document.addEventListener("keypress", function(event){
     if(event.key=="Enter"){
        if(searchArea.value!=""){
            document.querySelector(".input-text p").style.display = 'none';
            checkWeather(searchArea.value);
        }
        else{
            document.querySelector(".input-text p").innerHTML = "Enter a valid city name";
        }
     }
})
