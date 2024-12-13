const rootDiv = document.getElementById("root")
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


inputDiv.style.width = "300px"

input.setAttribute("type","text")
input.setAttribute("placeholder","Iveskite miesto pavadinima")

buttonInput.textContent = "Prideti miesta"

labelSelect.textContent = "Pasirinkite prognozes data: "

inputSelect.setAttribute("name","date")

optionSelect1.setAttribute("value","siandien")
optionSelect2.setAttribute("value","rytoj")

optionSelect1.textContent = "Siandien"
optionSelect2.textContent = "Rytoj"






inputDiv.style.display = "flex"
inputDiv.style.flexWrap = "wrap"
inputDiv.style.justifyContent = "center"
inputDiv.style.alignItems = "center"
inputDiv.style.gap = "10px"
inputDiv.style.marginBottom = "10px"

input.style.height = "28px"

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

mainDiv.style.display = "flex"
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

let selectValue
 

function displayPage() {
        inputDiv.append(input)
        inputDiv.append(buttonInput)
        inputDiv.append(labelSelect)
        inputDiv.append(inputSelect)
        inputSelect.append(optionSelect1)
        inputSelect.append(optionSelect2)
        rootDiv.append(mainHeader)
        rootDiv.append(inputDiv)

}

displayPage()

function createCard(location,temperature,jutimine,condition,hidden) {
        const infoMiestas = document.createElement("h4")
        const infoTemperature = document.createElement("span")
        const infoJutimine = document.createElement("span")
        const infoOroSalygos = document.createElement("span")
        const buttonDelete = document.createElement("button")
        const cardDiv = document.createElement("div")
        cardDiv.setAttribute("id","cardDiv")
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
        infoMiestas.textContent = location
        infoTemperature.textContent = `Temperatura: ${temperature}`
        infoJutimine.textContent = `Jutimine temperatura: ${jutimine}`
        infoOroSalygos.textContent = `Oro salygos: ${condition}`
        cardDiv.append(buttonDelete,infoMiestas,infoTemperature,infoJutimine,infoOroSalygos)
        return cardDiv
}


inputSelect.addEventListener("change",() => {
        selectValue = inputSelect.value
        console.log(selectValue)
})

console.log(inputSelect.value)


async function fetchData() {  

        for (let loc of locations) {
                const res = await fetch(`https://api.meteo.lt/v1/places/${loc}/forecasts/long-term`)
                const data =  await res.json()
        console.log(data)
        console.log(loc)
        let card = createCard(data.place.name,
                        data.forecastTimestamps[3].airTemperature,
                        data.forecastTimestamps[3].feelsLikeTemperature,
                        data.forecastTimestamps[3].conditionCode,true)
        mainDiv.appendChild(card)
        let time = data.forecastTimestamps[3].forecastTimeUtc
        console.log(time)
        console.log(typeof time)
        const currentTime = new Date()
        const currentYear = currentTime.getFullYear()
        const currentDay = currentTime.getDate()
        const currentHour = currentTime.getHours()
        const currentMonth = currentTime.getMonth()
        console.log(currentTime)
        console.log(currentYear)
        console.log(currentMonth)
        console.log(currentDay)
        console.log(currentHour)
        }       
}

fetchData()

rootDiv.appendChild(mainDiv)

