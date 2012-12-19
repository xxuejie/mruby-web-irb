#include <mruby.h>
#include <mruby/compile.h>

mrb_state* driver_open()
{
  return mrb_open();
}

int driver_execute_string(mrb_state *mrb, const char *s)
{
  mrb_value result = mrb_load_string(mrb, s);
  if (mrb->exc) {
    mrb_p(mrb, mrb_obj_value(mrb->exc));
    mrb->exc = 0;
  }
  else {
    /* no */
    printf(" => ");
    mrb_p(mrb, result);
  }

  return 0;
}

int driver_close(mrb_state* mrb)
{
  mrb_close(mrb);

  return 0;
}
