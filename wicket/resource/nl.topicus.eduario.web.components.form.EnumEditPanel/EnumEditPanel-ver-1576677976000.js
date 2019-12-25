$(function() {
$(document).on('click', '.popover-tabs a', function(e) { 
if (!$(this).parent().hasClass('is-selected')) {
$(this).parent().addClass('is-selected');
$(this).parent().siblings().removeClass('is-selected');
$(this).closest('.popover-tabs').children('input').val($(this).parent().attr('data-enumvalue'));
$(this).closest('.popover-tabs').children('input').change();
}
});
});