

// Animated text
var target = $('#target');
var change = function(str) {
  var tmp = $('<h1>' + str + '</h1>');
  tmp.css({
      display: "inline-block",
      position: "absolute",
      
    })
    .appendTo('body')
    .hide();
  var targetWidth = tmp.outerWidth();
  tmp.remove();
  target.animate({
    opacity: 0
  }, 200, function() {
    target.animate({
      width: targetWidth
    }, 300, function() {
      target.empty()
        .html(str)
        .css({
          display: "initial"
        })
        .animate({
          opacity: 1
        }, 200);
    });
  });
}
var samples = [
    "HEALTHY","SMART","YUMMY", "FRESH"
];
var i = 0;
setInterval(function() {
  change(samples[++i % samples.length]);
}, 1400);