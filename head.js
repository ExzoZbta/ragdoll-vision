function Circle(x, y, r, static) {
    var options = {
        isStatic: static,
        restitution: 0.7
    };
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;

    World.add(world, this.body);

    this.show = function() {
        push();
        fill(255);
        strokeWeight(2);
        stroke(0);
        var pos = this.body.position;
        var angle = this.body.angle;
        translate(pos.x, pos.y);
        rotate(angle);
        ellipseMode(CENTER);
        ellipse(0, 0, this.r * 2);
        pop();
    };

    // Method to check collision with other bodies
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