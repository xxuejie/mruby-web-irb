This project runs a mruby interpreter in a browser. It depends on [webruby](https://github.com/xxuejie/webruby).

A live demo of this project is at [http://qiezi.me/projects/mruby-web-irb/mruby.html](http://qiezi.me/projects/mruby-web-irb/mruby.html). Feel free to try it!

# How to build an interpreter

1. Build [webruby](https://github.com/xxuejie/webruby) using any gem configuration. But remember to use loading mode 2.

	**NOTE**: If you do not know what is loading mode, feel free to ignore this since loading mode 2 is the default. However, a detailed description on loading mode is at [here](https://github.com/xxuejie/webruby/blob/master/rakelib/functions.rb#L3).

2. Copy the generated `webruby.js` file to current folder(and override existing file).

3. Now you are good to go!