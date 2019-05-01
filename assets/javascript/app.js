$(document).ready(function () {

    var playerArray = ["Messi", "Ronaldo", "Neymar", "Ronaldinho"]

    function showPlayer() {
        var player = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=PFYY2SlwEug7EOJUMQH7NGhaxhf5qhEz&q="
            + player + "&limit=25&offset=0&rating=G&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response.data)

            var playerData = response.data;

            for (var i = 0; i < playerData.length; i++) {
                var gifContainer = $("<div>").addClass("player-img")

                var rating = playerData[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var playerImg = ("<img>");

                playerImg.attr("src", playerData[i].images.fixed_height.url);

                gifContainer.prepend(p);
                gifContainer.prepend(playerImg);

                $("#player-view").prepend(gifContainer);
            }
        });
    }

    function createButton() {
        $("#main-btn").empty();

        for (var i = 0; i < playerArray.length; i++) {
            var btn = $("<button>");

            btn.addClass("player-btn");
            btn.attr("data-name", playerArray[i]);
            btn.text(playerArray[i]);
        }
        console.log(playerArray)
    }


    $("#add-player").on("click", function (event) {
        event.preventDefault();

        var player = $("#player-input").val().trim();

        playerArray.push(player);

        createButton();
    });

    $(document).on("click", ".player-btn", showPlayer);

    createButton();


})


