const rootDiv = document.getElementById("root")
const body = document.querySelector("body")
const mainDiv = document.createElement("div")
const mainHeader = document.createElement("h1")
const form = document.createElement("form")
const inputDiv = document.createElement("div")
const selectDiv = document.createElement("div")
const input = document.createElement("input")
const buttonInput = document.createElement("button")
const labelSelect = document.createElement("label")
const inputSelect = document.createElement("select")
const optionSelect1 = document.createElement("option")
const optionSelect2 = document.createElement("option")
const selectHeader = document.createElement("h2")


mainDiv.classList.add("mainDiv")
inputDiv.classList.add("inputDiv")
selectDiv.classList.add("selectDiv")
buttonInput.classList.add("buttonInput")


mainDiv.setAttribute("id","mainDiv")
input.setAttribute("type","text")
input.setAttribute("placeholder","Įveskite miesto pavadinimą")
buttonInput.setAttribute("type","submit")
inputSelect.setAttribute("name","date")
optionSelect1.setAttribute("value","siandien")
optionSelect2.setAttribute("value","rytoj")


optionSelect1.textContent = "Šiandien"
optionSelect2.textContent = "Rytoj"
labelSelect.textContent = "Pasirinkite prognozės datą: "
selectHeader.textContent = "Pridėti miestai"
buttonInput.textContent = "Pridėti miestą"
mainHeader.textContent = "Orų prognozės"


const locations = [
        "Kaunas",
        "Vilnius",
        "Klaipėda",
        "Šiauliai",
        "Panevėžys",
        "Alytus"
]

const weatherStatus = {
        "clear" : "./img/clear.png",
        "partly-cloudy" : "./img/partly-cloudy.png",
        "cloudy-with-sunny-intervals" : "./img/cloudy-with-sunny-intervals.png",
        "cloudy" : "./img/cloudy.png",
        "light-rain" : "./img/light-rain.png",
        "rain" : "./img/rain.png",
        "heavy-rain" : "./img/heavy-rain.png",
        "thunder" : "./img/thunder.png",
        "isolated-thunderstorms" : "./img/isolated-thunderstorms.png",
        "thunderstorms" : "./img/thunderstorms.png",
        "heavy-rain-with-thunderstorms" : "./img/heavy-rain-with-thunderstorms.png",
        "light-sleet" : "./img/light-sleet.svg",
        "sleet" : "./img/sleet.svg",
        "freezing-rain" : "./img/freezing-rain.svg",
        "hail" : "./img/hail.svg",
        "light-snow" : "./img/light-snow.png",
        "snow" : "./img/snow.png",
        "heavy-snow" : "./img/heavy-snow.png",
        "fog" : "./img/fog.svg",
        "null" : "./img/cloudy.png",
}

// city input value
let selectValue

//local storage
const savedCities = localStorage.getItem("savedCities") == null ? localStorage.setItem("savedCities",JSON.stringify([])) : JSON.parse(localStorage.getItem("savedCities"))


// adds all page elements except info cards
function displayPage() {
        form.append(input)
        form.append(buttonInput)
        inputDiv.append(form)
        inputDiv.append(labelSelect)
        inputDiv.append(inputSelect)
        inputSelect.append(optionSelect1)
        inputSelect.append(optionSelect2)
        rootDiv.append(mainHeader)
        rootDiv.append(inputDiv)
        rootDiv.appendChild(mainDiv)
        rootDiv.appendChild(selectHeader)
        rootDiv.appendChild(selectDiv)
}


// create info card and all its elements. sets id on main div and hidden is option to show delete button or not
function createCard(id,hidden) {
        const infoMiestas = document.createElement("h4")
        const infoTemperature = document.createElement("span")
        const infoJutimine = document.createElement("span")
        const infoOroSalygos = document.createElement("span")
        const buttonDelete = document.createElement("button")
        const cardDiv = document.createElement("div")
        const conditionImage = document.createElement("img")
        const conditionDiv = document.createElement("div")

        cardDiv.classList.add("cardDiv")
        conditionDiv.classList.add("conditionDiv")
        conditionImage.classList.add("conditionImage")
        buttonDelete.classList.add("buttonDelete")
        infoTemperature.classList.add("temp")
        infoJutimine.classList.add("jutimine")

        buttonDelete.setAttribute("id",`${id}`)

// adds event that deletes card to every button
        buttonDelete.addEventListener("click",deleteCards)

        cardDiv.setAttribute("id",`city_${id}`)
         
        infoOroSalygos.textContent = `Oro sąlygos: `
        buttonDelete.innerHTML = "&#10005;"
// if hidden parameter is true hides delete card button
        if (hidden) {
                buttonDelete.style.display = "none"
        }
        
        conditionDiv.append(infoOroSalygos,conditionImage)
        cardDiv.append(buttonDelete,infoMiestas,infoTemperature,infoJutimine,conditionDiv)
        
        return cardDiv
}



// create main cities cards
function drawCards() {
        for(let city of locations) {
                const card = createCard(`main_${city}`,true)
                mainDiv.appendChild(card)
        }
}

// creates selected cities cards from local storage
function drawSavedCards() {
        const arrayLS = JSON.parse(localStorage.getItem("savedCities"))
        for (selectCity of arrayLS) {
                let target = document.getElementById(`city_${selectCity}`)
// checks if that card already exists
                if (!target) {
                       const card = createCard(`${selectCity}`,false)
                       selectDiv.append(card)  
                }                        
        }
}


