( function($) {
jQuery.fn.headerTabs = function()
{


var breakpointTwo = window.matchMedia("(min-width: 767px)");
var $headerTabs = $(this);
var $headerTabsUl = $headerTabs.find('ul');

var webkitTransition = $headerTabsUl.css('-webkit-transition');
var stdTransition = $headerTabsUl.css('transition');
$headerTabsUl.css({
'-webkit-transition': 'none',
'transition': 'none'
});


if(!breakpointTwo.matches) {
setListTransateY();
}

if(breakpointTwo.addListener) {

breakpointTwo.addListener(function() {
if(breakpointTwo.matches) {

$headerTabs.removeClass('is-open');
$headerTabsUl.css({
'-webkit-transition': 'none',
'-webkit-transform': 'translateY(0)',
'transition': 'none',
'transform': 'translateY(0)'
});
$headerTabs.css('max-height', 'auto');
} else {

$headerTabsUl.css({
'-webkit-transition': 'none',
'transition': 'none'
});
setListTransateY();
}
});
}
$(this).find('.header-tabs--toggle').click(function(e) {
console.log("toggle header-tabs");
$headerTabs.toggleClass('is-open');
if($headerTabs.hasClass('is-open')) {

$headerTabsUl.css({
'-webkit-transition': webkitTransition,
'-webkit-transform': '',
'transition': stdTransition,
'transform': ''
});
$headerTabs.css('max-height', $headerTabsUl.height());
} else {
$headerTabs.css('max-height', '');
setListTransateY();
}
});
function setListTransateY(webkitTransition) {

var liHeight = 0;
$liSelected = $headerTabsUl.find('li.is-selected');
$.each($liSelected.prevAll(), function(index, el) {
liHeight = liHeight + $(el).height();
});
$headerTabsUl.css({
'-webkit-transform': 'translateY(-' + liHeight + 'px)',
'transform': 'translateY(-' + liHeight + 'px)'
});
}
}
})(jQuery);
