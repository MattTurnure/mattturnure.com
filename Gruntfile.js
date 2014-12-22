module.exports = function ( grunt ) {
    "use strict";

    grunt.loadNpmTasks( "grunt-contrib-concat" );
    grunt.loadNpmTasks( "grunt-sass" );
    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-bower-task" );
    grunt.loadNpmTasks( "grunt-contrib-qunit" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-contrib-sass" );
    grunt.loadNpmTasks( "grunt-contrib-imagemin" );
    grunt.loadNpmTasks( "grunt-contrib-htmlmin" );
    grunt.loadNpmTasks( "grunt-includes" );

    grunt.initConfig({
        src_directory: "_site/",
        concat: {
            options: {
                stripBanners: true
            },

            libs: {
                src: [ "js/modules/*.js", "js/*.js" ],
                dest: "_site/js/scripts.js"
            },

            dev: {
                src: [ "js/modules/*.js", "js/*.js" ],
                dest: "_site/js/scripts.dev.js"
            },

            vendor: {
                src: [ "js/vendor/*.js", "js/vendor/**/dist/*.min.js" ],
                dest: "_site/js/vendor.js"
            }
        },

        jshint: {
            main: {
                options: {
                    jshintrc: ".jshintrc",
                    jshintignore: ".jshintignore"
                },

                files: {
                    src: [ "js/modules/*.js", "*.js" ]
                }
            }
        },

        uglify: {
            options: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                    unused: true,
                    conditionals: true,
                    join_vars: true,
                    evaluate: true
                },
                preserveComments: false,
                mangle: false,
                sourceMap: true,
                sourceMapName: "dist/js/js-source.map",
                sourceMapIncludeSources: true
            },

            MattTurnure: {
                files: {
                    "dist/js/scripts.min.js": ["src/js/modules/*.js","src/js/*.js"]
                }
            }
        },

        bower: {
            install: {
                options: {
                    copy: false
                }
            }
        },

        qunit: {
            sample: [ "tests/sample.html" ],
            all: [ "tests/**/*.html" ]
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    precision: 8
                },

                files: {
                    'dist/styles/main.css': 'src/sass/main.scss'
                }
            }
        },

        watch: {
            build: {
                files: ["src/*.html"],
                tasks: ["includes"]
            },

            js: {
                files: ["src/js/**/*.js"],
                tasks: ["jshint", "concat:dev"]
            },

            scss: {
                files: ["src/sass/*.scss"],
                tasks: ["sass"]
            },

            html: {
                files: ["src/*.html"],
                tasks: ["htmlmin"]
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: "src/img/",
                    src: ["*.{png,jpg,gif,svg}"],
                    dest: "dist/img/"
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },

                files: {
                    "dist/index.html": "src/build/index.html"
                }
            }
        },

        includes: {
            build: {
                cwd: "src",
                src: [ "*.html" ],
                dest: "src/build/",
                options: {
                    flatten: true,
                    includePath: 'src/inc'
                }
            }
        }
    });

    grunt.registerTask( "build", [ "includes", "jshint", "concat:dev", "uglify", "imagemin", "htmlmin" ] );
    grunt.registerTask( "default", [ "build" ] );
    grunt.registerTask( "test", [ "qunit" ] );
    grunt.registerTask( "imgmin", [ "imagemin" ] );
    grunt.registerTask( "htmlminify", [ "htmlmin" ] );
    grunt.registerTask( "inc", [ "includes" ] );
};