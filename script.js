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



inputDiv.style.width = "300px"

selectHeader.textContent = "Prideti miestai"

input.setAttribute("type","text")
input.setAttribute("placeholder","Iveskite miesto pavadinima")

buttonInput.textContent = "Prideti miesta"

labelSelect.textContent = "Pasirinkite prognozes data: "

inputSelect.setAttribute("name","date")

optionSelect1.setAttribute("value","siandien")
optionSelect2.setAttribute("value","rytoj")

optionSelect1.textContent = "Siandien"
optionSelect2.textContent = "Rytoj"




body.style.background = "7280763.jpg"

inputDiv.style.display = "flex"
inputDiv.style.flexWrap = "wrap"
inputDiv.style.justifyContent = "center"
inputDiv.style.alignItems = "center"
inputDiv.style.gap = "10px"
inputDiv.style.marginBottom = "10px"

input.style.height = "28px"

buttonInput.setAttribute("type","submit")
buttonInput.style.height = "30px"
buttonInput.style.width = "100px"
buttonInput.style.backgroundColor = "#4caf50"
buttonInput.style.color = "white"
buttonInput.style.border = "none"
buttonInput.style.borderRadius = "3px"
buttonInput.style.marginLeft = "10px"

// inputSelect.style.margin = "10px 0px 20px 5px"

rootDiv.style.display = "flex"
rootDiv.style.flexDirection = "column"
rootDiv.style.alignItems = "center"
rootDiv.style.justifyContent = "start"
rootDiv.style.width = "100%"
rootDiv.style.height = "100vh"

mainDiv.setAttribute("id","mainDiv")

selectDiv.style.display = "flex"
selectDiv.style.justifyContent = "center"
selectDiv.style.flexWrap = "wrap"
selectDiv.style.width = "80vw"
selectDiv.style.gap = "20px"
selectDiv.style.alignContent = "center"

mainDiv.style.display = "flex"
mainDiv.style.justifyContent = "center"
mainDiv.style.flexWrap = "wrap"
mainDiv.style.width = "700px"
mainDiv.style.gap = "20px"
mainDiv.style.alignContent = "start"

mainHeader.textContent = "Oru prognozes"


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

let selectValue

const savedCities = localStorage.getItem("savedCities") == null ? localStorage.setItem("savedCities",JSON.stringify([])) : JSON.parse(localStorage.getItem("savedCities"))


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

displayPage()

function createCard(id,hidden) {
        const infoMiestas = document.createElement("h4")
        const infoTemperature = document.createElement("span")
        const infoJutimine = document.createElement("span")
        const infoOroSalygos = document.createElement("span")
        const buttonDelete = document.createElement("button")
        const cardDiv = document.createElement("div")
        const conditionImage = document.createElement("img")
        const conditionDiv = document.createElement("div")
        conditionDiv.style.display = "flex"
        conditionImage.style.width = "60px"
        conditionImage.style.height = "60px"
        conditionDiv.style.alignItems = "center"
        conditionDiv.style.marginTop = "20px"
        buttonDelete.setAttribute("id",`${id}`)
        buttonDelete.addEventListener("click",deleteCards)
        cardDiv.setAttribute("id",`city_${id}`)
        infoTemperature.classList.add("temp")
        infoJutimine.classList.add("jutimine") 
        cardDiv.style.position = "relative"
        cardDiv.style.display = "flex"
        cardDiv.style.flexDirection ="column"
        cardDiv.style.alignItems = "center"
        cardDiv.style.justifyContent = "start"
        cardDiv.style.height = "200px"
        cardDiv.style.width = "200px"
        cardDiv.style.borderRadius = "10px"
        cardDiv.style.backgroundColor = "aliceblue"
        buttonDelete.style.width = "20px"
        buttonDelete.style.height = "20px"
        buttonDelete.style.padding = "0px"
        buttonDelete.style.position = "absolute"
        buttonDelete.style.top = "10px"
        buttonDelete.style.right = "10px"
        buttonDelete.style.borderRadius = "100%"
        buttonDelete.style.border = "1px lightgrey solid"
        buttonDelete.innerHTML = "&#10005;"
        if (hidden) {
                buttonDelete.style.display = "none"
        }
        infoOroSalygos.textContent = `Oro salygos: `
        conditionDiv.append(infoOroSalygos,conditionImage)
        cardDiv.append(buttonDelete,infoMiestas,infoTemperature,infoJutimine,conditionDiv)
        
        return cardDiv
}


form.addEventListener("submit", () => {
        event.preventDefault()
        addToLocalStorage()
        drawSavedCards()
})


function drawCards() {
        for(let city of locations) {
                const card = createCard(`main_${city}`,true)
                mainDiv.appendChild(card)
        }
}

