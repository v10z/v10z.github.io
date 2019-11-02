Streams.Fallback = function () {
  document.documentElement.classList.add('no-js');
  document.documentElement.classList.remove('js');

  // Navigation and behavior for native content
  var scroll = window.scroller = new Streams.NativeScroll(0, 20000);
  scroll.init();

  var nav = window.nav = new Streams.Nav('native-frame', scroll);
  nav.updateExtents();
  Streams.Behaviors.apply(document.body);
};

Streams.Fallback.isRequired = (function () {

  var oldOpera = navigator.userAgent.match(/Opera/) && !navigator.userAgent.match(/WebKit/);

  var canvas = document.createElement('canvas');
  var supported = !!(canvas && window.WebGLRenderingContext && canvas.getContext('experimental-webgl'));

  return function () {
    return oldOpera || !supported;
  };

})();

Streams.Fallback.warnWebGL = function () {
  if (Streams.Fallback.isRequired()) {
    var close = document.querySelector('#webgl-warning a.close:not(.pinged)');
    if (close) {
      close.classList.add('pinged');
      close.addEventListener('click', function (e) {
        e.preventDefault();
        Streams.Fallback.dismissWebGL();
      });
    }

    var warning = document.querySelector('#webgl-warning');
    warning.style.display = 'block';
    warning.classList.remove('collapsed');
  }
};

Streams.Fallback.dismissWebGL = function () {
  var warning = document.querySelector('#webgl-warning');
  warning.classList.add('collapsed');
};