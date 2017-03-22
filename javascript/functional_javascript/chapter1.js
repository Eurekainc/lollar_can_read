function splat(fun) {
  return function(array) {
    return fun.apply(null, array);
  }
}

var addEmAll = splat(function(x,y) { return x + y });

debug(addEmAll([1,2]));
// => 3

function unsplat(fun) {
  return function() {
    return fun.call(null, _.toArray(arguments))
  }
}

// var joinElements = unsplat(function(array) { return array.join(' ')} );
// joinElements(1,2);
// won't actually work with out having underscore installed
