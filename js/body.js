function Rectangle(x, y, w, h, static, addToWorld) {
    var options = {
        isStatic: static,
        restitution: 0.7
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    if (addToWorld) {
        World.add(world, this.body);
    }

    this.show = function() {
        push();
        fill(255);
        strokeWeight(2);
        stroke(0);
        var pos = this.body.position;
        var angle = this.body.angle;
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        rect(0, 0, this.w, this.h);
        pop();
    };

  // Method to check collision with other bodies
  this.collidesWith = function(others) {
      for (var i = 0; i < others.length; i++) {
          var other = others[i];
          var collision = Matter.Query.collides(this.body, other.body);
          console.log('Collision:', collision);
          if (collision && collision.length > 0) {
              return true;
          }
      }
      return false;
  };

}