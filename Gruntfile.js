module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [
                        ['babelify', {
                            presets: ['es2015', 'stage-2', 'react']
                        }]
                    ],
                    browserifyOptions: { debug: true },
                    exclude: ''
                },
                files: {
                    'dist/app.js': [
                        'src/app.js',
                        'src/Component/**/*.js'
                    ]
                }
            }
        },
        watch: {
            scripts: {
                options: {
                    interrupt: true,
                    livereload: true
                },
                files: ['src/**/*.js'],
                tasks: ['browserify']
            }
        }
    });

    grunt.registerTask('default', ['browserify', 'watch']);
};
