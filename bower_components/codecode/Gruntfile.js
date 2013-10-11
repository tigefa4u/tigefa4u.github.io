module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        banner:
           "/*!\n"
          +" * codecode.\n"
          +" * v<%= pkg.version %> @stephenplusplus <%= grunt.template.today('m/d/yy') %>\n"
          +" * github.com/stephenplusplus/codecode\n"
          +" */\n"
      },
      build: {
        src: ['src/codecode.js'],
        dest: 'dist/codecode.js'
      }
    },

    uglify: {
      options: {
        mangle: true,
        compress: true,
        preserveComments: 'some',
        sourceMap: 'dist/codecode.js.map'
      },
      build: {
        src: ['dist/codecode.js'],
        dest: 'dist/codecode.min.js'
      }
    }
  });

  grunt.registerTask('build', ['concat:build', 'uglify:build']);
  grunt.registerTask('default', ['build']);
};
