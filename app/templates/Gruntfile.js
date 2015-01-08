// Generated by <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks on demand
  require('jit-grunt')(grunt, {
    cdnify: 'grunt-google-cdn'
  });

  // Configurable paths, options
  var config = {
    proj: '<%= projName %>',
    host: '<%= host %>',
    port: <%= port %>,
    urlpath: '<%= urlpath %>',
    cssDir: '<%= cssDir %>',
    sassDir: '<%= sassDir %>',
    jsDir: '<%= jsDir %>',
    jsLibDir: '<%= jsLibDir %>',
    bowerDir: '<%= bowerDir %>',
    bowerDirName: require('path').basename('<%= bowerDir %>'),
    imgDir: '<%= imgDir %>',
    fontsDir: '<%= fontsDir %>',<% if (includeNode) { %>
    htmlDir: '<%= htmlDir %>',
    nodeHost: 'localhost',
    nodePort: 9000,
    nodeStartPath: '<%= nodeStartPath %>',<% } %>
    distDir: '<%= distDir %>',
    distHost: '<%= distHost %>',
    distPort: <%= distPort %>
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      options: {
        nospawn: true
      },
      js: {
        files: [
          'Gruntfile.js',
          '<%= config.jsDir %>/{,*/}*.js'
        ],
        tasks: ['jshint']
      },
      sass: {
        files: ['<%%= config.sassDir %>/{,*/}*.{scss,sass}'],
        tasks: ['sass', 'autoprefixer'],
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          livereload: <%= livereloadPort %>
        },
        files: [
          'Views/**/*.cshtml',<% if (includeNode) { %>
          '<%%= config.htmlDir %>/{,*/}*.html',<% } %>
          '<%%= config.cssDir %>/{,*/}*.css',
          '<%%= config.jsDir %>/{,*/}*.js',
          '<%%= config.imgDir %>/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ]
      }
    },

    // IIS Express server settings
    // Modify site settings in "%userprofile%\Documents\IISExpress\config\applicationhost.config" file
    iisexpress: {<% if (useIisExpress) { %>
      server: {
        options: {
          site: '<%%= config.proj %>',
          openUrl: 'http://<%%= config.host %>:<%%= config.port %><%%= config.urlpath %>',
          open: true
        }
      },<% } %>
      dist: {
        options: {
          site: '<%%= config.proj %>:dist',
          openUrl: 'http://<%%= config.distHost %>:<%%= config.distPort %><%%= config.urlpath %>',
          open: true
        }
      }
    },<% if (includeNode) { %>

    // The actual grunt server settings
    connect: {
      options: {
        port: '<%%= config.nodePort %>',
        open: 'http://<%%= config.nodeHost %>:<%%= config.nodePort %><%%= config.nodeStartPath %>',
        livereload: '<%%= watch.livereload.options.livereload %>',
        // Change this to '0.0.0.0' to access the server from outside
        hostname: '<%%= config.nodeHost %>'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.')
            ];
          }
        }
      },
    },<% } %>

    // Empties files/dirs to start fresh
    clean: {
      dist: [
        '<%%= config.distDir %>'
      ]
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%%= config.jsDir %>/{,*/}*.js',
        '!<%%= config.jsLibDir %>/*',
        '!<%%= config.bowerDir %>/*',
        // add your scripts below when jsDir == jsLibDir, otherwise remove next lines
        '<%%= config.jsDir %>/config.js',
        '<%%= config.jsDir %>/main.js'
      ]
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        sourceMap: true,
        includePaths: ['<%%= config.bowerDir %>']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= config.sassDir %>',
          src: ['*.{scss,sass}'],
          dest: '<%%= config.cssDir %>',
          ext: '.css'
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
        map: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= config.cssDir %>',
          src: [
            '{,*/}*.css',
            '!bootstrap*.css'
          ],
          dest: '<%%= config.cssDir %>'
        }]
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= config.imgDir %>',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%%= config.distDir %>/<%%= config.imgDir %>'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= config.imgDir %>',
          src: '{,*/}*.svg',
          dest: '<%%= config.distDir %>/<%%= config.imgDir %>'
        }]
      }
    },

    cssmin: {
      dist: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          '<%%= config.distDir %>/<%%= config.cssDir %>/main.css': [
            '<%%= config.cssDir %>/{,*/}*.css',
            '!<%%= config.cssDir %>/{,*/}*.min.css'
          ]
        }
      }
    },

    uglify: {
      almond: {
        files: {
          '<%%= config.distDir %>/<%%= config.jsDir %>/almond.js': [
            '<%%= config.bowerDir %>/almond/almond.js'
          ]
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: '<%%= config.jsDir %>',
          mainConfigFile: '<%%= config.jsDir %>/config.js',
          name: 'main',
          out: '<%%= config.distDir %>/<%%= config.jsDir %>/main.js',
          paths: {
            'jquery': 'empty:'
          },
          optimize: 'uglify2',
          generateSourceMaps: true,
          preserveLicenseComments: false
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%%= config.distDir %>/<%%= config.cssDir %>/{,*/}*.css',
          '<%%= config.distDir %>/<%%= config.jsDir %>/{,*/}*.js',
          '<%%= config.distDir %>/<%%= config.imgDir %>/{,*/}*.*'
        ]
      }
    },

    // Performs rewrites based on rev and usemin blocks in html
    usemin: {
      options: {
        assetsDirs: [
          '<%%= config.distDir %>',
          '<%%= config.distDir %>/<%%= config.jsDir %>'
        ],
        patterns: {
          jsmaprefs: [
            [/(main\.js\.map)/, 'Update js to reference our revved map']
          ]
        },
        blockReplacements: {
          cdnfallback: function (block) {
            var successCheck = 'window.jQuery'; // change this for other libs
            var fallback = '<script>(' + successCheck + ')||' +
              'document.write(\'<script src="' + block.dest + '"><\\/script>\')' +
            '</script>';
            return '<script src="' + block.src + '"></script>' + '\r\n' +
              block.indent + fallback;
          }
        }
      },
      html: ['<%%= config.distDir %>/Views/Shared/_Layout.cshtml'],
      css: ['<%%= config.distDir %>/<%%= config.cssDir %>/{,*/}*.css'],
      jsmaprefs: ['<%%= config.distDir %>/<%%= config.jsDir %>/{,*/}*.js']
    },

    // Replaces bower script refs in html to cdn urls
    cdnify: {
      options: {
        cdn: require('google-cdn-data'),
        componentsPath: '<%%= config.bowerDir %>'
      },
      dist: {
        html: ['<%%= config.distDir %>/Views/Shared/_Layout.cshtml']
      }
    },

    // Copy files to places other tasks can use
    copy: {
      layout: {
        nonull: true,
        src: 'Views/Shared/_Layout.cshtml',
        dest: '<%%= config.distDir %>/'
      },
      cdnfallback: {
        nonull: true,
        src: '<%%= config.bowerDir %>/jquery/dist/jquery.js',
        dest: '<%%= config.distDir %>/<%%= config.jsDir %>/jquery.js'
      }
    },

    // Open in browser
    open: {
      server: {
        path: 'http://<%%= config.host %>:<%%= config.port %><%%= config.urlpath %>'
      }
    }
  });

  grunt.registerTask('serve', function (mode) {<% if (includeNode) { %>
    if (mode === 'node') {
      return grunt.task.run([
        'connect:livereload',
        'watch'
      ]);
    }
<% } %>
    if (mode === 'dist') {
      return grunt.task.run([
        'iisexpress:dist:keepalive'
      ]);
    }

    grunt.task.run([<% if (useIisExpress) { %>
      'iisexpress:server',<% } else { %>
      'open:server',<% } %>
      'watch'
    ]);
  });

  grunt.registerTask('build', function (target) {
    if (target === 'dist') {
      return grunt.task.run([
        'clean:dist',
        'copy:layout',
        'sass',
        'autoprefixer',
        'requirejs',
        'cssmin',
        'uglify',
        'imagemin',
        'svgmin',
        'copy:cdnfallback',
        'filerev',
        'usemin',
        'cdnify'
      ]);
    }

    grunt.task.run([
      'sass',
      'autoprefixer'
    ]);
  });

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);
};
