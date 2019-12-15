
function success_function(response) {
    console.log(response)

    //creates variables from first Ajax call
    var name = response.name;
    console.log(name)
    var level = response.summonerLevel;
    console.log(level)
    var icon = response.profileIconId
    console.log(icon)
    var summonerId = response.id
    console.log(summonerId)

    var summoner = $("<div>").addClass("row")

    summoner.html(/*html*/`
                
                    <h3 class='row mx-auto'>Summoner: ${name} </h3>
                    <br>
                    <img class='row mx-auto' src="http://ddragon.leagueoflegends.com/cdn/9.24.2/img/profileicon/${icon}.png" alt="sumIcon" height="120px" width="120px">
                    <br>
                    <p class='row mx-auto'>Level: ${level}</p>

                
                `)

    $('#here').prepend(summoner)

    
    // second function for next Ajax call
    // need to create nested functions instead of just nested Ajax calls
    function secondAjax() {
        var queryURL ="https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"+ summonerId + "?api_key="+ api_key;
        console.log(summonerId)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (responseTwo) {
            console.log(responseTwo)

            var topChamp = responseTwo[0].championId
            console.log(topChamp)
            var champLevel = responseTwo[0].championLevel
            console.log(champLevel)
            var champPoints = responseTwo[0].championPoints
            console.log(champPoints)

            //third Ajax to get champion Name from champion id
            function thirdAjax() {
                var thirdURL = "http://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/champion.json"
                $.ajax({
                    url: thirdURL,
                    method: "GET"
                }).then(function (responseThree) {
                    console.log(summonerId)
                    console.log(topChamp)
                    console.log(responseThree)
                    var championList = responseThree.data
                    var championName = responseThree.data.id
                    var championNumber = responseThree.data.name
                    console.log(championName)
                    console.log(championNumber)
                    console.log(championList)
                    for (var i = 0; i< championList.length; i++) {
                        var championName = []


                    }

                })
            }
            thirdAjax();

         })
    }
    secondAjax();

}


// Alert error if an Ajax call does not work
function error_function() {
    alert("error")
}

//Api key for dev
//Must be refreshed each day
var api_key = 'RGAPI-a09bae12-057e-40b9-8bc0-e911cf6f337c';

// on click event to start the Ajax train
// "success_function" starts above, and the other Ajax calls are inside that function
$("#sumSearch").on("click", function () {

    var search_summoner = $('#summonerSearch').val().trim();
    console.log(search_summoner)

    var api_query = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + search_summoner + "?api_key=" + api_key;

    $.ajax({ url: api_query, success: success_function, error: error_function });
});