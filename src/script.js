import $ from "jquery";

// ---------Responsive-navbar-active-animation-----------
function test() {
    var tabsNewAnim = $('#navbarSupportedContent');
    
    // Check if tabsNewAnim exists before continuing
    if (!tabsNewAnim.length) return;  // Exit if the element doesn't exist

	// eslint-disable-next-line no-unused-vars
    var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
    var activeItemNewAnim = tabsNewAnim.find('.active');
    
    // If no active item is found, exit
    if (!activeItemNewAnim.length) return;

    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();

    if (!itemPosNewAnimTop || !itemPosNewAnimLeft) return; // Prevent errors if position is not available

    $(".hori-selector").css({
        "top": itemPosNewAnimTop.top + "px",
        "left": itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
    });

    // Add click event listener for active item animation
    $("#navbarSupportedContent").on("click", "li", function () {
        $('#navbarSupportedContent ul li').removeClass("active");
        $(this).addClass('active');
        
        var activeWidthNewAnimHeight = $(this).innerHeight();
        var activeWidthNewAnimWidth = $(this).innerWidth();
        var itemPosNewAnimTop = $(this).position();
        var itemPosNewAnimLeft = $(this).position();

        if (!itemPosNewAnimTop || !itemPosNewAnimLeft) return; // Prevent errors if position is not available

        $(".hori-selector").css({
            "top": itemPosNewAnimTop.top + "px",
            "left": itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
        });
    });
}

$(document).ready(function () {
    setTimeout(function () {
        test();
    });
});

$(window).on('resize', function () {
    setTimeout(function () {
        test();
    }, 500);
});

$(".navbar-toggler").click(function () {
    $(".navbar-collapse").slideToggle(300);
    setTimeout(function () {
        test();
    });
});

// --------------add active class-on another-page move----------
$(document).ready(function () {
    var path = window.location.pathname.split("/").pop();

    if (path === '') {
        path = 'index.html';
    }

    var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
    target.parent().addClass('active');
});
