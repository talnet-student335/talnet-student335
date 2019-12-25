$(function() {
jQuery.fn.booleanEditPanel = function() {
var $this = $(this);
function switchState($item) {
$item.parent().addClass("is-selected");
$item.parent().siblings().removeClass('is-selected');
var $hiddenField = $item.closest('.popover-tabs').children('input');
$hiddenField.val($item.attr('data-booleanvalue'));
$hiddenField.change();
}

var switchLinks = $this.find(".popover-tabs a");
if (switchLinks.length == 0)
switchLinks = $this.parent().find(".popover-tabs a"); 
switchLinks.click(function() {
switchState($(this));
});
}
});
