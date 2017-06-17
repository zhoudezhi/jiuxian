module.exports = function(grunt) {
  //grunt用于本地查看压缩后的代码
  //grunt release 用于往预发布和线上发布代码

  require('time-grunt')(grunt);
  
  var appConfig = {
    src: 'static'  //源代码目录
  };
  //CDN路径
  //var cdn = "//misc.360buyimg.com/business/test/";
  var cdn = '../';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    appConfig:appConfig,

    //step 1:删除临时目录
    clean: {
      build: ['build','temp']
    },

    //step 2: 复制所有源文件到临时目录temp,所有的文件都从temp中取，避免覆盖源文件    
    //        复制业务js源文件到生产目录  
    //原则就是从temp到build目录
    copy: {
      toTemp:{
        expand: true, 
        cwd: '<%= appConfig.src %>',
        src: ['**/*.*'], 
        dest:'temp/'
      },
      toBuild:{
        expand: true, 
        cwd: '<%= appConfig.src %>',
        src: ['**/*.*'], 
        dest:'build/'
      },
      srcjs: {
        expand: true, 
        cwd: 'temp/js/app/src/',
        src: ['*.js'], 
        dest:'temp/js/app/dist/'
      }
    },

    //step 3: 将文件中定义的匿名函数转为具名函数。保存在创建的临时目录
    transport: {  
      build: {
        options: {
          debug:false,
          // 是否采用相对地址
          relative: true,
          // 生成具名函数的id的格式 默认值为 {{family}}/{{name}}/{{version}}/{{filename}} filename自动补全
          format: '../js/{{filename}}' 
      },
        files: [{
          // 相对路径地址           
          cwd:'temp/js/',
          // 需要生成具名函数的文件集合
          src:['app/**/*.js','tpl/*.js','common/*.js'],
          // 生成存放的文件目录
          dest:'temp/js/'
        }]
      }
    },

    //step 4: 将临时目录下的具名函数合并为一个js文件保存到产出目录。
    concat: {
      index: {
          // the files to concatenate
          src: ['temp/js/app/dist/index.js','temp/js/tpl/*.js','temp/js/common/*.js'],
          // the location of the resulting JS file
          dest: 'temp/js/app/dist/index.js'
      },
      demo: {
          // the files to concatenate
          src: ['temp/js/app/dist/demo.js','temp/js/tpl/*.js','temp/js/common/toast.js'],
          // the location of the resulting JS file
          dest: 'temp/js/app/dist/demo.js'
      },
      list: {
          // the files to concatenate
          src: ['temp/js/app/dist/list.js','temp/js/tpl/*.js','temp/js/common/*.js'],
          // the location of the resulting JS file
          dest: 'temp/js/app/dist/list.js'
      }       
    },

    //js代码检查
    /*jshint: {
      options: {
        "curly": true
    },
      beforeconcat: ['static/src/js/*.js'],
      afterconcat: ['static/dist/js/*.js']
    },*/

    //step 5: 压缩合并后的js文件
    uglify: {
      options:{
        banner:'/*<%= pkg.name %>-<%= pkg.version %>  <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>*/\n'
      },              
      build: {        
        files:[{
          expand: true,
          cwd: 'temp/js/app/dist/',
          src: ['*.js'],
          dest: 'build/js/app/dist/',
          ext: '.js'
        }/*,{
          'static/js/tools/jdShare.min.js': ['static/js/tools/jdShare.js'],
          'static/js/lib/fastclick/fastclick.min.js': ['static/js/lib/fastclick/fastclick.js'],
          'static/js/lib/seajs/3.0.1/sea.min.js': ['static/js/lib/seajs/3.0.1/sea.js'],
          'static/js/lib/seajs/3.0.1/sea-css.min.js': ['static/js/lib/seajs/3.0.1/sea-css.js'],
          'static/js/lib/zepto/1.2.0/zepto.min.js': ['static/js/lib/zepto/1.2.0/zepto.js'],
          'static/js/lib/template/2.0.4/template.min.js': ['static/js/lib/template/2.0.4/template.js'],
          'static/js/lib/template/2.0.4/template-native.min.js': ['static/js/lib/template/2.0.4/template-native.js'],
          //'build/js/app/dist/index.js': ['<%= concat.index.dest %>'],   //把合并目录下的js压缩
          //'build/js/app/dist/detail.js': ['<%= concat.detail.dest %>']   //把合并目录下的js压缩
        }*/]        
      }
    },

    //step 6:压缩css文件
    cssmin: {
      options: {
        noAdvanced: true,
      },
      build: {
        expand: true,
        cwd: 'build/css/',
        src: ['*.css'],
        dest: 'build/css/',
        ext: '.css'
      }
    },

    //step 7: 图片文件压缩处理后到build目录  
    imagemin: {
      images: {
        options: {
            optimizationLevel: 3 //定义 PNG 图片优化水平
        },
        files: [{
            expand: true,
            cwd: 'build/images/',
            src: ['**/*.{png,jpg,jpeg,gif}'], // 优化目录下所有 png/jpg/jpeg/gif图片
            dest: 'build/images/' // 优化后的图片保存位置，
        }]
      }
    },    
    
    //step 8:对css和js用md5重命名。此处不能对js文件进行重命名，因为具名函数的id与文件名相关。
    //所以js文件只能手动刷新cdn
    filerev: {
      options: {
          algorithm: 'md5',
          length: 8
      },
      css: {
          src: 'build/css/*.css'
      }/*,
      js: {
          src: ['build/js/app/dist/*.js']
      }*/
    },

    //step 9:替换html中的md5文件名的引用 
    filerev_replace: {
      options: {
        assets_root: 'build/html'
      },
      compiled_assets: {
        src: 'build/html/*.html'
      }
    },

    //step 10:将产出文件的js复制到开发目录，用于本地测试合并后的代码 
    copyto: {
      distJs: {
        files: [
          {
            cwd: 'temp/js/app/dist/', 
            src: ['*.js'], 
            dest: '<%= appConfig.src %>/js/app/dist/', 
            expand: true
          }
        ]
      }
    },

    //step 11:部署CDN，替换html中静态资源的引用路径
    replace: {
      //html中引用的js、css、images路径
      htmlUrl: {
        src: ['build/html/*.html'],
        dest: 'build/html/',
        replacements: [{
          from: /..\/css\//g,
          to: cdn + 'css/'
          },{
          from: /..\/js\//g,
          to: cdn + 'js/'
          },{
          from: /..\/images\//g,
          to: cdn + 'images/'
          }]
      },
      //替换产出目录dist下js的路径
      tplUrl: {
        src: ['build/js/app/dist/*.js'],
        dest: 'build/js/app/dist/',
        replacements: [{
          from: /..\/images\//g,  //公共模版目录tpl中的images路径
          to: cdn + 'images/'
          },{
          from: /..\/js\//g,      //产出目录dist下js的路径ID加上CDN前缀
          to: cdn + 'js/'
          }]
      },
      //替换config.js中的baseUrl路径
      configUrl:{
        src: ['build/js/tools/config.js'],
        dest: 'build/js/tools/',
        replacements: [{
          from: /..\/js\//g,
          to: cdn + 'js/'
        }]
      }
    }




  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');  
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-filerev-replace');
  grunt.loadNpmTasks('grunt-copy-to');
  grunt.loadNpmTasks('grunt-text-replace');

  /*var steps = [];
 
  if(release){
    steps.push('clean');
    steps.push('copy');
    steps.push('transport');
    steps.push('concat');
    steps.push('uglify');
    steps.push('cssmin');
    steps.push('imagemin');
    steps.push('filerev');
    steps.push('filerev_replace');
  }else{
    steps.push('clean');
    steps.push('copy');
    steps.push('transport');
    steps.push('concat');
    steps.push('uglify');
    steps.push('cssmin');
  }
  grunt.registerTask('default', steps);*/
  grunt.registerTask('default', ['clean','copy','transport','concat','uglify','cssmin','copyto']);
  grunt.registerTask('release', ['clean','copy','transport','concat','uglify','cssmin','imagemin','filerev','filerev_replace','copyto','replace']);


};