this.width = 20;
this.height = 20;
ctx.fillStyle = "rgb( 255, 0, 0)";
this.fillTriangle(ctx, {x:5,y:7},{x:15,y:3},{x:15,y:10});
ctx.strokeStyle = "rgb( 0, 0, 0)";
this.drawLine(ctx, {x:15, y:3}, {x:15,y:15});
