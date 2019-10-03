'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically, when needed
    require('jit-grunt')(grunt, {
        'watch': 'grunt-contrib-watch',
        'less': 'grunt-contrib-less',
        'cssmin': 'grunt-contrib-cssmin',
        'uglify': 'grunt-contrib-uglify'
    });

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var config = {
        path: {
            theme: "../bsproject/"
        }
    };

    config.path = {
        theme: config.path.theme,
        //spritesheets: config.path.theme + 'images/spritesheets/',
        images: config.path.theme + 'images/',
        styles: config.path.theme + 'less/',
        css: config.path.theme + 'css/',
        less: {
            "dist/css/style.css": "less/bootstrap.less"
        },
        cssmin: {
            "dist/css/style.min.css": "less/bootstrap.less"
        },
        jsmin: {
            "dist/js/scripts.min.js": ['js/*.js'/*, 'src/input2.js'*/]
        }
    };

    grunt.initConfig({
        cssmin: {
          minify: {
            src: 'dist/css/style.css',
            dest: 'dist/css/style.min.css'
          }
        },
        watch: {
            options: {
                livereload: false
            },
            css: {
                files: [config.path.styles + '*.less'],
                tasks: ['less:development']
            }

        },
        less: {
            development: {
                files: config.path.less
            },
            production: {
                options: {
                    compress: true
                },
                files: config.path.cssmin
            }
        },
        uglify: {
            my_target: {
                files: config.path.jsmin
            }
        }

    });

    grunt.registerTask('build', [
        'cssmin',
        'less',
        'uglify'
    ]);
  grunt.registerTask('default', ['watch', 'cssmin' , 'less' , 'build' ]);
};