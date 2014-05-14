// Isometric octagonal platform
var scope = this;
var blockSize = {
    w:50,
    h:26,
};
this.width = blockSize.w/2;
this.height = blockSize.h;

var ow = this.width;
var oh = this.height/2;
var hw = ow/2;
var hh = oh/2;

var points = {
    t:new Point(hw, 0),
    r:new Point(ow, hh),
    b:new Point(hw, oh),
    l:new Point(0, hh),
};
var l = new Point();
var r = new Point();
var currentColour = new Colour();

var startColour = new Colour(190, 190, 190);
var endColour = new Colour(150, 150, 150);
var res = {from:0, to:Math.ceil(points.t.pyth(points.r))*3};

// Top
for(var i=res.from;i<res.to;i++) {
	ctx.strokeStyle = currentColour.linearFade(i, res.from, res.to, startColour, endColour).toString();
	l.linearMove(i, res.from, res.to, points.l, points.b).floor();
	r.linearMove(i, res.from, res.to, points.t, points.r).floor();
	this.drawLine(ctx, l, r);
}

// Bottom
for(var i=res.from;i<res.to;i++) {
	ctx.strokeStyle = currentColour.linearFade(i, res.from, res.to, startColour, endColour).toString();
	l.linearMove(i, res.from, res.to, points.t, points.l).floor().y+=oh;
	r.linearMove(i, res.from, res.to, points.r, points.b).floor().y+=oh;
	this.drawLine(ctx, l, r);
}
