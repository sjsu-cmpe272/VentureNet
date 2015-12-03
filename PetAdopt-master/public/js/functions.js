/* ////////////////////////////////////////////////////////////////////////

SLIDER

//////////////////////////////////////////////////////////////////////// */
$(window).load(function ()
{
    $('#slider').nivoSlider({
        effect: 'random', //Specify sets like: 'fold,fade,sliceDown'
        slices: 15,
        animSpeed: 500, //Slide transition speed
        pauseTime: 5000,
        startSlide: 0, //Set starting Slide (0 index)
        directionNav: true, //Next & Prev
        directionNavHide: true, //Only show on hover
        controlNav: true, //1,2,3...
        controlNavThumbs: false, //Use thumbnails for Control Nav
        controlNavThumbsFromRel: false, //Use image rel for thumbs
        controlNavThumbsSearch: '.jpg', //Replace this with...
        controlNavThumbsReplace: '_thumb.jpg', //...this in thumb Image src
        keyboardNav: true, //Use left & right arrows
        pauseOnHover: true, //Stop animation while hovering
        manualAdvance: false, //Force manual transitions
        captionOpacity: 0.8, //Universal caption opacity
        beforeChange: function () { },
        afterChange: function () { },
        slideshowEnd: function () { } //Triggers after all slides have been shown
    });
});


/* ////////////////////////////////////////////////////////////////////////

TOOLTIP

//////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	$(".with-tooltip").simpletooltip();
});



/* ////////////////////////////////////////////////////////////////////////

ANCHOR

//////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	$("a.anchorLink").anchorAnimate()
});

jQuery.fn.anchorAnimate = function(settings) {

 	settings = jQuery.extend({
		speed : 1100
	}, settings);	
	
	return this.each(function(){
		var caller = this
		$(caller).click(function (event) {	
			event.preventDefault()
			var locationHref = window.location.href
			var elementClick = $(caller).attr("href")
			
			var destination = $(elementClick).offset().top;
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, settings.speed, function() {
				window.location.hash = elementClick
			});
		  	return false;
		})
	})
}