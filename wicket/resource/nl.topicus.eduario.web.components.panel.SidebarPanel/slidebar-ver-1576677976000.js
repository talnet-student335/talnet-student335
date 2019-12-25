$(function() {
$('body').on('click', '.js-filterbar-toggle a', function(e) {
e.preventDefault();
var $tab = $(this);
toggleSlidebarTab($tab);
});
function toggleSlidebarTab($tab) {
var $slidebar = $('.s5-aside-slidebar');
var targetSelector = $tab.attr('href');
var $target = $(targetSelector);

 $('.s5-filterbar-toggle.active').removeClass('active');

 if ($target.is('.active')) {
$slidebar.removeClass('open');
$target.removeClass('active');
$tab.parent().removeClass('active');
} else {
$('.s5-filterbar-container.active').removeClass('active');
$slidebar.addClass('open');
$tab.parent().addClass('active');
$target.addClass('active');
}
}
jQuery.fn.toggleTabWithId = function(id) {
var $tab = $('a[href="#' + id + '"]');
toggleSlidebarTab($tab);
}
})
