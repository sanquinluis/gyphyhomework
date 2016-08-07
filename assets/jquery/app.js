$(document).ready(function(){

    //Universal variables that access the api giphy source.
    var api = 'https://api.giphy.com/v1/gifs/search?q=';
    //api key that authorize the use of the the web-page.
    var apiKey = '&api_key=dc6zaTOxFJmzC';
    //this is my array of countries that are push to the <div> with the class of .rightIn.
    var theCountry = ['Canada', 'United States', 'Mexico', 'Guatemala', 'Belize', 'Cuba',
    'Honduras', 'El Salvador', 'Nicaraguas', 'Costa Rica', 'Panama', 'Jamaica','Haiti',
    'Dominican Republic', 'Puerto Rico'];
    //This var is limiting the number of giphy shown on the screen.
    var limit = '&limit=10&q=';
    var valueInput = $('#gyphy-input').val().trim();
    //This adds all the access point
    var urlCombo = api + valueInput + apiKey + limit;
    //=============================================================================
    //First function that controls the buttons that are inside the array and the on
       $(document.body).on('click', '.country', function() {
            var countryName = $(this).attr('name');
            $(".hereTheyare").empty();

        $.ajax({url: urlCombo + countryName,

            method: 'GET'
        })

        //Function that creates a div and puts the Image.
        .done(function(response) {

            //This for loop is going inside the new created giphys 
            var theGif = response.data;
            for (var i = 0; i < theGif.length; i++) {

                var newDivGif = $('<div>');

                var rating = $('<p>').text("Rated: " + theGif[i].rating);
                // .css({'margin':'5px','width': '200px', 'height':'200px','float':'left'})
                var theImages = $('<img>')
                    .addClass('gifyIm')
                    .attr('src', theGif[i].images.fixed_height_still.url)
                    .attr('data-still', theGif[i].images.fixed_height_still.url)
                    .attr('data-animate', theGif[i].images.fixed_height.url)
                    .attr('data-state', 'still');

                newDivGif.append(rating);
                newDivGif.append(theImages);
                $('.hereTheyare').append(newDivGif);
                $('.hereTheyare').append(newDivGif);
            }
                console.log(response);
                console.log(rating);
        });
    });
            //animating and stopping the giphy
            $(document).on('click','.gifyIm', function(){
                var state = $(this).attr('data-state');
                if (state == 'still') {
                            $(this).attr('src', $(this).data('animate'));
                            $(this).attr('data-state', 'animate');
                 }  else {
                            $(this).attr('src', $(this).data('still'));
                            $(this).attr('data-state', 'still');
                    }
            })
            console.log(urlCombo);
            console.log(valueInput);
            // console.log();

        //This function "adds" the buttons
        function renderButtons(){
            $(".rightIn").empty();
            $.each(theCountry,function(index,element){
            var newButton = $("<button/>").addClass( "btn btn-info country").attr('name',element).text(element).css({'margin': '5px'});
            $(".rightIn").append(newButton);
        });

    }
        // This handels the event when click
        $('#theButton').on('click', function(){
            //adds the new country
            var countryWow = $("#gyphy-input").val().trim();
            theCountry.push(countryWow);
            renderButtons()
        $("#gyphy-input").val("");
            return false;
    })

            renderButtons();

});