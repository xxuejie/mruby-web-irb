#include <mruby.h>
#include <mruby/compile.h>

mrb_state* driver_open()
{
  return mrb_open();
}

int driver_execute_string(mrb_state *mrb, const char *s)
{
  mrb_load_string(mrb, s);

  return 0;
}

int driver_close(mrb_state* mrb)
{
  mrb_close(mrb);

  return 0;
}
