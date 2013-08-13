module.exports = function(grunt) {

  var cp = require("child_process")
    , Q = require("q")
    , _ = grunt.util._;

  function exec(command, args) {
    grunt.log.subhead([command, args.join(" ")].join(" "));

    var child = cp.spawn(command, args, { env: process.env, stdio: "inherit" });
    var deferred = Q.defer();

    child.on("exit", function(code) {
      var success = (code === 0);
      var callback = success ? deferred.resolve : deferred.reject;
      callback(code);
    });

    return deferred.promise;
  }

  grunt.registerTask("feature:start", "Start feature :name", function(name) {
    var options = this.options({ fetch: false });
    var command = "git";
    var args = ["flow", "feature", "start"];
    var done = this.async();

    // Set up arguments
    if(options.fetch) { args.push("-F"); }
    if(name) { args.push(name); }

    function success(code) {
      grunt.log.ok("Exited with status: " + code);
      done(true);
    }

    function failure(code) {
      grunt.log.error("Exited with status: " + code);
      done(false);
    }

    exec(command, args).then(success, failure);
  });

};
