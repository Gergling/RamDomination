// Isometric octagonal platform
this.width = 50;
this.height = 100;

// Platform
ctx.fillStyle = "rgb( 255, 0, 0)";
ctx.strokeStyle = "rgb( 0, 0, 0)";
var ow = this.width;
var oh = 26;
var qw = ow/4;
var qh = oh/4;
var points = [
    [qw, 0],
    [qw*3, 0],
    [ow, qh],
    [ow, qh*3],
    [qw*3, oh],
    [qw, oh],
    [0, qh*3],
];
ctx.moveTo(0,qh);
jQuery.each(points, function(idx, point) {
	ctx.lineTo(point[0],point[1]);
});
ctx.closePath();
ctx.fill();

// New/Improved Platform
var lt = new Point(0, qh);
var tl = new Point(qw, 0);
var lb = new Point(0, qh*3);
var tr = new Point(qw*3, 0);
var l = new Point();
var r = new Point();
var startColour = new Colour(200, 200, 200);
var endColour = new Colour(150, 150, 150);
var currentColour = new Colour();
var res = {from:0, to:20};
for(var i=res.from;i<res.to;i++) {
	ctx.strokeStyle = currentColour.linearFade(i, res.from, res.to, startColour, endColour).toString();
	l.linearMove(i, res.from, res.to, lt, lb).floor();
	r.linearMove(i, res.from, res.to, tl, tr).floor();
	this.drawLine(ctx, l, r);
}


// Column support
