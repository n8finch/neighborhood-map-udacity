module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'style.css': 'sass/style.scss',       // 'destination': 'source'
        }
      }
    },

    concat: {
      options: {
        separator: ''
      },
      dist: {
        src: ['js/src/model.js', 'bower_components/oauth-signature/dist/oauth-signature.min.js', 'js/src/refills-components.js', 'js/src/func-lib.js', 'js/src/app.js', 'js/src/ajax-calls.js'],
        dest: 'js/js.js',
      },
    },



    watch: {
      files: ['sass/**/*.scss', 'js/src/*.js'],
      tasks: ['sass', 'concat']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['sass', 'concat', 'watch']);

};