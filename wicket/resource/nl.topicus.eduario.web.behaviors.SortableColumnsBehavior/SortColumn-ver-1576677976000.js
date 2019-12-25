( function($) {
jQuery.fn.sortColumn = function()	{ 
$(this).on("sortupdate", function (event, ui) { 


if (this === ui.item.parent()[0]){
var receiveSortable = ui.item.closest('.jq-sortable');
var newIndex = $(this).children(".column").index(ui.item);
var kolomId = ui.item.attr('data-kolom');
var panel = ui.item.parent();
var originator = ui.sender !== null ? ui.sender : panel;

if (ui.sender !== null || newIndex != ui.item.data('startPosition'))
{
panel.serverCall({
method: "sorteerKolom",
args: [kolomId, newIndex],
success : function(allowed) {
if (allowed === false) {
originator.sortable('cancel');
}
}
});
}
}
}); 
$(this).on("sortstop", function(event, ui) {
ui.item.one("click.prevent", function(e){e.stopImmediatePropagation();});
setTimeout(function() {ui.item.unbind("click.prevent");}, 0);
});


};
})(jQuery);
