var src = "/test-images/claimer.png";
var scope = this;
var channels = [
    "red",
    "green",
    "blue",
    "alpha",
];
var transparencyColour = new Colour(255, 242, 0, 255);
this.$getImage(src).unbind("load").load(function() {
    var img = $(this).get(0);
    ctx.drawImage(img,0,0);
    
    var px = scope.getPixels(img);
    scope.width = px.width;
    scope.height = px.height;
    
    console.log(img, px, px.data.length);
    jQuery.each(px.data, function(key, value) {
        var channel = key%channels.length;
        if (channel===0) {
            var pixel = key/channels.length;
            var x = pixel%px.width;
            var y = (pixel-x)/px.width;
            // From first channel in the pixel.
            var colour = new Colour(
                px.data[key],
                px.data[key+1],
                px.data[key+2],
                px.data[key+3]
            );
            if (colour.equals(transparencyColour)) {
                ctx.clearRect(x,y,1,1);
            }
        }
    });
});
