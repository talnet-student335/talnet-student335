(function($) {
jQuery.fn.eduArioFeedback = function() {
var $this = $(this),
$contentWrapper = $this.closest(".content-wrapper"),
defaultClasses = $contentWrapper.attr("class");
function updateFeedbackCount() {
var height = 0,
margin = 0;
$this.find("li:not(.is-hidden-feedback)").each(function() {
height += $(this).outerHeight(true);
margin = $(this).css("margin-bottom");
});
height += parseFloat(margin);
$contentWrapper.css("margin-top", height + "px");
}
function hideFeedback($item) {
$item
.css("margin-bottom", "-" + $item.outerHeight() + "px")
.addClass("is-hidden-feedback");
}
setTimeout(function() {
$this.find("li.feedbackPanelSUCCESS").each(function(idx, element) {
hideFeedback($(element));
});
updateFeedbackCount();
}, 3500);
$this.find("li").click(function() {
hideFeedback($(this));
updateFeedbackCount();
}).on("transitionend", function() {
$(this).hide();
});
$contentWrapper.css({"-webkit-transition": "none", "transition": "none"});
updateFeedbackCount();
setTimeout(function() {
$contentWrapper.css({"-webkit-transition": "", "transition": ""});
}, 0);
$(window).resize(updateFeedbackCount);
}
})(jQuery);