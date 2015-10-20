/**
 * Grunt.js Configuration File
 * 'clean'         |  Clean 'build' version to prepare it to receive files ready for deploy
 * 'uglify'        |  Compresses all javascript files and libraries into single files
 * 'compass'       |  Add Bootstrap library to compass take care of it
 * 'htmlmin'       |  Compresses all Html files
 * 'copy'          |  Copy it to 'build' version
 * 'http-server'   |  Optional, creates a local webserver right after the build with the 'src' version as root
 * 'ftp-deploy'    |  Optional, run it separately to build in a ftp server (needs a .ftppass file)
 *
 * TODO - Create a minified app.js copy
 * TODO - Use compass bootstrap gem instead using it from bower version (and kill bower)
 **/

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Clean the 'build' version
        clean: ['build', 'src/css'],

        // Javacript Compression
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false,
                compress: false,
                preserveComments: false
            },
            dist: {
                options: {
                    banner: "var appVersion =  '<%= pkg.version %>';"
                },
                files: [{
                    // Login
                    'build/js/requireLogin.js': ['src/js/requireLogin.js'],
                    // App
                    'build/js/requireApp.js': ['src/js/requireApp.js']
                }]
            },
            default: {
                files: [
                    {
                        // Just for the fucking RequireJS (bower dont give it a minified version)
                        'build/vendors/requirejs/require.min.js':     ['src/vendors/requirejs/require.js'],
                        // Routes & Resolver
                        'build/js/routes/routes.js':     ['src/js/routes/routes.js'],
                        'build/js/routes/resolver.js':   ['src/js/routes/resolver.js'],
                        // Services
                        'build/js/services/authApp.js': [ 'src/js/services/authApp.js'],

                        'build/js/directives/ptFocusMe.js': [ 'src/js/directives/ptFocusMe.js'],
                        // Login Module
                        'build/js/login.js': [ 'src/js/login.js'],
                        // App Module
                        'build/js/app.js': [ 'src/js/app.js'],
                            // Toolbar Controller
                            'build/js/controllers/toolbar.js': [ 'src/js/controllers/toolbar.js'],
                            // Sidenav Controller
                            'build/js/controllers/sidenav.js': [ 'src/js/controllers/sidenav.js'],
                            // Controllers
                            'build/js/controllers/shopping-list.js': [ 'src/js/controllers/shopping-list.js'],
                            'build/js/controllers/bought-list.js': [ 'src/js/controllers/bought-list.js'],
                    },
                ]
            }
        },

        // Sass Compilation + CSS Compression
        compass: {
            dev: {
                options: {
                    sassDir: 'src/scss',
                    imagesDir: 'src/img',
                    cssDir: 'build/css',
                    javascriptsDir: 'build/js/vendors/lib',
                    generatedImagesDir: 'build/img',
                    httpGeneratedImagesPath: '../img',
                    noLineComments: false
                }
            },
            dist: {
                options: {
                    sassDir: 'src/scss',
                    imagesDir: 'src/img',
                    cssDir: 'build/css',
                    javascriptsDir: 'build/js/vendors/lib',
                    generatedImagesDir: 'build/img',
                    httpGeneratedImagesPath: '../img',
                    noLineComments: true,
                    outputStyle: 'compressed'
                }
            }
        },

        // HTML Compression
        htmlmin: {
            dev: {
                options: {
                    removeComments: false,
                    collapseWhitespace: false
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['views/**/*.html', '*.html'],
                        dest: 'build/'
                    }
                ]
            },
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['views/**/*.html', '*.html'],
                        dest: 'build'
                    }
                ]
            }
        },

        // File Copies
        copy: {
            dev: {
                files: [
                    {   // Vendor Bower Files
                        expand: true,
                        cwd: 'src/vendors',
                        src: ['**/*.min.js', '**/require.js', '**/*.map', '**/*.min.css', '**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.eot'],
                        dest: 'build/vendors/'
                    },
                    {   // Images
                        expand: true,
                        cwd: 'src/img',
                        src: ['**/*.*'],
                        dest: 'build/img/'
                    },
                    {   // Internationalization String
                        expand: true,
                        cwd: 'src/i18n',
                        src: ['*.*'],
                        dest: 'build/i18n/'
                    }
                ]
            },
            dist: {
                files: [
                    {   // Vendor Bower Files
                        expand: true,
                        cwd: 'src/vendors',
                        src: ['**/*.min.js', '**/require.js', '**/*.min.css'],
                        dest: 'build/vendors/'
                    },
                    {   // Images
                        expand: true,
                        cwd: 'src/img',
                        src: ['**/*.*'],
                        dest: 'build/img/'
                    },
                    {   // Internationalization String
                        expand: true,
                        cwd: 'src/i18n',
                        src: ['*.*'],
                        dest: 'build/i18n/'
                    }
                ]
            },
        },


        'http-server': {
            'dev': {
                root: 'build/',
                port: 8888,
                host: "0.0.0.0",
                showDir : true,
                autoIndex: true,
                ext: "html",
                runInBackground: false
            }

        },

        // Deploy via FTP
        'ftp-deploy': {
            build: {
                auth: {
                    host: '52.26.149.48',
                    port: 21,
                    authKey: 'key1'
                },
                src: 'build/',
                dest: 'static_build'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-ftp-deploy');


    // Call tasks in order, don't move    unless you know what you are doing
    grunt.registerTask('default', ['clean', 'uglify', 'compass', 'htmlmin', 'copy']);
    grunt.registerTask('dev', ['clean', 'uglify', 'compass:dev', 'htmlmin:dev','copy:dev']);
    grunt.registerTask('dist', ['clean', 'uglify', 'compass:dist', 'htmlmin:dist', 'copy:dist']);


};