// function that was added to every buttons event when creating info cards in createCard(). 
function deleteCards() {
        const arrayLS = JSON.parse(localStorage.getItem("savedCities"))
// gets id of the button that was pressed which is city name
        const deleteId = event.target.id
// finds cardDiv with same id, removes it and that city from local storage
        const removeElement = document.getElementById(`city_${deleteId}`)
        const index = arrayLS.indexOf(`${deleteId}`)
        arrayLS.splice(index, 1)
        localStorage.setItem("savedCities",JSON.stringify(arrayLS))
        removeElement.remove()
        }


// creates regular expresion of current time or next day 12.00
function createRegEx() {
        const time = new Date()
        selectValue = inputSelect.value
        let timeRegEx
        if (selectValue == "siandien" || selectValue == undefined) {
                timeRegEx = new RegExp(`${time.getFullYear()}-${(time.getMonth()+1).toString().padStart(2,'0')}-${time.getDate().toString().padStart(2,'0')} ${time.getHours().toString().padStart(2,'0')}:..:..`)    
        }
        else if (selectValue == "rytoj") {
// checks if next day is 32 then creates expresion of 01 day if true
                const day1 = time.getDate()+1
                const day2 = new Date(time.getFullYear(),time.getMonth(),day1)
                if (day2.getDate() == 1) {
                        timeRegEx = new RegExp(`${time.getFullYear()}-${(time.getMonth()+1).toString().padStart(2,'0')}-01 12:..:..`)    
                }
// adds +1 day 
                else {
                        timeRegEx = new RegExp(`${time.getFullYear()}-${(time.getMonth()+1).toString().padStart(2,'0')}-${(time.getDate()+1).toString().padStart(2,'0')} 12:..:..`)    
                }  
        }
        return timeRegEx    
}


// checks if city from input exists in meteo data and if its already added in local storage
async function addToLocalStorage() { 
        const arrayLS = JSON.parse(localStorage.getItem("savedCities"))
        const inputCity = input.value
        const res = await fetch(`https://api.meteo.lt/v1/places/${inputCity}/forecasts/long-term`)
        const data =  await res.json()
        try {
// compares entered value with name returned from meteo api
                if (data.place.name.toLowerCase() == inputCity.toLowerCase()) {
// if above is true then checks if its already added to local storage
                        if (arrayLS.some(el => el == data.place.name)) {
                                alert("Toks miestas jau pridėtas")
                        }
                        else {  
                                form.reset()
                                input.focus()
                                arrayLS.push(data.place.name)
                        }
                }         
        }    
        catch(error){
                alert("Tokio miesto nėra")
        }                       
        localStorage.setItem("savedCities",JSON.stringify(arrayLS))
        drawSavedCards()
        updateWeatherSelect(createRegEx())         
}


// updates info card fields with information based on chosen time (timeRegEx)
async function updateWeather(timeRegEx) {
        for(let city of locations) { 
                const res = await fetch(`https://api.meteo.lt/v1/places/${city}/forecasts/long-term`)
                const data =  await res.json()
// finds cardDiv with same id as the city fro array locations 
                const parentDiv = document.getElementById(`city_main_${city}`)
// gets all elements of this specific info card
                const cityName = parentDiv.querySelector("h4")
                const temp = parentDiv.querySelector(".temp")
                const jutimine = parentDiv.querySelector(".jutimine")
                const conditionImage = parentDiv.querySelector("img")  
                for (let i in data.forecastTimestamps) {
// finds entry with specific time and adds it to all elements
                        if (timeRegEx.test(data.forecastTimestamps[i].forecastTimeUtc)) {
                                cityName.textContent = `${data.place.name}`
                                temp.innerHTML = `Temperatūra: <span class="tempInfo">${data.forecastTimestamps[i].airTemperature}</span>`
                                jutimine.innerHTML = `Jutiminė temperatūra: <span class="tempInfo"> ${data.forecastTimestamps[i].feelsLikeTemperature}</span>`
                                conditionImage.src = `${weatherStatus[data.forecastTimestamps[i].conditionCode]}` 
                                break
                        }
                }
        }
}

// updates selected cities info card. The same as above except cities is taken from local storage
async function updateWeatherSelect(timeRegEx) {
        const arrayLS = JSON.parse(localStorage.getItem("savedCities"))
        for(selectCity of arrayLS) { 
                const res = await fetch(`https://api.meteo.lt/v1/places/${selectCity}/forecasts/long-term`)
                const data =  await res.json()
                const parentDiv = document.getElementById(`city_${selectCity}`)
                const city = parentDiv.querySelector("h4")
                const temp = parentDiv.querySelector(".temp")
                const jutimine = parentDiv.querySelector(".jutimine")
                const conditionImage = parentDiv.querySelector("img")  
                for (let i in data.forecastTimestamps) {
                        if (timeRegEx.test(data.forecastTimestamps[i].forecastTimeUtc)) {
                                city.textContent = `${data.place.name}`
                                temp.innerHTML = `Temperatūra: <span class="tempInfo">${data.forecastTimestamps[i].airTemperature}</span>`
                                jutimine.innerHTML = `Jutiminė temperatūra: <span class="tempInfo">${data.forecastTimestamps[i].feelsLikeTemperature}</span>`
                                conditionImage.src = `${weatherStatus[data.forecastTimestamps[i].conditionCode]}` 
                                break
                        }
                }
        }
}

// event listener for adding city to favorites
form.addEventListener("submit", () => {
        event.preventDefault()
        addToLocalStorage()
        drawSavedCards()
})

// event listener for changing time of forecast.
inputSelect.addEventListener("change",() => {
        updateWeather(createRegEx())
        updateWeatherSelect(createRegEx())
})

// page reload event. Adds all elements, draw all cards and updates all info.
document.addEventListener('DOMContentLoaded', function() {
        displayPage()
        drawCards()
        drawSavedCards()
        updateWeather(createRegEx())
        updateWeatherSelect(createRegEx())
});




