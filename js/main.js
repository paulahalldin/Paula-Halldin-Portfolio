$(function() {
    // Check what page to be displayed
    pageHandler()
    //Show body after page check
    $("body").css("opacity", "1")

    $(".text_container .page-link").each(function() {
        var href = $(this).attr('href')
        var gif_id = href + "_gif"
        var gif_path = "img/" + href.replace("#", "") + ".gif"

        $(".gif_container").append('<img id="' + gif_id.replace("#", "") + '" src="' + gif_path + '"/>')

        $(this).hover(
            function() {
                console.log(gif_id)

                randomPosition($(gif_id))

            }, function() {
                $(gif_id).hide()
            }
        );
    });

    $(".gif-link").each(function() {

        var gif_path = "img/" + $(this).attr('id') + ".gif"
        console.log(gif_path)
        var m_id = "#" + $(this).attr('id') + "_gif"
        $(".gif_container").append('<img id="' + m_id.replace("#", "") + '"src="' + gif_path + '"/>')

        $(this).hover(
            function() {
                console.log("ff")

                randomPosition($(m_id))

            }, function() {
                $(m_id).hide()
            }
        );

    });



})

// Fade out text to only show work links
$("#work").click(function() {
    $(".right-column p").toggleClass('faded-out')
    console.log("pauls")
});

// Look for hash changes to change page
window.onhashchange = function() {
    pageHandler()
}

// Function to show corretc page according to hash
function pageHandler() {
    if (window.location.hash == '') {
        // If no hash, hide all work pages
        $("article").addClass('article-hidden')
    } else {
        // Create work page id
        var pageName = "#" + window.location.hash.substring(1) + "-page"
            // Show requeested work page
        $(pageName).removeClass('article-hidden')
        // Make main txt all black again
        $(".right-column p").removeClass('faded-out')
    }
}




$("#apple-link").hover(
    function() {
        randomPosition($("#gif_hush"))

    }, function() {
        $("#gif_hush").hide()
    }
);


function randomPosition(gif) {

    var gifWidth = gif.width()
    var gifHeight = gif.height()

    // make position sensitive to size and document's width
    var posx = (Math.random() * ($(document).width() - gifWidth)).toFixed();
    var posy = (Math.random() * ($(document).height() - gifHeight)).toFixed();

    gif.css({
        'left': posx + 'px',
        'top': posy + 'px',
        'display': 'block'
    });
}