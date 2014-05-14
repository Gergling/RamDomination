// Isometric octagonal platform
var scope = this;
this.width = 50;
this.height = 100;

var ow = this.width;
var oh = 26;
var qw = ow/4;
var qh = oh/4;

// New/Improved Platform
var lt = new Point(0, qh);
var tl = new Point(qw, 0);
var lb = new Point(0, qh*3);
var tr = new Point(qw*3, 0);
var bl = new Point(qw, oh);
var rt = new Point(ow, qh);
var br = new Point(qw*3, oh);
var rb = new Point(ow, qh*3);
var l = new Point();
var r = new Point();
var currentColour = new Colour();

// Top/Left
var startColour = new Colour(200, 200, 200);
var endColour = new Colour(180, 180, 180);
var res = {from:0, to:30};
for(var i=res.from;i<res.to;i++) {
	ctx.strokeStyle = currentColour.linearFade(i, res.from, res.to, startColour, endColour).toString();
	l.linearMove(i, res.from, res.to, lt, lb).floor();
	r.linearMove(i, res.from, res.to, tl, tr).floor();
	this.drawLine(ctx, l, r);
}

// Middle
var startColour = new Colour(180, 180, 180);
var endColour = new Colour(150, 150, 150);
var res = {from:0, to:Math.ceil(tr.pyth(rt))*3};
for(var i=res.from;i<res.to;i++) {
	ctx.strokeStyle = currentColour.linearFade(i, res.from, res.to, startColour, endColour).toString();
	l.linearMove(i, res.from, res.to, lb, bl).floor();
	r.linearMove(i, res.from, res.to, tr, rt).floor();
	this.drawLine(ctx, l, r);
}

// Bottom/Right
var startColour = new Colour(150, 150, 150);
var endColour = new Colour(100, 100, 100);
var res = {from:0, to:30};
for(var i=res.from;i<res.to;i++) {
	ctx.strokeStyle = currentColour.linearFade(i, res.from, res.to, startColour, endColour).toString();
	l.linearMove(i, res.from, res.to, bl, br).floor();
	r.linearMove(i, res.from, res.to, rt, rb).floor();
	this.drawLine(ctx, l, r);
}

// Column support
var facetColours = {};
var facets = {
    left: new Colour(200, 200, 200),
    middle: new Colour(150, 150, 150),
    right: new Colour(100, 100, 100),
};
var facetPoints = {
    left: {
        l:lb,
        r:bl,
    },
    middle: {
        l:bl,
        r:br,
    },
    right: {
        l:br,
        r:rb,
    },
};
jQuery.each(facets, function(facet, colour) {
    facetColours[facet] = {
        start: colour,
        end: (new Colour()).copy(colour),
    };
    facetColours[facet].end.alpha = 0;
});
var lines = this.height-oh;
for(var i=0;i<lines;i++) {
    jQuery.each(facets, function(facet) {
        ctx.strokeStyle = currentColour.linearFade(i, 0, lines, 
            facetColours[facet].start, 
            facetColours[facet].end
        ).toString();
        l.copy(facetPoints[facet].l).floor().y+=i;
        r.copy(facetPoints[facet].r).floor().y+=i;
        scope.drawLine(ctx, l, r);
    });
}

// Grid
ctx.strokeStyle = 'rgb(200,200,200)';
this.drawLine(ctx, tl, rb);
this.drawLine(ctx, lt, br);
this.drawLine(ctx, tr, lb);
this.drawLine(ctx, rt, bl);
