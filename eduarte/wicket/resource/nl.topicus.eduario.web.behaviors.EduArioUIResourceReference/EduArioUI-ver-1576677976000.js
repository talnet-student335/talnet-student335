(function($) {
jQuery.fn.popoutToggle = function() {
this.on('click', '.popout--toggle', function(e) {
$(this).closest('div.has-popout').toggleClass('is-open');
});
};
jQuery.fn.menuToggle = function() {
this.on('click', function() {
$('nav.navigation').toggleClass('is-open');
$('body').toggleClass('is-locked');
});
};
jQuery.fn.filterToggle = function() {
this.on('click', '.filter--toggle', function(e) {
$(this).closest('div.signal--filter').toggleClass('is-open');
});
};
jQuery.fn.multiLineToggle = function() {
this.on('click', function(e) {
if ($(this).hasClass('show-all'))
$(this).html($(this).html().replace(/<br>/g, '&nbsp;'));
else
$(this).html($(this).html().replace(/&nbsp;/g, '<br>'));
$(this).toggleClass('show-all');
});
};
jQuery.fn.panelToggle = function() {
this.on('click', '.s5-toggle', function(e) {
var $parent = $(this).parent();
if ($parent.hasClass('s5-open')) {
$parent.removeClass('s5-open');
$parent.addClass('s5-close');
} else {
$parent.removeClass('s5-close');
$parent.addClass('s5-open');
}
});
}
jQuery.fn.closeAllThemesToggle = function() {
this.on('click', function(e) {
$('.theme > .studyguide-header').removeClass('s5-open').addClass('s5-close');
});
}
jQuery.fn.openAllThemesToggle = function(parentClass) {
this.on('click', function(e) {
$('.theme > .studyguide-header').removeClass('s5-close').addClass('s5-open');
});
}
})(jQuery);
