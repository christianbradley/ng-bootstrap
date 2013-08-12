module.exports = function(grunt) {

  var cp = require("child_process"),
    f = require('util').format,
    log = grunt.log,
    verbose = grunt.verbose,
    _ = grunt.util._,
    execOptions = {};

  /**
   * Execute a command in a child process and report results to grunt
   * @param {string} command - the command to execute
   * @param {function} done - the current task's async "done" function
   * @returns {object} childProcess - the childProcess created
   */
  function execute(command, done) {
    verbose.subhead(command);

    var proc = cp.exec(command);

    proc.stdout.on('data', function(d) { log.write(d); });
    proc.stderr.on('data', function(d) { log.error(d); });

    proc.on('exit', function(code) {
      var msg = f("Exited with code: %d.", code);
      var success = (code === 0);
      var logger = success ? verbose.ok : log.error;

      logger(msg);
      return done(success);
    });

    return proc;
  }

  /**
   * Create a git flow command
   * @param {string} name - the git flow command to execute
   * @param {...string} args - additional arguments for git flow
   * @returns {string} A git flow command
   */
  function flow(command) { 
    return "git flow " + command;
  }

  /**
   * Pass the current feature/hotfix/release name to a git flow command
   * @param {string} name - the git flow command to execute
   * @param {...string} args - additional arguments for git flow
   * @returns {string} A git flow command, pre bound to the current branch
   */
  function flowCurrent(command) {
    return [
      "git rev-parse --abbrev-ref HEAD",
      "awk -F'/' '{print $2}'",
      "xargs " + flow(command)
    ].join(" | ");
  }

  /**
   * Hotfix, Feature, and Releases all support:
   * - start
   * - finish
   * - current:finish
   */
  _.each(["hotfix", "feature", "release"], function(target) {

    // Start a {feature|hotfix|release} by name
    grunt.registerTask(["flow", target, "start"].join(":"), function(name) {
      var done = this.async();
      var command = flow(target + " start " + name);
      if(name) { 
        execute(command, this.async());
      } else {
        log.error("No name/version specified");
        done(false);
      }
    });

    // Finish a {feature|hotfix|release} by name
    grunt.registerTask(["flow", target, "finish"].join(":"), function(name) {
      var command = flow(target + " finish " + name);
      if(name) { 
        execute(command, this.async());
      } else {
        log.error("No name/version specified");
        done(false);
      }
    });

    // Finish the current {feature|hotfix|release} 
    grunt.registerTask(["flow", target, "current", "finish"].join(":"), function() {
      var command = flowCurrent(target + " finish");
      execute(command, this.async());
    });

  });

  /**
   * Features and Releases each support
   * - publish
   * - current:publish
   */
  _.each(["feature", "release"], function(target) {

    grunt.registerTask(["flow", target, "publish"].join(":"), function(name) {
      var command = flow(target + " publish " + name);
      if(name) { 
        execute(command, this.async());
      } else {
        log.error("No name/version specified");
        done(false);
      }
    });

    grunt.registerTask(["flow", target, "current", "publish"].join(":"), function() {
      var command = flowCurrent(target + " publish");
      execute(command, this.async());
    });

  });

  grunt.registerTask("flow:feature:pull", function(name) {
    var command = flow("feature pull" + name);
    if(name) { 
      execute(command, this.async());
    } else {
      log.error("No name/version specified");
      done(false);
    }
  });

};
