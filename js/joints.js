function Connection(objectA, objectB, offsetA, offsetB) {
  var options = {
    bodyA: objectA.body,
    pointA: offsetA,
    bodyB: objectB.body,
    pointB: offsetB,
    length: 0
  };
  this.connection = Constraint.create(options);
  World.add(world, this.connection);
}