( function($) {
jQuery.fn.beyondData = function(options) {
var panel = this,
bodyCount = 0,
busy = false,
table = this.find("table"),
topMarker = $("<div />"),
visibleBodies = {},
firstBodyOffset,
lastHeight = 0,
scrollParent = $(window),
metadata = {};
function getTopOffset(includeScrollParentTop) {
var scrollParentTop = includeScrollParentTop && !$.isWindow(scrollParent[0])
? scrollParent.position().top : 0;
if ($.isFunction(options.topOffset)) {
return scrollParentTop + options.topOffset();
}
return scrollParentTop + options.topOffset;
}
function fixHeaderWidth() {
var fixedHeader = panel.find("table.fixed-header"),
fixedHeaders = fixedHeader.find("thead tr:first th"),
topOffset = getTopOffset(true);
if (fixedHeader.length > 0) {
fixedHeader.css({
"width": table.width(),
"top": topOffset + "px"
});
if (fixedHeaders.length > 0) {
table.find("thead tr:first th").each(function(index) {
$(fixedHeaders.get(index)).css({
"width": $(this).width(),
"-webkit-box-sizing": "content-box",
"-moz-box-sizing": "content-box",
"-ms-box-sizing": "content-box",
"-o-box-sizing": "content-box",
"box-sizing": "content-box"
});
});
}
}
topMarker.css("top", panel.position().top - getTopOffset(false) + "px");
}
function recalcHeight() {
var height = 0,
count = 0;
$.each(metadata, function(id, data) {
if (data.height) {
height += data.height / data.count * options.itemsPerPage;
count++;
}
});
height = count == 0 ? 30 * options.itemsPerPage : height / count;
if (Math.round(height) != Math.round(lastHeight)) {
lastHeight = height;
panel.find("tbody.data").each(function(index) {
var itemsOnPage = Math.min(options.itemsPerPage, options.itemCount - index * options.itemsPerPage),
curBody = $(this),
id = curBody.attr("id");
if (!metadata[id])
metadata[id] = { visible: false };
metadata[id].count = itemsOnPage;
metadata[id].heightEst = height / options.itemsPerPage * itemsOnPage;
if (curBody.find("tr").length === 0) {
curBody.css({
"display": "block",
"height": metadata[id].height ? metadata[id].height : metadata[id].heightEst
});
}
});
}
fixHeaderWidth();
}
function checkVisible() {
var vph = scrollParent.outerHeight(),
top = scrollParent.scrollTop() - options.viewportPadding,
bottom = top + vph + 2*options.viewportPadding,
curoffset = firstBodyOffset ? firstBodyOffset.top : 0,
topMarkerPosition = topMarker.position(),
topMarkerVisible = scrollParent.scrollTop() <= topMarkerPosition.top;
$.each(metadata, function(id, data) {
var height = data.height ? data.height : data.heightEst,
visible = curoffset < bottom && (curoffset + height) > top;
curoffset += height;
if (data.visible !== visible) {
inviewChanged(id, visible);
data.visible = visible;
}
});
if (topMarker.data("inview") !== topMarkerVisible) {
topMarker.data("inview", topMarkerVisible);
if (topMarkerVisible) {
panel.find(".fixed-header").remove();
} else {
var fixedHeader = $("<table class='fixed-header'/>")
.append(panel.find("thead").clone(true));
fixedHeader.addClass(table.attr("class"));
fixedHeader.css({
"position": "fixed",
"z-index": "1",
"display": "block",
"background": "white",
"border-bottom": "1px solid #DDD",
"margin-left": panel.find("table").css("margin-left")
});
topMarker.after(fixedHeader);
fixHeaderWidth();
}
}
}
function refetch() {
var fetchIds = [],
keepIds = [],
discardIds = [];
if (busy) {
return;
}
$.each(visibleBodies, function(id, visible) {
var body = $("#"+id);
var empty = body.find("tr").length === 0;
if (visible) {
if (empty) {
fetchIds.push(id);
} else {
keepIds.push(id);
}
} else {
if (!empty) {
discardIds.push({
index: metadata[id].index,
id: id
});
}
}
});
discardIds.sort(function(a, b) {
return b.index - a.index;
});
$.each(discardIds, function(index, entry) {
if (index >= options.cacheBodies) {
$("#"+entry.id).css({
"display": "block",
"height": metadata[entry.id].height
}).empty();
} else {
keepIds.push(entry.id);
}
});
if (fetchIds.length > 0) {
busy = true;
panel.serverCall({
method: "onScroll",
args: [fetchIds, keepIds],
success: function() {
$.each(fetchIds, function(index, id) {
var curBody = $("#"+id);
metadata[id].index = bodyCount++;
metadata[id].height = curBody.outerHeight();
});
busy = false;
recalcHeight();
panel.stopTime("refetch");
panel.oneTime("50ms", "refetch", refetch);
checkVisible();
}
});
}
}
function inviewChanged(tbodyId, visible) {
if (visibleBodies[tbodyId] !== visible) {
visibleBodies[tbodyId] = visible;
if (visible) {
metadata[tbodyId].index = bodyCount++;
}
panel.stopTime("refetch");
panel.oneTime("50ms", "refetch", refetch);
}
}
panel.prepend(topMarker);
topMarker
.data("inview", true)
.css({
"position": "absolute",
"top": panel.position().top - getTopOffset(false) + "px"
});
if (options.scrollParent) {
scrollParent = $(options.scrollParent);
}
firstBodyOffset = panel.find("tbody.data:first-of-type").offset();
recalcHeight();
var panelId = panel.attr("id");
$(window).off(".beyonddatapanel-" + panelId);
$(window).on("resize.beyonddatapanel-" + panelId, function(){ fixHeaderWidth(); checkVisible(); });
scrollParent.scroll(checkVisible);
$(window).on("click.beyonddatapanel-" + panelId, checkVisible);
panel.stopTime("refetch");
checkVisible();
refetch();
}
})(jQuery);