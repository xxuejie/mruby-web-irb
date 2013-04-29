(function () {
  var lines = [], printed = false, webruby, load_string_func;

  var ENTER_KEY = 13;
  var UP_KEY    = 38;
  var DOWN_KEY  = 40;

  window.Module = {};
  window.Module['print'] = function (x) {
    lines.push(x);
    printed = true;
  };

  $(document).ready(function() {
    webruby = new WEBRUBY({print_level: 2});

    var command = function(source) {
      lines = [];
      printed = false;

      webruby.run_source(source);

      if (!printed) {
        window.Module['print']('nil');
      }

      var element = $("#output");
      if (!element) return; // perhaps during startup
      var value = lines.slice(-1)[0];
      element.append('<div class="session"><div class="command"><span class="prompt">&gt;&gt;</span>' + source + '</div><div class="response">' + lines.slice(0, -1).join('<br>') + '<span>=&gt;</span>' + value + '</div></div>');
      $('#shell input').focus();
    };

    $('#shell input').keydown(function(e) {
      switch (e.which) {
        case ENTER_KEY:
          command($(this).val());
          $(this).val('');
          break;
      }
    });

    $("#submit-button").click(function() {
      command(editor.getValue());

      if ($('#clear-check').is(':checked')) {
        // clears current mrb states
        webruby.close();
        webruby = new WEBRUBY({print_level: 2});
      }

      if ($('#clear-input').is(':checked')) {
        editor.setValue('');
      }
    });

    window.onbeforeunload = function () {
      webruby.close();
    }
  });
}());
