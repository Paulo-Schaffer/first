$('nav a').click(function(e){
    var id = $(this).attr('href');

    debugger;
    if (id == "/login") {
        return;
    }
	e.preventDefault();
	targetOffset = $(id).offset().top;

	$('html, body').animate({ 
		scrollTop: targetOffset -100
	  }, 500);
});

