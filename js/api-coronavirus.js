let country = document.querySelector("#country")
let map = new Map;
let search = document.querySelector("#search")
function searchingResult(){
    let url = `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=${country.value}`;

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
            "x-rapidapi-key": "bcf21581aamsh871a6b42f118933p161d62jsn2c24c88dd6e5"
        }
    }).then((response) => response.json().then((data) => {
        console.log(data)
        let mapped = map.set(data).entries().next().value;
        let resultMap = mapped[0].data;
            document.querySelector("#location").textContent = `${resultMap.location}`
            document.querySelector("#Contamination").innerHTML = `${resultMap.confirmed} Contaminés`;
            document.querySelector("#Morts").innerHTML = `${resultMap.deaths} Morts`;

    }))
}


search.addEventListener("click", searchingResult)



