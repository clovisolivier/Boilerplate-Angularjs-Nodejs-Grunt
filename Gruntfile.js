"use strict";
module.exports = function(grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        ngtemplates: 'grunt-angular-templates'

    });


    // Configurable paths for the application
    var appConfig = {
        app: 'public',
        dist: 'dist'
    };

    grunt.initConfig({

        // Project settings
        tprint: appConfig,

        pkg: grunt.file.readJSON('package.json'),

        watch: {
            js: {
                options: {
                    livereload: true
                },
                files: ['server/**', 'Gruntfile.js', 'public/**/*.js'],
                tasks: ['newer:jshint', 'newer:jscs:all', 'build_dev']
            },
            html: {
                options: {
                    livereload: true
                },
                files: ['public/**/*.html', 'public/index.html'],
                tasks: ['newer:bootlint', 'newer:htmllint', 'build_dev']
            },
            css: {
                options: {
                    livereload: true
                },
                files: ['public/styles/**/*.css', 'public/styles/*.css'],
                tasks: ['newer:csslint:lax', 'build']
            }
        },
        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.

        cssmin: {
            dist: {
                files: {
                    '<%= tprint.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css'
                    ]
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    '<%= tprint.dist %>/js/app.js': [
                        '.tmp/js/app.js'
                    ],
                    '<%= tprint.dist %>/js/views.js': [
                        '.tmp/views/templateCache.js'
                    ]
                }
            }
        },

        concat: {
            dist: {
                src: ['<%= tprint.app %>/js/**/*.js'],
                dest: '<%= tprint.dist %>/js/app.js',
            }
        },

        concat_css: {
            options: {
                // Task-specific options go here. 
            },
            all: {
                src: ['<%= tprint.app %>/**/*.css', '<%= tprint.app %>/*.css'],
                dest: '.tmp/styles.css'
            },
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= tprint.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= tprint.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= tprint.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= tprint.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= tprint.app %>',
                    src: ['*.html'],
                    dest: '<%= tprint.dist %>'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= tprint.app %>',
                    dest: '<%= tprint.dist %>',
                    src: [
                        '*.{ico,png,txt,json}',
                        '*.html',
                        'images/{,*/}*.{webp}',
                        'styles/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= tprint.dist %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: 'fonts/*',
                    dest: '<%= tprint.dist %>'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= tprint.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= tprint.dist %>/{,*/}*',
                        '!<%= tprint.dist %>/.git{,*/}*',
                        '!<%= tprint.dist %>/bower_components{,*/}*'

                    ]
                }]
            },
            server: '.tmp'
        },

        express: {
            all: {
                options: {
                    server: 'server.js',
                    hostname: 'localhost',
                    bases: ['<%= tprint.dist %>'],
                    livereload: true
                }
            }
        },

        // Add vendor prefixed styles
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 1 version']
                    })
                ]
            },
            server: {
                options: {
                    map: true
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: ['Gruntfile.js', '<%= tprint.app %>/scripts/**/*.js', 'server.js', 'server/**/*.js']
        },

        htmllint: {
            options: {
                force: true,
                ignore: [/Attribute “ng-[a-z-]+” not allowed on element “[a-z-]+” at this point./,
                    /Attribute “.*chart” not allowed on element “[a-z-]+” at this point./,
                    'Element “marquee” not allowed as child of element “div” in this context. (Suppressing further errors from this subtree.)',
                    /Element “head” is missing a required instance of child element “title”./,
                    /Bad value “{{.*}}” for attribute “.*” on element “.*”: Illegal character in path segment: “{” is not allowed./
                ]
            },
            src: ['<%= tprint.app %>/views/*.html']
        },
        jsbeautifier: {
            default: {
                src: ['Gruntfile.js', 'server.js', 'server/**/*.js', '<%= tprint.app %>/**/*.js', '<%= tprint.app %>/**/*.html'],
                files: ['<%= tprint.app %>/bower_components/**/*.js', '<%= tprint.app %>/bower_components/*.js', '<%= tprint.app %>/angular/**/*.js', '<%= tprint.app %>/angular/*.js']

            },
            js: {
                src: ['Gruntfile.js', 'server.js', 'server/**/*.js', '<%= tprint.app %>/js/**/*.js'],
                files: ['<%= tprint.app %>/bower_components/**/*.js', '<%= tprint.app %>/bower_components/*.js', '<%= tprint.app %>/angular/**/*.js', '<%= tprint.app %>/angular/*.js']

            },
            html: {
                src: ['<%= tprint.app %>/views/**/*.html'],
                files: ['<%= tprint.app %>/bower_components/**/*.js', '<%= tprint.app %>/bower_components/*.js', '<%= tprint.app %>/angular/**/*.js', '<%= tprint.app %>/angular/*.js']

            },
            css: {
                src: ['<%= tprint.app %>/styles/**/*.css']
            },
            gitprecommit: {
                src: ['<%= tprint.app %>/scripts/**/*.js'],
                files: ['<%= tprint.app %>/bower_components/**/*.js', '<%= tprint.app %>/bower_components/*.js', '<%= tprint.app %>/angular/**/*.js', '<%= tprint.app %>/angular/*.js'],
                options: {
                    mode: 'VERIFY_ONLY'
                }
            }
        },
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['<%= tprint.app %>/styles/**/*.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['<%= tprint.app %>/styles/**/*.css']
            }
        },
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'jsbeautifier:default',
                'copy:styles',
                'newer:imagemin'
            ]
        },
        bootlint: {
            options: {
                stoponerror: false,
                relaxerror: []
            },
            files: ['<%= tprint.app %>/index.html']
        },
        ngAnnotate: {
            options: {
                singleQuotes: true,
            },
            dist: {
                files: {
                    '.tmp/js/app.js': ['<%= tprint.app %>/js/**/*.js']
                }
            }
        },
        // Make sure code styles are up to par
        jscs: {
            options: {
                config: '.jscsrc'
            },
            all: {
                src: [
                    '<%= tprint.app %>/js/{,*/}*.js'
                ]
            },
            test: {
                src: ['test/spec/{,*/}*.js']
            }
        },
        ngtemplates: {
            dist: {
                options: {
                    module: 'myApp',
                    htmlmin: '<%= htmlmin.dist.options %>'
                },
                cwd: '<%= tprint.app %>',
                src: 'views/{,*/}*.html',
                dest: '.tmp/views/templateCache.js'
            }
        },
    });

    grunt.loadNpmTasks('grunt-html');

    grunt.registerTask('default', ['build', 'express', 'watch']);
    grunt.registerTask('beautify', ['jsbeautifier:default']);
    grunt.registerTask('js', ['express', 'jsbeautifier:js', 'watch:js']);
    grunt.registerTask('css', ['express', 'jsbeautifier:css', 'watch:css']);
    grunt.registerTask('html', ['express', 'jsbeautifier:html', 'watch:html']);


    grunt.registerTask('build_dev', [
        'newer:concurrent:dist',
        'newer:copy:dist',
        'newer:ngAnnotate',
        'concat_css',
        'newer:postcss:dist',
        'newer:cssmin',
        'ngtemplates',
        'newer:uglify',
        'newer:htmlmin'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'copy:dist',
        'ngAnnotate',
        'concat_css',
        'postcss:dist',
        'cssmin',
        'ngtemplates',
        'uglify',
        'htmlmin'
    ]);
};
