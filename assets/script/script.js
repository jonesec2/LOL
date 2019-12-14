
function success_function(response) {
    console.log(response)

    var api_queryTwo = "http://ddragon.leagueoflegends.com/cdn/9.24.2/img/profileicon/" + icon + ".png"

    // $.ajax({
    //     url: api_queryTwo,
    //     method: "GET"
    // });.then(function (secondResponse) {
     
    // }



    var name = response.name;
    console.log(name)
    var level = response.summonerLevel;
    console.log(level)
    var icon = response.profileIconId
    console.log(icon)

    var summoner = $("<div>").addClass("row")

    summoner.html(/*html*/`
                
                    <h3 class='row mx-auto'>Summoner: ${name} </h3>
                    <br>
                    <img class='row mx-auto' src="http://ddragon.leagueoflegends.com/cdn/9.24.2/img/profileicon/${icon}.png" alt="sumIcon" height="120px" width="120px">
                    <br>
                    <p class='row mx-auto'>Level: ${level}</p>

                
                `)

    $('.container').append(summoner)


}

function error_function() {
    alert("error")
}

var api_key = 'RGAPI-2ea1f44d-7330-4795-9c71-9b8f38090a5b';

$("#sumSearch").on("click", function () {

    var search_summoner = $('#summonerSearch').val().trim();
    console.log(search_summoner)

    var api_query = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + search_summoner + "?api_key=" + api_key;

    $.ajax({ url: api_query, success: success_function, error: error_function });
});