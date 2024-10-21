const search_btn = document.querySelector("#search_btn");
let currentIndex = 0;
let forecastData = [];
const result = document.querySelector(".result");
search_btn.addEventListener("click", () => {
    let city = document.querySelector("#city").value;
    let apikey = `75ceaec89c26dbc7436ac27993495b16`;
    let apiurl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric&lang=pl`;
    let counter = 0;
    fetch(apiurl)
        .then(response => {
        if (!response.ok) {
            alert("Nie podano poprawnego miasta");
            throw new Error("Błąd sieci!");
        }
        return response.json();
    })
        .then(data => {
        const back_btn = document.querySelector("#back_btn");
        const forward_btn = document.querySelector("#forward_btn");
        const img = document.querySelector('#img');
        result.style.height = "30%";
        result.style.width = "30%";
        back_btn.style.display = "none";
        forward_btn.style.display = "none";
        img.style.display = "none";
        forecastData = data.list;
        currentIndex = 0;
        result.classList.add("ani");
        result.addEventListener("animationend", () => {
            back_btn.style.display = "block";
            forward_btn.style.display = "block";
            img.style.display = "block";
            displayForecast(currentIndex);
            result.classList.remove("ani");
        });
    });
});
function displayForecast(index) {
    const back_btn = document.querySelector("#back_btn");
    const forward_btn = document.querySelector("#forward_btn");
    if (index < 0 || index >= forecastData.length) {
        return;
    }
    const forecast = forecastData[index];
    let city = document.querySelector("#city").value;
    let city_name_el = document.querySelector("#name");
    city_name_el.textContent = city;
    let temp = forecast.main.temp;
    let temp_el = document.querySelector("#temp");
    temp_el.textContent = temp + "°C";
    let day = forecast.dt_txt;
    let day_el = document.querySelector("#day");
    day_el.textContent = day;
    let desc = forecast.weather[0].description;
    let img = document.querySelector('#img');
    switch (desc) {
        case "pochmurnie":
            img.src = "img/cloudy.png";
            break;
        case "zachmurzenie małe":
        case "zachmurzenie duże":
            img.src = "img/clouds.png";
            break;
        case "zachmurzenie umiarkowane":
            img.src = "img/umiarkowane.png";
            break;
        case "słabe opady deszczu":
            img.src = "img/rainy.png";
            break;
        case "bezchmurnie":
            img.src = "img/sun.png";
            break;
    }
    let desc_el = document.querySelector("#desc");
    desc_el.textContent = desc;
    back_btn.disabled = index === 0;
    forward_btn.disabled = index === forecastData.length - 1;
}
document.querySelector("#back_btn").addEventListener("click", () => {
    const result_element = document.querySelector(".result");
    if (currentIndex > 0) {
        currentIndex -= 1;
        result_element.classList.add("slide-left");
        displayForecast(currentIndex);
        result_element.addEventListener("animationend", function handleAnimation() {
            result_element.classList.remove("slide-left");
            result_element.removeEventListener("animationend", handleAnimation);
        });
    }
    else {
        alert("Nie ma wcześniejszej prognozy.");
    }
});
document.querySelector("#forward_btn").addEventListener("click", () => {
    const result_element = document.querySelector(".result");
    if (currentIndex < forecastData.length - 1) {
        currentIndex += 1;
        result_element.classList.add("slide-right");
        displayForecast(currentIndex);
        result_element.addEventListener("animationend", function handleAnimation() {
            result_element.classList.remove("slide-right");
            result_element.removeEventListener("animationend", handleAnimation);
        });
    }
    else {
        alert("Nie ma następnej prognozy.");
    }
});
