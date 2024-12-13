const rootDiv = document.getElementById("root")
const mainDiv = document.createElement("div")

rootDiv.style.display = "flex"
rootDiv.style.justifyContent = "center"
rootDiv.style.width = "100%"
rootDiv.style.height = "100vh"

mainDiv.setAttribute("id","mainDiv")
mainDiv.style.display = "flex"

mainDiv.style.flexWrap = "wrap"
mainDiv.style.width = "700px"
mainDiv.style.gap = "20px"
mainDiv.style.alignContent = "start"


const locations = [
        "Kaunas",
        "Vilnius",
        "Klaipėda",
        "Šiauliai",
        "Panevėžys",
        "Alytus"
]
 

function createCard(location,temperature,jutimine,condition) {
        const infoMiestas = document.createElement("h4")
        const infoTemperature = document.createElement("span")
        const infoJutimine = document.createElement("span")
        const infoOroSalygos = document.createElement("span")
        const cardDiv = document.createElement("div")
        cardDiv.setAttribute("id","cardDiv")
        cardDiv.style.display = "flex"
        cardDiv.style.flexDirection ="column"
        cardDiv.style.alignItems = "center"
        cardDiv.style.justifyContent = "start"
        cardDiv.style.height = "200px"
        cardDiv.style.width = "200px"
        cardDiv.style.borderRadius = "10px"
        cardDiv.style.backgroundColor = "aliceblue"
        infoMiestas.textContent = location
        infoTemperature.textContent = `Temperatura: ${temperature}`
        infoJutimine.textContent = `Jutimine temperatura: ${jutimine}`
        infoOroSalygos.textContent = `Oro salygos: ${condition}`
        cardDiv.append(infoMiestas,infoTemperature,infoJutimine,infoOroSalygos)
        return cardDiv
}



async function fetchData() {  

        for (let loc of locations) {
                const res = await fetch(`https://api.meteo.lt/v1/places/${loc}/forecasts/long-term`)
                const data =  await res.json()
        console.log(data)
        // infoMiestas.textContent = `${data.place.name}`
        // infoTemperature.textContent = `${data.forecastTimestamps[0].airTemperature}`
        // infoJutimine.textContent = `${data.forecastTimestamps[0].feelsLikeTemperature}`
        // infoOroSalygos.textContent = `${data.forecastTimestamps[0].conditionCode}`
        console.log(loc)
        // const locationObj = Object.values(data.place).find((city) => city == loc)
        // console.log(locationObj)
        let card = createCard(data.place.name,
                        data.forecastTimestamps[3].airTemperature,
                        data.forecastTimestamps[3].feelsLikeTemperature,
                        data.forecastTimestamps[3].conditionCode)
        mainDiv.appendChild(card) 
        } 
        
}

fetchData()

rootDiv.appendChild(mainDiv)
