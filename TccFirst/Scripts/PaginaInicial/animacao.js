var $target = $('.anime'),
    animationClass = 'anime-start';
    offset = $(window).height() * 3/4;
function animeScroll() {
    var documentTop = $(document).scrollTop();
console.log(documentTop)
    $target.each(function () {
        var itemTop = $(this).offset().top;
        if (documentTop < itemTop) {
            $(this).removeClass('anime');
        } else {
            $(this).removeClass('anime-start');
        }
    })
}
animeScroll();