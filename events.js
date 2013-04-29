(function () {
  var lines = [], printed = false, webruby, load_string_func, history = [], history_index = 0;

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

      if (source != history[history_index-1])
        history.push(source);

      history_index = history.length;

      webruby.run_source('MrubyJs.window.instance_eval { ' + source + ' }');

      if (!printed) {
        window.Module['print']('nil');
      }

      var element = $("#output");
      if (!element) return; // perhaps during startup
      var value = lines.slice(-1)[0];
      element.append('<div class="session"><div class="command"><span class="prompt">&gt;&gt;</span>' + source + '</div><div class="response">' + lines.slice(0, -1).join('<br>') + (lines.length > 1 ? '<br>' : '') + '<span>=&gt;</span>' + value + '</div></div>');
    };

    $('#editor-container').keydown(function(e) {
      if (e.which == ENTER_KEY && e.shiftKey) {
        $('#submit-button').trigger('click');
        $(this).focus();
        e.preventDefault();
      }
    });

    $('#shell input').keydown(function(e) {
      var cmd, found = true;

      switch (e.which) {
        case UP_KEY:
          history_index--;
          cmd = history[history_index];

          if (history_index < 0)
            history_index = 0;
          else
            $('#shell input').val(cmd);

          break;

        case DOWN_KEY:
          history_index++;
          cmd = history[history_index];

          if (history_index >= history.length)
            history_index = history.length-1;
          else
            $('#shell input').val(cmd);

          break;

        case ENTER_KEY:
          var val = $(this).val().trim();
          if (val) {
            command(val);
            $(this).val('');
          }
          break;

        default:
          found = false;
          break;
      }

      if (found) e.preventDefault();
    });

    $("#submit-button").click(function() {
      command(editor.getValue());

      if ($('#clear-check').is(':checked')) {
        // clears current mrb states
        webruby.close();
        webruby = new WEBRUBY({print_level: 2});
      }
    });

    window.onbeforeunload = function () {
      webruby.close();
    }
  });
}());
