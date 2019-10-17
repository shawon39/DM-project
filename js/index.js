
$(window).on('resize', function() {

    if($(window).width() < 950) {

        $('.left-side').addClass('col-md-3');
        $('.left-side').removeClass('col-md-2');

        $('.right-side').addClass('col-md-9');
        $('.right-side').removeClass('col-md-10');

        $('.navbar-right-items').addClass('mr-auto');
        $('.navbar-right-items').removeClass('ml-auto');

    } else {
        $('.left-side').addClass('col-md-2');
        $('.left-side').removeClass('col-md-3');

        $('.right-side').addClass('col-md-10');
        $('.right-side').removeClass('col-md-9'); 

        $('.navbar-right-items').addClass('ml-auto');
        $('.navbar-right-items').removeClass('mr-auto');
    }

})