#!/bin/bash

# Script for building mruby interpreter in the browser
# It requires the webruby project to build, which can be found at:
# https://github.com/xxuejie/webruby

# Usage:
# ./build.sh (path to webruby)

# This is the default closure jar path on a mac installed using homebrew
# Change it if you install it to other path
CLOSURE_COMPILER=/usr/local/Cellar/closure-compiler/20120917/libexec/build/compiler.jar

WEBRUBY_ROOT=$1
if [ -z $WEBRUBY_ROOT ]; then
    echo "Please provide the path to webruby!"
    exit 1
fi

cd `dirname ${BASH_SOURCE[0]}`
SCRIPT_ROOT=`pwd`

EMCC=$WEBRUBY_ROOT/modules/emscripten/emcc
EMCC_FLAGS="-Werror-implicit-function-declaration -DMRB_USE_FLOAT"
EMCC_INCLUDES="-I$WEBRUBY_ROOT/modules/mruby/include"

# build webruby
cd $WEBRUBY_ROOT
git submodule init && git submodule update && rake libmruby
if [ $? -ne 0 ]; then
    echo "Error occurs when building webruby project, exit"
    exit 1
fi
cd $SCRIPT_ROOT

# build driver
$EMCC $EMCC_FLAGS $EMCC_INCLUDES -o $SCRIPT_ROOT/driver.o $SCRIPT_ROOT/driver.c
if [ $? -ne 0 ]; then
    echo "Error occurs when building driver, exit"
    exit 1
fi

# build mruby.js(O2 will invoke closure compiler)
$EMCC $EMCC_FLAGS -o $SCRIPT_ROOT/mruby.js $SCRIPT_ROOT/driver.o $WEBRUBY_ROOT/modules/mruby/build/emscripten/lib/libmruby.a -s EXPORTED_FUNCTIONS="['_driver_execute_string', '_driver_open', '_driver_close']" -O2
if [ $? -ne 0 ]; then
    echo "Error occurs when building mruby.js, exit"
    exit 1
fi

echo "Finish building mruby interpreter!"
echo "Please use your favourite browser to open mruby.html!"
