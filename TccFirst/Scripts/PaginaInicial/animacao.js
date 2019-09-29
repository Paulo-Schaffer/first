var $target = $('.anime'),
    animationClass = 'anime-start';
    offset = $(window).height() * 3/4;

function animeScroll() {
    var documentTop = $(document).scrollTop();
console.log(documentTop)
    $target.each(function () {
        var itemTop = $(this).offset().top;
        console.log(itemTop)
        if (documentTop < itemTop) {
            $(this).addClass('anime-start');
            
        } else {
            $(this).removeClass('anime-start');
        }
    })
}
animeScroll();