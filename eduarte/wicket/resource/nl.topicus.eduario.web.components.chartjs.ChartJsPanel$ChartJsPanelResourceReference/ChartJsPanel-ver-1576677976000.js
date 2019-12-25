(function(window) {
var defaultDonutChartOptions = defaultDonutChartOptions
|| {
animation : {
animateScale : false,
animateRotate : true,
duration : 500
},
legend : {
display : false
},
tooltips : {
callbacks : {
label : function(tooltipItem, data) {
var label = data.labels[tooltipItem.index];
if (label){
return data.labels[tooltipItem.index]
+ ': '
+ data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
}
return this._chart.canvas.attributes['noDataLabel'].value;
}, 
}
},
legendCallback : function(chart) {
var text = [];
var data = chart.data;
var datasets = data.datasets;
var labels = data.labels;
var colors = datasets[0].backgroundColor;
text.push('<ul class="' + chart.id + '-legend">');
for (var i = 0; i < datasets[0].data.length; i++) {
if (labels[i]) {
text.push('<li>');
if (colors[i]) {
text
.push('<svg xmlns="http://www.w3.org/2000/svg" class="legendCircle"><circle cx="10" cy="10" r="10" fill="'
+ colors[i]
+ '"></circle></svg>');
}
text.push(' ' + labels[i] + ' ('
+ datasets[0].data[i] + ')');
text.push('</li>');
}
}
text.push('</ul>');
return text.join("");
},
responsive : false,
cutoutPercentage : 78,
};
Chart.pluginService
.register({
beforeDraw : function(chart) {
var width = chart.chart.width, height = chart.chart.height, ctx = chart.chart.ctx;
ctx.restore();
var fontSizeNumber = (height / 70).toFixed(2);
ctx.font = "bold " + fontSizeNumber + "em verdana";
ctx.fillStyle = "#404F54";
ctx.textBaseline = "middle";
var centerText = $(chart.chart.canvas).attr("centerText");
var number = $(chart.chart.canvas).attr("number");
textX = Math
.round((width - ctx.measureText(number).width) / 2),
textY = height / 2;
ctx.fillText(number, textX, textY);
var fontSizeCenterText = (fontSizeNumber / 3.5).toFixed(2);
ctx.font = "bold " + fontSizeCenterText + "em verdana";
textX = Math.round((width - ctx
.measureText(centerText).width) / 2),
textY = textY + 40;
ctx.fillText(centerText, textX, textY);
ctx.save();
}
});
window.EduarteChartJs = window.EduarteChartJs
|| {
Charts : {},
drawChartJsDonutChart : function(id, doughnutData, options,
number, centerText, noDataLabel) {
var ctx = $("#" + id).get(0).getContext("2d");
var datasets = doughnutData.datasets;
addPlaceholderData(datasets);
var myDoughnut = new Chart(ctx, {
type : 'doughnut',
data : doughnutData,
options : $.extend(defaultDonutChartOptions, options)
});
this.Charts[id] = myDoughnut;
$("#" + id).attr('number', number);
$("#" + id).attr('centerText', centerText);
$("#" + id).attr('noDataLabel', noDataLabel || 'Geen gegevens');
$("#" + id).siblings("#legendDiv").html(
myDoughnut.generateLegend());
return myDoughnut;
},
updateChartJsDonutChart : function(id, updatedData, number) {
var donutChart = this.Charts[id];
var datasets = donutChart.data.datasets;
datasets[0].data = updatedData;
addPlaceholderData(datasets);
donutChart.update(500, false);
$("#" + id).attr('number', number);
$("#" + id).siblings("#legendDiv").html(
donutChart.generateLegend());
},
};

	
	function addPlaceholderData(datasets) {
var total = datasets[0].data.reduce(function(a, b) {
return a + b;
});
if (total == 0) {
datasets[0].data.push(1);
datasets[0].backgroundColor.push("#C3C9CE");
}
}
;
})(window);