function drawSavedCards() {
        const arrayLS = JSON.parse(localStorage.getItem("savedCities"))
        for (selectCity of arrayLS) {
                let target = document.getElementById(`city_${selectCity}`)
                if (!target) {
                       const card = createCard(`${selectCity}`,false)
                       selectDiv.append(card)  
                }                        
        }
}

function deleteCards() {
        const arrayLS = JSON.parse(localStorage.getItem("savedCities"))
        const deleteId = event.target.id
        const removeElement = document.getElementById(`city_${deleteId}`)
        const index = arrayLS.indexOf(`${deleteId}`)
        arrayLS.splice(index, 1)
        localStorage.setItem("savedCities",JSON.stringify(arrayLS))
        removeElement.remove()
        }

       
inputSelect.addEventListener("change",() => {
        updateWeather(createRegEx())
        updateWeatherSelect(createRegEx())
})


function createRegEx() {
        const time = new Date()
        selectValue = inputSelect.value
        let timeRegEx
        if (selectValue == "siandien" || selectValue == undefined) {
                timeRegEx = new RegExp(`${time.getFullYear()}-${(time.getMonth()+1).toString().padStart(2,'0')}-${time.getDate().toString().padStart(2,'0')} ${time.getHours().toString().padStart(2,'0')}:..:..`)    
                console.log(`dabartinis regex= ${timeRegEx}`)
        }
        else if (selectValue == "rytoj") {    
                timeRegEx = new RegExp(`${time.getFullYear()}-${(time.getMonth()+1).toString().padStart(2,'0')}-${(time.getDate()+1).toString().padStart(2,'0')} 12:..:..`)    
                console.log(`dabartinis regex= ${timeRegEx}`)
        }
        return timeRegEx    
}


async function addToLocalStorage() { 
        const arrayLS = JSON.parse(localStorage.getItem("savedCities"))
        const inputCity = input.value
        const res = await fetch(`https://api.meteo.lt/v1/places/${inputCity}/forecasts/long-term`)
        const data =  await res.json()
        try {
                if (data.place.name.toLowerCase() == inputCity.toLowerCase()) {
                        if (arrayLS.some(el => el == data.place.name)) {
                                alert("Toks miestas jau pridetas")
                        }
                        else {
                                arrayLS.push(data.place.name)
                        }
                }         
        }    
        catch(error){
                alert("tokio miesto nera")
        }                       
        localStorage.setItem("savedCities",JSON.stringify(arrayLS))
        drawSavedCards()
        updateWeatherSelect(createRegEx())         
}


async function updateWeather(timeRegEx) {
        for(let city of locations) { 
                const res = await fetch(`https://api.meteo.lt/v1/places/${city}/forecasts/long-term`)
                const data =  await res.json()
                const target = document.getElementById(`city_main_${city}`)
                const cityName = target.querySelector("h4")
                const temp = target.querySelector(".temp")
                const jutimine = target.querySelector(".jutimine")
                const conditionImage = target.querySelector("img")  
                for (let i in data.forecastTimestamps) {
                        if (timeRegEx.test(data.forecastTimestamps[i].forecastTimeUtc)) {
                                cityName.textContent = `${data.place.name}`
                                temp.textContent = `Temperatura: ${data.forecastTimestamps[i].airTemperature}`
                                jutimine.textContent = `Jutimine temperatura: ${data.forecastTimestamps[i].feelsLikeTemperature}`
                                conditionImage.src = `${weatherStatus[data.forecastTimestamps[i].conditionCode]}` 
                                break
                        }
                }
        }

}


async function updateWeatherSelect(timeRegEx) {
        const arrayLS = JSON.parse(localStorage.getItem("savedCities"))
        for(selectCity of arrayLS) { 
                console.log(selectCity)
                const res = await fetch(`https://api.meteo.lt/v1/places/${selectCity}/forecasts/long-term`)
                const data =  await res.json()
                const target = document.getElementById(`city_${selectCity}`)
                const city = target.querySelector("h4")
                const temp = target.querySelector(".temp")
                const jutimine = target.querySelector(".jutimine")
                const conditionImage = target.querySelector("img")  
                for (let i in data.forecastTimestamps) {
                        if (timeRegEx.test(data.forecastTimestamps[i].forecastTimeUtc)) {
                                city.textContent = `${data.place.name}`
                                temp.textContent = `Temperatura: ${data.forecastTimestamps[i].airTemperature}`
                                jutimine.textContent = `Jutimine temperatura: ${data.forecastTimestamps[i].feelsLikeTemperature}`
                                conditionImage.src = `${weatherStatus[data.forecastTimestamps[i].conditionCode]}` 
                                break
                        }
                }
        }
}


document.addEventListener('DOMContentLoaded', function() {
        drawCards()
        drawSavedCards()
        updateWeather(createRegEx())
        updateWeatherSelect(createRegEx())
    });




