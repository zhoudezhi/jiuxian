//约定：文件路径有min代表被压缩过，否则未被压缩
/* 打包命令 
*  grunt -release -cdn
*  -release参数会压缩css，js，并替换html中的引用
*  -cdn参数会在替换引用同时把cdn路径加进去(cdnStr)
*  cdn路径在gruntfile.js里有，需要配置
*
*  cache和combo预发布不支持，cdn支持。预发布设置成0
*/

var utils = require('util'),
  fs = require('fs'),
  path = require('path'),
  proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest,
  COMBO_REG = /\?\?[^,]+\.js(?:,[^,]+\.js)+/,
  COMBO_PART_REG = /[^\?,]+\.js/g;

function getMiddleware(connect, options) {
  return function (req, res, next) {
    var i, dir = options.base[0], body = '';
    if (i = req.url.indexOf('??'), COMBO_REG.test(req.url)) {
      var matches = req.url.match(COMBO_PART_REG);
      if (matches && matches.length) {
        matches.forEach(function (part) {
          var fullPath = dir + req.url.substring(0, i) + part;
          fullPath = fullPath.replace(/\\/g, '/');
          body += fs.readFileSync(fullPath, { encoding: 'utf8' });
        });
        res.setHeader('Content-Type', 'application/javascript');
        res.write(body);
        res.end();
        return next();
      }
    } else {
      return next();
    }
  }
}

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  //路径
  var appConfig = {
    app: 'src',
    dist: 'dist',
    temp: 'temp' //待压缩处理文件都在这个文件夹里
  },

    release = process.argv.indexOf('-release') != -1,
    cdn = process.argv.indexOf('-cdn') != -1,
    compress = grunt.option('compress') || false,
    host = grunt.option('host') || '/',
    //cdnStr = '//static.360buyimg.com/mr/jdhome/' + grunt.template.today("yyyy-mm-dd") + '/';
    cdnStr = '//static.360buyimg.com/business/jdj/';
    //cdnStr = '//mo.jd.com/static/ihome/';

  // grunt配置
  grunt.initConfig({
    appConfig: appConfig,
    clean: {
      dist: {
        src: ['<%= appConfig.dist %>']
      },
      temp: {
        src: ['<%= appConfig.temp %>']
      }
    },
    copy: {
      options: {
        processContentExclude: ['**/*.{png,gif,jpg,jpeg,ico,psd,eot,svg,ttf,woff,woff2}']
      },
      html: {
        files: [{
          cwd: '<%= appConfig.app %>/',
          expand: true,
          src: ["**/*.html", "!meta/**"],
          dest: '<%= appConfig.dist %>'
        }]
      },
      js_app_to_temp: {
        files: [{
          cwd: '<%= appConfig.app %>/',
          expand: true,
          src: ["**/*.js", "!**/*.min.js"],
          dest: '<%= appConfig.temp %>'
        }]
      },
      js_app_to_dist: {
        files: [{
          cwd: '<%= appConfig.app %>/',
          expand: true,
          src: ["**/*.min.js"],
          dest: '<%= appConfig.dist %>'
        }]
      },
      js_temp_to_dist: {
        files: [{
          cwd: '<%= appConfig.temp %>/',
          expand: true,
          src: ["**/*.js", "!**/*.min.js"],
          dest: '<%= appConfig.dist %>'
        }]
      },
      css_app_to_temp: {
        files: [{
          cwd: '<%= appConfig.app %>/',
          expand: true,
          src: ["**/*.css"],
          dest: '<%= appConfig.temp %>'
        }]
      },
      css_app_to_dist: {
        files: [{
          cwd: '<%= appConfig.app %>/',
          expand: true,
          src: ["**/*.min.css"],
          dest: '<%= appConfig.dist %>'
        }]
      },
      css_temp_to_dist: {
        files: [{
          cwd: '<%= appConfig.temp %>/',
          expand: true,
          src: ["**/*.css", "!**/*.min.css"],
          dest: '<%= appConfig.dist %>'
        }]
      },
      images: {
        files: [{
          cwd: '<%= appConfig.app %>/',
          expand: true,
          src: ["**/*.{jpg,jpeg,png,bmp,ico,gif}"],
          dest: '<%= appConfig.dist %>'
        }]
      },
      fonts: {
        files: [{
          cwd: '<%= appConfig.app %>/',
          expand: true,
          src: ["**/*.{eot,svg,ttf,woff,woff2}"],
          dest: '<%= appConfig.dist %>'
        }]
      }
    },
    less: {
      app_to_temp: {
        files: [{
          expand: true,
          ext: ".css",
          extDot: 'last',
          cwd: '<%= appConfig.app %>/less',
          src: ["base.less"],
          dest: '<%= appConfig.temp %>/css'
        }, {
            expand: true,
            ext: ".css",
            extDot: 'last',
            cwd: '<%= appConfig.app %>/less/pages',
            src: ["*.less"],
            dest: '<%= appConfig.temp %>/css'
          }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ["Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", "Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]
      },
      //temp里包括less编译的css、从src中压缩后的css
      temp_to_temp: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.temp %>',
          src: ["**/*.css"],
          dest: '<%= appConfig.temp %>'
        }]
      },
      app_to_temp: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>',
          src: ["**/*.css"],
          dest: '<%= appConfig.temp %>'
        }]
      },
      temp_to_dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.temp %>',
          src: ["**/*.css"],
          dest: '<%= appConfig.dist %>'
        }]
      }
    },
    cssmin: {
      options: {
        noAdvanced: true,
        //shorthandCompacting: false,
        //sourceMap : false,
        //noAggressiveMerging: true
      },
      all: {
        files: [{
          expand: true,
          ext: '.min.css',
          cwd: '<%= appConfig.temp %>',
          src: ['**/*.css', '!**/*.min.css'],
          dest: '<%= appConfig.temp %>',
        }]
      }
    },

    useminPrepare: {
      js: '<%= appConfig.dist %>/**/*.js',
      html: '<%= appConfig.dist %>/**/*.html',
      css: '<%= appConfig.dist %>/**/*.css'
    },
    usemin: {
      html: '<%= appConfig.dist %>/**/*.html',
      js: ['<%= appConfig.dist %>/js/config.min.*.js'],
      css: ['<%= appConfig.dist %>/css/*.min.*.css'],
      options: {
        assetsDirs: ['<%= appConfig.app %>', '<%= appConfig.temp %>', '<%= appConfig.app %>/js', '<%= appConfig.temp %>/js'],
        patterns: {
          //替换html文件中的引用
          html: [
            [/href=['"]([^'"]+\.css)['"]/g, 'replace reference to index.css',
              function (a) {
				  
				var flag=false;
				if(a.indexOf('http://')==0){
					flag=true;
				}else if(a.indexOf('https://')==0){
					flag=true;
				}else if(a.indexOf('//')==0){
					flag=true;
				}
                if (flag) {
				  return a;
                }
                return release ? a.replace(/\.css$/, '.min.css') : a;
              }, function (a) {
                var flag=false;
				if(a.indexOf('http://')==0){
					flag=true;
				}else if(a.indexOf('https://')==0){
					flag=true;
				}else if(a.indexOf('//')==0){
					flag=true;
				}
                if (flag) {
				  return a;
                }
                return cdn ? cdnStr + a : a;
              }
            ],
            [/src=['"]([^'"]+\.js)['"]/g, 'replace reference to .js',
              function (a) {
                var flag=false;
				if(a.indexOf('http://')==0){
					flag=true;
				}else if(a.indexOf('https://')==0){
					flag=true;
				}else if(a.indexOf('//')==0){
					flag=true;
				}
                if (flag) {
				  return a;
                }
                //console.log(a);
                return release ? a.replace(/\.js$/, '.min.js') : a;
              }, function (a) {
                var flag=false;
				if(a.indexOf('http://')==0){
					flag=true;
				}else if(a.indexOf('https://')==0){
					flag=true;
				}else if(a.indexOf('//')==0){
					flag=true;
				}
                if (flag) {
				  return a;
                }
                return cdn ? cdnStr + a : a;
              }
            ],
            [/data\-main=['"]([^'"]+(\.js)?)['"]/g, 'replace reference to main.js',
              function (a) {
                var flag=false;
				if(a.indexOf('http://')==0){
					flag=true;
				}else if(a.indexOf('https://')==0){
					flag=true;
				}else if(a.indexOf('//')==0){
					flag=true;
				}
                if (flag) {
				  return a;
                }
                return release ? a.replace(/(\.js)?$/, '.min.js') : a;
              }, function (a) {
                var flag=false;
				if(a.indexOf('http://')==0){
					flag=true;
				}else if(a.indexOf('https://')==0){
					flag=true;
				}else if(a.indexOf('//')==0){
					flag=true;
				}
                if (flag) {
				  return a;
                }
                return cdn ? cdnStr + a : a;
              }
            ]
          ],
          //替换js文件中的引用
          js: [
            [/([^'"\n\r]+\.js)/g, 'replace reference to js files',
              function (a) {
                var flag=false;
				if(a.indexOf('http://')==0){
					flag=true;
				}else if(a.indexOf('https://')==0){
					flag=true;
				}else if(a.indexOf('//')==0){
					flag=true;
				}
                if (flag) {
				  return a;
                }
                return release ? a.replace(/(\.min)?\.js$/, '.min.js') : a;
              },
              function (a) {
                var flag=false;
				if(a.indexOf('http://')==0){
					flag=true;
				}else if(a.indexOf('https://')==0){
					flag=true;
				}else if(a.indexOf('//')==0){
					flag=true;
				}
                if (flag) {
				  return a;
                }
                return release ? a.replace(/\.js$/, '') : a;
              }
            ],
            //[
            //  /baseUrl\s*:\s*['"]([^'"]*)['"]/, '替换baseUrl',
            //  function (a) { return cdn ? path.resolve(cdnStr + a).replace(/\\/g, '/') : a }
            //],
            [
              /(fonts\/icomoon.svg)/g, '替换js中的fonts/icomoon.svg',
              function (a) { return a },
              function (a) { return cdn ? path.resolve(cdnStr + a).replace(/\\/g, '/') : a }
            ]
          ],
          //替换css文件中的引用
          css: [
            //fonts
            [
              /\(([^)]*\.(eot|ttf|svg|woff))[^)]*\)/g, '替换css中资源引用',
              function (a) { return a },
              function (a) { return cdn ? path.resolve(cdnStr + 'css/' + a).replace(/\\/g, '/') : a }
            ],

          ]
        }
      }
    },
    uglify: {
      all: {
        files: [{
          expand: true,
          ext: '.min.js',
          extDot: 'last',
          cwd: '<%= appConfig.temp %>',
          src: ['**/*.js', '!**/*.min.js'],
          dest: '<%= appConfig.temp %>',
        }]
      }
    },
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: "md5",
        length: 8,
        //process: function(basename, name, extension){
        //  console.log(arguments);
        //  return name;
        //}
      },
      all: {
        files: [{
          expand: true,
          // ext: '.html',
          cwd: '<%= appConfig.app %>/', //处理src下的xxx.min.{js,css}
          dest: '<%= appConfig.dist %>',
          src: ["**/*.min.{js,css}", "**/*.{eot,svg,ttf,woff}"]
        }, {
            expand: true,
            // ext: '.html',
            cwd: '<%= appConfig.temp %>/', //处理temp下的xxx.min.js
            dest: '<%= appConfig.dist %>',
            src: ["**/*.min.{js,css}"]
          }]
      }
    },
    replace: {
      baseurl: {
        src: ['<%= appConfig.dist %>/js/config.min.*.js'],
        dest: '<%= appConfig.dist %>/js/',
        replacements: [{
          from: /baseUrl\s*:\s*['"]([^'"]*)['"]/,
          to: function (matchedWord, index, fullText, regexMatches) {
            return 'baseUrl: \'' + (cdn ? path.resolve(cdnStr + regexMatches[0]).replace(/\\/g, '/') : regexMatches[0]) + '\''
          }
        }, {
            from: /(cache)\s*:\s*\d\s*/g,
            to: function (matchedWord, index, fullText, regexMatches) {
              return regexMatches[0] + ':1';
            }
          }, {
            from: /(combo)\s*:\s*\d\s*/g,
            to: function (matchedWord, index, fullText, regexMatches) {
              return regexMatches[0] + ':1';
            }
          }]
      }
    },
    jade: {
      compile: {
        options: {
          doctype: 'html',
          pretty: true,
          data: {
            debug: false
          }
        },
        files: [{
          expand: true,
          ext: '.html',
          cwd: '<%= appConfig.app %>/',
          dest: '<%= appConfig.dist %>',
          src: ["**/*.jade"]
        }]
      }
    },
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      all: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.dist %>',
          src: ['**/*.html'],
          dest: '<%= appConfig.dist %>'
        }]
      }
    },
    bower: {
      to_temp: {
        options: {
          targetDir: '<%= appConfig.temp %>/js',
          // layout: 'byType',
          layout: function (type, component, source) {
            return path.join('');
          },
          install: false,
          // verbose: false,
          //cleanTargetDir: true,
          //cleanBowerDir: false,
          bowerOptions: {}
        }
      },
      to_dist: {
        options: {
          targetDir: '<%= appConfig.dist %>/js',
          layout: 'byType',
          // layout: function (type, component, source) {
          // return path.join('');
          // },
          install: false,
          // verbose: false,
          // cleanTargetDir: false,
          // cleanBowerDir: false,
          bowerOptions: {
            production: true
          }
        }
      }
    },
    // bowerRequirejs: {
    // target: {
    // rjsConfig: '<%= appConfig.app %>/js/config.js',
    // options: {
    // baseUrl: './temp',
    // exclude: ['requirejs']
    // }
    // }
    // },
    connect: {
      server: {
        options: {
          port: 80,
          base: '<%= appConfig.dist %>',
          keepalive: false,
          livereload: 35729,
          hostname: '*',
          middleware: function (connect, options, defaultMiddleware) {
            return [
              getMiddleware(connect, options),
              defaultMiddleware
            ];
          }
        },
        //proxies: [{
        //  context: ['/appdata', '/login/ey', '/login/el', '/login/encrypt', '/login/isLogin'],
        //  host: 'skyeye.jd.local',
        //  port: 80,
        //  https: false,
        //  changeOrigin: true,
        //  // rewrite: {
        //  //   '/skyeye': "/appdata"
        //  // },
        //  headers: {
        //    'host': "skyeye.jd.local",
        //    "accept-encoding": "deflate, sdch"
        //  }
        //}]
      },
    },
    watch: {
      options: {
        reload: false,
        maxListeners: 99,
        livereload: 35729
      },
      less: {
        files: ['<%=appConfig.app%>/**/*.less'],
        tasks: ['less:app_to_temp', 'autoprefixer:temp_to_dist'],
        options: {
          spawn: false
        }
      },
      jade: {
        files: ['<%=appConfig.app%>/**/*.jade'],
        tasks: ['jade'],
        options: {
          spawn: false
        }
      },
      html: {
        files: ['<%=appConfig.app%>/**/*.html'],
        tasks: ['copy:html'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['<%=appConfig.app%>/**/*.{js,json}'],
        tasks: ['copy:js_app_to_dist', 'copy:js_app_to_temp', 'copy:js_temp_to_dist'],
        options: {
          spawn: false
        }
      },
      css: {
        files: '<%=appConfig.app%>/**/*.css',
        tasks: ['autoprefixer:app_to_temp', 'copy:css_temp_to_dist'],
        options: {
          spawn: false
        }
      },
      img: {
        files: '<%=appConfig.app%>/**/*.{jpg,jpeg,png,bmp,ico,gif,xml,eot,svg,ttf,woff,woff2,appcache}',
        tasks: ['copy:images', 'copy:fonts'],
        options: {
          spawn: false
        }
      }
    }
  });


  var steps = [];
  //release模式
  if (release) {
    steps.push('clean');
    steps.push('jade');
    steps.push('less:app_to_temp'); //less编译成css到temp

    steps.push('copy:html');
    steps.push('copy:images');
    //steps.push('copy:fonts');

    steps.push('copy:js_app_to_temp');//只处理非.min.js
    steps.push('uglify');//压缩temp中非.min.js为.min.js到temp

    steps.push('copy:css_app_to_temp');//只处理非.min.css
    steps.push('autoprefixer:temp_to_temp');//处理temp中非.min.css为.min.css到temp
    steps.push('cssmin');//压缩temp中非.min.css为.min.css到temp

    steps.push('filerev');//处理temp中的.min.{js,css},src中的.min.{js,css}到dist
	steps.push('usemin');
    steps.push('replace');
    steps.push('htmlmin');
  } else {
    steps.push('clean');
    steps.push('jade');
    steps.push('less:app_to_temp'); //less编译成css到temp

    steps.push('copy:html');
    steps.push('copy:images');
    steps.push('copy:fonts');
    steps.push('bower:to_dist');

    steps.push('copy:js_app_to_temp');//只处理非.min.js
    steps.push('copy:js_temp_to_dist');//只处理非.min.js
    steps.push('copy:js_app_to_dist');//只处理.min.js

    steps.push('copy:css_app_to_temp');//只处理非.min.css
    steps.push('autoprefixer:temp_to_dist');//只处理非.min.css
    // steps.push('copy:css_temp_to_dist');//只处理非.min.css
    // steps.push('copy:css_app_to_dist');//只处理.min.css

    steps.push('connect:server');
    steps.push('watch');
  }

  grunt.registerTask('default', steps);
};