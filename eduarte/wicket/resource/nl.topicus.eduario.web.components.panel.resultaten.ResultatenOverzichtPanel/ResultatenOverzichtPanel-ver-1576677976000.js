$(function () {
jQuery.fn.resultatenCarousel = function () {
$(".result-overview--carousel").jcarousel();
$('.result-overview--carousel-prev')
.on('jcarouselcontrol:active', function() {
$(this).removeClass('inactive');
})
.on('jcarouselcontrol:inactive', function() {
$(this).addClass('inactive');
})
.jcarouselControl({
target: '-=1'
});
$('.result-overview--carousel-next')
.on('jcarouselcontrol:active', function() {
$(this).removeClass('inactive');
})
.on('jcarouselcontrol:inactive', function() {
$(this).addClass('inactive');
})
.jcarouselControl({
target: '+=1'
});
};
})