module.exports = function(grunt) {

  var semver = require('semver');
  var exec = grunt.config.get('exec');
  var currentVersion = grunt.config.get('pkg.version');

  // Create a git flow command
  function flow(command) {
    return "git flow " + command;
  }

  // Pass the current feature/hotfix/release name to a git flow command
  function flowCurrent(command) {
    return [
      "git rev-parse --abbrev-ref HEAD",
      "awk -F'/' '{print $2}'",
      "xargs " + flow(command)
    ].join(" | ");
  }

  // FEATURE
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Start a feature
  grunt.registerTask("feature:start", "Start a feature with git flow", function(name) {
    if(typeof name === 'undefined') {
      grunt.log.error("Specify feature name: feature:start:my-feature");
      return false;
    }

    var command = flow("feature start " + name);
    exec(command, this.async());
  });

  // Finish the current feature : TODO
  grunt.registerTask("feature:finish", "Finish the current git flow feature", function() {
    this.requires("build");
    var command = flowCurrent("feature finish");
    exec(command, this.async());
  });

  // Publish the current feature
  grunt.registerTask("feature:publish", "Publish the current git flow feature to $ORIGIN", function() {
    this.requires("build");
    var command = flowCurrent("feature publish");
    exec(command, this.async());
  });

  // Push the current feature
  grunt.registerTask("feature:push", "Push changes you made in this feature to $ORIGIN", function() {
    this.requires("build");
    var command = "git push origin";
    exec(command, this.async());
  });

  // Track a feature
  grunt.registerTask("feature:track", "Track a feature that is published to $ORIGIN", function(name) {
    if(typeof name === "undefined") {
      grunt.log.error("Specify feature name: feature:track:remote-feature");
      return false;
    }
    var command = flow("feature track " + name);
    exec(command, this.async());
  });

  // Checkout a local feature
  grunt.registerTask("feature:checkout", "Checkout an existing feature from your local git", function(name) {
    if(typeof name === "undefined") {
      grunt.log.error("Specify feature name: feature:checkout:other-feature");
      return false;
    }
    var command = flow("feature checkout " + name);
    exec(command, this.async());
  });

  // Pull a remote feature
  grunt.registerTask("feature:pull", "Pull remote changes made to the current feature", function() {
    var command = flowCurrent("feature pull origin ");
    exec(command, this.async());
  });

  // Show differences between feature and develop
  grunt.registerTask("feature:diff", "Show differences between current feature and develop branches", function() {
    var command = flowCurrent("feature diff");
    exec(command, this.async());
  });

  // Rebase current feature on develop
  grunt.registerTask("feature:rebase", "Rebase current feature onto develop", function() {
    var command = flowCurrent("feature rebase -i");
    grunt.log.warn("Cannot run interactive rebase through grunt.");
    grunt.log.ok("Execute the following from your terminal:");
    grunt.log.writeln(command);
  });

  // RELEASE
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Create a new patch release
  grunt.registerTask("release:patch", "Start a new patch version release", function() {
    this.requires("build");
    var bumped = semver.inc(currentVersion, 'patch');
    var command = flow("release start v" + bumped);

    exec(command, this.async());
    grunt.task.run("bump:patch");
  });

  // Create a new major release
  grunt.registerTask("release:minor", "Start a new minor version release", function() {
    this.requires("build");
    var bumped = semver.inc(currentVersion, 'minor');
    var command = flow("release start v" + bumped);

    exec(command, this.async());
    grunt.task.run("bump:minor");
  });

  // Create a new major release
  grunt.registerTask("release:major", "Start a new major version release", function() {
    this.requires("build");
    var bumped = semver.inc(currentVersion, 'major');
    var command = flow("release start v" + bumped);

    exec(command, this.async());
    grunt.task.run("bump:major");
  });

  // Finish the current release
  grunt.registerTask("release:finish", "Finish the current release", function() {
    this.requires("build");
    var msg = "Released version " + currentVersion;
    var command = flowCurrent('release finish -pm "' + msg + '"');
    exec(command, this.async());
  });

  // Publish the current release
  grunt.registerTask("release:publish", "Publish the current release to $ORIGIN", function() {
    this.requires("build");
    var command = flowCurrent("release publish");
    exec(command, this.async());
  });

  // Track a remote release
  grunt.registerTask("release:track", "Track a release published to $ORIGIN", function(version) {
    if(typeof version === 'undefined') {
      grunt.log.error("Specify release name: release:track:v1.1.0");
      return false;
    }

    var command = flow("release track " + version);
    exec(command, this.async());
  });

  // HOTFIX
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Start a hotfix
  grunt.registerTask("hotfix:start", "Start a hotfix of :version release, optionally using :base", function(version, base) {
    if(typeof version === 'undefined') {
      grunt.log.error("Specify version name: hotfix:start:v1.1.0");
      return false;
    }

    var command = flow("hotfix start " + version);
    if(typeof base !== 'undefined') { command += " " + base; }
    exec(command, this.async());
  });

  // Finish a hotfix
  grunt.registerTask("hotfix:finish", "Finish the current hotfix", function() {
    var msg = "Hotfix version: " + currentVersion;
    var command = flowCurrent('hotfix finish -p -m "'+msg+'"');
    exec(command, this.async());
  });

};
