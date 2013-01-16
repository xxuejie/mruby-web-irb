(function () {
  var lines = [], printed = false, mrb, load_string_func;

  window.Module = {};
  window.Module['print'] = function (x) {
    lines.push(x);
    printed = true;
  };

  $(document).ready(function() {
    mrb = Module['_driver_open']();
    load_string_func = Module.cwrap("driver_execute_string",
                                    "number",
                                    ["number", "string"]);

    $("#submit-button").click(function() {
      lines = [];
      printed = false;

      load_string_func(mrb, editor.getValue());

      if (!printed) {
        window.Module['print']('<small><i>(no output)</i></small>');
      }

      var element = $("#output");
      if (!element) return; // perhaps during startup
      element.html(lines.join('<br>') + '<hr>' + element.html());

      if ($('#clear-check').is(':checked')) {
        // clears current mrb states
        Module['_driver_close'](mrb);
        mrb = Module['_driver_open']();
      }
    });

    window.onbeforeunload = function () {
      Module['_driver_close'](mrb);
    }
  });
}());
