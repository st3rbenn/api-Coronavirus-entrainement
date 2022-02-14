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
    let country = document.querySelector("#country").value
    let map = new Map;
    let url = `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=${country}`;
    console.log(url)
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
        console.log([lastChecked])
        let infoDisplay = [lastChecked].toString().split("T")
        //formatage de la date
        function date(){
           let date = infoDisplay[0].split("-");
           let dateDisplay = move(date, 0, 2);
           return move(dateDisplay, 0, 1).join("-")
        }
        //formatage de l'heure
        function hours(){
            let hours = infoDisplay[1].split("+")[0].split(":").splice(0, 2).join("h")
            return hours
        }
            document.querySelector("#cardList").classList.remove("visually-hidden")
            document.querySelector("#info").innerHTML = `Dernière mise à jour le <br>${date()} à ${hours()}`
            document.querySelector("#location").innerHTML = `${resultMap.location}`
            document.querySelector("#Contamination").innerHTML = `${resultMap.confirmed} Contaminés`;
            document.querySelector("#Morts").innerHTML = `${resultMap.deaths} Morts`;

    }))
    .catch(err => {
        console.error(err);
    });
}
document.querySelector("#search").addEventListener("click", searchingResult)



function covidInfo() {
    let url = `https://coronavirus-smartable.p.rapidapi.com/news/v1/FR/`;
    fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-smartable.p.rapidapi.com",
                "x-rapidapi-key": "57d1b3c15dmsh08a19a1a3791ff7p1a5e59jsn0a60153793aa"
            }
        })
        .then(response => response.json().then((data) => {
            console.log(data)


        }))
        .catch(err => {
            console.error(err);
        });
}

