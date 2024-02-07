module.exports = function (grunt) {

    grunt.initConfig({
        delete_sync: {
            dist: {
                cwd: 'dist',
                src: ['**', '**/*.*']
            }
        },
        less: {
            dist: {
                files: {
                    'dist/styles/style.css': 'src/styles/style.less',
                }
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/fonts',
                    src: '*',
                    dest: 'dist/fonts'
                },
                {
                    expand: true,
                    cwd: 'src/images',
                    src: '**/*',
                    dest: 'dist/images'
                },
                {
                    expand: true,
                    cwd: 'src/styles',
                    src: '*.css',
                    dest: 'dist/styles'
                },
                {
                    expand: true,
                    cwd: 'src/files',
                    src: '*',
                    dest: 'dist/files'
                },
                {
                    expand: true,
                    cwd: 'src/js',
                    src: '*',
                    dest: 'dist/js'
                }]
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/styles/style.min.css': ['dist/styles/style.css']
                }
            }
        },
        clean: ['dist/styles/style.css'],
        watch: {
            options: {
                livereload: true,
            },
            src: {
                files: ['src/styles/*.less', 'src/fonts/*', 'src/images/**', 'src/js/*'],
                tasks: ['default'],
            },
        }
    });

    grunt.loadNpmTasks('grunt-delete-sync');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['delete_sync', 'less', 'copy', 'cssmin', 'clean']);
};