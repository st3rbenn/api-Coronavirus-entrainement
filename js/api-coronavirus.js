let country = document.querySelector("#country")
let map = new Map;
let search = document.querySelector("#search")

function move(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }
     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);  
   return arr;
}


function searchingResult(){
    let url = `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=${country.value}`;

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
            "x-rapidapi-key": "bcf21581aamsh871a6b42f118933p161d62jsn2c24c88dd6e5"
        }
    }).then((response) => response.json().then((data) => {
        let mapped = map.set(data).entries().next().value;
        let resultMap = mapped[0].data;
        console.log(resultMap)
        let lastChecked = resultMap.lastReported
        let infoDisplay = [lastChecked].toString().split("T")
        console.log(infoDisplay)
        //date
        function date(){
           let date = infoDisplay[0].split("-");
           let dateDisplay = move(date, 0, 2);
           return move(dateDisplay, 0, 1).join("-")
        }
        function hours(){
            let hours = infoDisplay[1].split("+")
            console.log(hours)
            return hours[0].split(":").splice(0, 2).join("h")
        }console.log(hours())

            document.querySelector("#info").innerHTML = `Dernière mise à jour le <br>${date()} à ${hours()}`
            document.querySelector("#location").innerHTML = `${resultMap.location}`
            document.querySelector("#Contamination").innerHTML = `${resultMap.confirmed} Contaminés`;
            document.querySelector("#Morts").innerHTML = `${resultMap.deaths} Morts`;

    }))
}

search.addEventListener("click", searchingResult)