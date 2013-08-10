var options = {

  // Globals for requirejs
  globals: ['require', 'define'],

  // Enforcing Options: False allows exception
  bitwise: false,
  camelcase: true,
  curly: true,
  eqeqeq: true,
  es3: false,
  forin: true,
  immed: true,
  indent: 2,
  latedef: true,
  newcap: true,
  noarg: true,
  noempty: true,
  nonew: true,
  plusplus: false, // use ++ and --
  quotmark: false,
  undef: true,
  unused: true,
  strict: true,
  trailing: true,
  maxdepth: false,
  maxstatements: false,
  maxcomplexity: false,

  // Relaxing Options: True means allow exception
  asi: false,
  boss: false,
  debug: false,
  eqnull: false,
  esnext: false,
  evil: false,
  expr: false,
  funcscope: false,
  globalstrict: false,
  iterator: false,
  lastsemic: false,
  laxbreak: false,
  laxcomma: false,
  loopfunc: false,
  moz: false,
  multistr: false,
  proto: false,
  scripturl: false,
  smarttabs: false,
  shadow: false,
  supernew: false,
  validthis: false,

  // Environment Options: True enables globals for these envs
  browser: false,
  couch: false,
  devel: false,
  dojo: false,
  jquery: false,
  mootools: false,
  node: false,
  phantom: false,
  rhino: false,
  worker: false,
  wsh: false,
  yui: false,

  // Legacy Options: False disables
  nomen: false,
  onevar: false,
  passfail: false,
  white: false

};

module.exports = options;
