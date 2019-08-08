1.1
window
obj

function show () {
	console.log('this:', this);
}
var obj = {
	show: show
};
obj.show();

function show () {
	console.log('this:', this);
}
var obj = {
	show: function() {
		show();
	}
};
obj.show();