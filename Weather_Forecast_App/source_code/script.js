/* ==========================================
   WeatherNow Weather Forecast App
   JavaScript File
========================================== */



// ================= CURRENT DATE & TIME =================


function updateDateTime(){


    let dateElement = document.getElementById("date");

    let timeElement = document.getElementById("time");


    let currentDate = new Date();



    if(dateElement){

        dateElement.innerHTML =
        currentDate.toDateString();

    }



    if(timeElement){

        timeElement.innerHTML =
        currentDate.toLocaleTimeString();

    }


}



setInterval(updateDateTime,1000);

updateDateTime();








// ================= WEATHER SEARCH =================



function getWeather(){


    let city =
    document.getElementById("cityInput");



    if(city){


        let cityName = city.value;



        if(cityName===""){


            alert("Please enter city name");


            return;


        }



        document.getElementById("city").innerHTML =
        cityName;



        document.getElementById("temperature").innerHTML =
        "30°C";



        document.getElementById("description").innerHTML =
        "Clear Sky";



        document.getElementById("humidity").innerHTML =
        "60%";



        document.getElementById("wind").innerHTML =
        "12 km/h";



        document.getElementById("pressure").innerHTML =
        "1012 hPa";



    }


}






// ================= FORECAST SEARCH =================



function getForecast(){


    let city =
    document.getElementById("forecastCity");



    if(city){



        if(city.value===""){


            alert("Enter city name");


            return;


        }



        alert(
        "Showing 5-day forecast for "
        + city.value
        );



    }


}
/* ================= FAVORITE CITY FUNCTIONS ================= */



// Get saved cities from local storage

let favoriteCities =
JSON.parse(localStorage.getItem("cities")) || [];





// Add Favorite City


function addFavorite(){


    let input =
    document.getElementById("favoriteCity");



    if(input){


        let cityName = input.value.trim();



        if(cityName === ""){


            alert("Enter city name");


            return;


        }





        favoriteCities.push(cityName);



        localStorage.setItem(
            "cities",
            JSON.stringify(favoriteCities)
        );



        displayFavorites();



        input.value = "";


    }


}








// Display Favorite Cities


function displayFavorites(){



    let container =
    document.getElementById("favoritesContainer");



    if(container){



        container.innerHTML = "";




        favoriteCities.forEach(
        function(city,index){



            let card =
            document.createElement("div");



            card.className =
            "favorite-card";




            card.innerHTML = `


            <i class="fa-solid fa-city"></i>


            <h2>${city}</h2>


            <p>
            Click to view weather
            </p>


            <button onclick="removeFavorite(${index})">

            Remove

            </button>


            `;



            container.appendChild(card);



        });



    }


}









// Remove Favorite City


function removeFavorite(index){



    favoriteCities.splice(index,1);



    localStorage.setItem(

        "cities",

        JSON.stringify(favoriteCities)

    );



    displayFavorites();



}







// Load Favorites when page opens


window.onload = function(){


    displayFavorites();


};
/* ================= WEATHER API FUNCTION ================= */


// Add your OpenWeather API key here

const API_KEY = "YOUR_API_KEY";





async function fetchWeather(city){



    try{


        let response =
        await fetch(

        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

        );



        let data =
        await response.json();





        if(data.cod !== 200){


            alert("City not found");


            return;


        }






        // Update Weather Information


        let cityElement =
        document.getElementById("city");


        if(cityElement){

            cityElement.innerHTML =
            data.name;

        }





        let temp =
        document.getElementById("temperature");


        if(temp){

            temp.innerHTML =
            Math.round(data.main.temp)
            + "°C";

        }





        let description =
        document.getElementById("description");


        if(description){

            description.innerHTML =
            data.weather[0].description;

        }





        let humidity =
        document.getElementById("humidity");


        if(humidity){

            humidity.innerHTML =
            data.main.humidity + "%";

        }






        let wind =
        document.getElementById("wind");


        if(wind){

            wind.innerHTML =
            data.wind.speed + " km/h";

        }






        let pressure =
        document.getElementById("pressure");


        if(pressure){

            pressure.innerHTML =
            data.main.pressure + " hPa";

        }






        // Weather Icon


        let icon =
        document.getElementById("weatherIcon");



        if(icon){


            let iconCode =
            data.weather[0].icon;



            icon.src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        }



    }



    catch(error){


        console.log(error);


        alert(
        "Unable to fetch weather data"
        );


    }


}








// Connect Search Button with API


function searchWeather(){



    let input =
    document.getElementById("cityInput");



    if(input.value === ""){


        alert("Enter city name");


        return;


    }



    fetchWeather(input.value);



}








// ================= PAGE LOAD =================



document.addEventListener(
"DOMContentLoaded",
function(){



    updateDateTime();


    displayFavorites();



});